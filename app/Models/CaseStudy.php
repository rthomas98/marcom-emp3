<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CaseStudy extends Model
{
    /** @use HasFactory<\Database\Factories\CaseStudyFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'client_name',
        'client_industry',
        'featured_image',
        'client_logo',
        'summary',
        'challenge',
        'solution',
        'results',
        'key_metrics',
        'testimonial_author',
        'testimonial_position',
        'testimonial_content',
        'status',
        'published_at',
        'is_featured',
        'meta_title',
        'meta_description',
        'category_id',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'key_metrics' => 'array',
    ];

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($caseStudy) {
            if (! $caseStudy->slug) {
                $caseStudy->slug = Str::slug($caseStudy->title);
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(CaseStudyCategory::class, 'category_id');
    }
}
