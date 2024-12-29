<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class InvitationController extends Controller
{
    public function accept(Request $request, string $token)
    {
        $user = User::where('invitation_token', $token)
            ->whereNull('invitation_accepted_at')
            ->firstOrFail();

        if ($request->isMethod('post')) {
            $request->validate([
                'password' => ['required', 'min:8', 'confirmed'],
            ]);

            $user->password = Hash::make($request->password);
            $user->acceptInvitation();

            auth()->login($user);

            return redirect()->route('filament.marcom.pages.dashboard');
        }

        return view('auth.accept-invitation', [
            'user' => $user,
        ]);
    }
} 