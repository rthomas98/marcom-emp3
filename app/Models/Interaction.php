<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Interaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'content',
        'contact_id',
        'company_id',
        'deal_id',
        'user_id',
        'interaction_date',
        'follow_up_date',
        'follow_up_type',
        'follow_up_done',
        'metadata',
    ];

    protected $casts = [
        'interaction_date' => 'datetime',
        'follow_up_date' => 'datetime',
        'follow_up_done' => 'boolean',
        'metadata' => 'array',
    ];

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopePending($query)
    {
        return $query->whereNotNull('follow_up_date')
            ->where('follow_up_done', false)
            ->where('follow_up_date', '>=', now());
    }

    public function scopeOverdue($query)
    {
        return $query->whereNotNull('follow_up_date')
            ->where('follow_up_done', false)
            ->where('follow_up_date', '<', now());
    }
}
