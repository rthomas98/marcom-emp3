<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Deal extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'company_id',
        'contact_id',
        'value',
        'currency',
        'pipeline_stage',
        'expected_close_date',
        'closed_date',
        'description',
        'source',
        'assigned_to',
        'custom_fields',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'expected_close_date' => 'date',
        'closed_date' => 'date',
        'custom_fields' => 'array',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    public function interactions(): HasMany
    {
        return $this->hasMany(Interaction::class);
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function scopeOpen($query)
    {
        return $query->whereNotIn('pipeline_stage', ['closed_won', 'closed_lost']);
    }

    public function scopeWon($query)
    {
        return $query->where('pipeline_stage', 'closed_won');
    }

    public function scopeLost($query)
    {
        return $query->where('pipeline_stage', 'closed_lost');
    }

    public function getFormattedValueAttribute(): string
    {
        return "{$this->currency} " . number_format($this->value, 2);
    }
}
