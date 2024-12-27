<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'layout',
        'content',
        'featured_image',
        'status',
        'published_at',
        'sort_order',
        'parent_id',
        'meta_title',
        'meta_description',
        'meta_data',
        'settings',
        'show_in_navigation',
    ];

    protected $casts = [
        'content' => 'array',
        'meta_data' => 'array',
        'settings' => 'array',
        'published_at' => 'datetime',
        'show_in_navigation' => 'boolean',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Page::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Page::class, 'parent_id')->orderBy('sort_order');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where('published_at', '<=', now());
    }

    public function scopeInNavigation($query)
    {
        return $query->where('show_in_navigation', true);
    }

    public function scopeTopLevel($query)
    {
        return $query->whereNull('parent_id');
    }

    public function getUrlAttribute(): string
    {
        $segments = collect([$this->slug]);
        $parent = $this->parent;

        while ($parent) {
            $segments->prepend($parent->slug);
            $parent = $parent->parent;
        }

        return '/' . $segments->join('/');
    }

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($page) {
            if (! $page->slug) {
                $page->slug = Str::slug($page->title);
            }

            if (! $page->meta_title) {
                $page->meta_title = $page->title;
            }
        });
    }
}
