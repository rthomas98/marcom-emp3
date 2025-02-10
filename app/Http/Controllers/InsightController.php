<?php

namespace App\Http\Controllers;

use App\Models\Insight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InsightController extends Controller
{
    public function index()
    {
        $insights = Insight::published()
            ->latest('published_at')
            ->paginate(9);

        return Inertia::render('Insights/Index', [
            'insights' => $insights,
        ]);
    }

    public function show(Insight $insight)
    {
        abort_if(!$insight->is_published, 404);

        $relatedInsights = Insight::published()
            ->where('id', '!=', $insight->id)
            ->where('category', $insight->category)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Insights/Show', [
            'insight' => $insight,
            'relatedInsights' => $relatedInsights,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:50',
            'read_time' => 'required|integer|min:1',
            'content' => 'required|string',
            'image' => 'required|image|max:2048', // 2MB max
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('insights', 'spaces');
            $validated['image'] = Storage::disk('spaces')->url($path);
        }

        return Insight::create($validated);
    }

    public function update(Request $request, Insight $insight)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string|max:50',
            'read_time' => 'sometimes|integer|min:1',
            'content' => 'sometimes|string',
            'image' => 'sometimes|image|max:2048',
            'is_published' => 'sometimes|boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($insight->image) {
                $oldPath = str_replace(Storage::disk('spaces')->url(''), '', $insight->image);
                Storage::disk('spaces')->delete($oldPath);
            }

            $path = $request->file('image')->store('insights', 'spaces');
            $validated['image'] = Storage::disk('spaces')->url($path);
        }

        $insight->update($validated);
        return $insight;
    }

    public function destroy(Insight $insight)
    {
        if ($insight->image) {
            $path = str_replace(Storage::disk('spaces')->url(''), '', $insight->image);
            Storage::disk('spaces')->delete($path);
        }

        $insight->delete();
        return response()->noContent();
    }
}
