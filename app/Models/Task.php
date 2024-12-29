<?php

namespace App\Models;

use App\Notifications\TaskAssigned;
use App\Notifications\TaskDueSoon;
use App\Notifications\TaskStatusChanged;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Notification;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'project_id',
        'status',
        'priority',
        'type',
        'order',
        'assigned_to',
        'created_by',
        'due_date',
        'estimated_hours',
        'actual_hours',
        'labels',
        'checklist',
        'attachments',
        'parent_task_id',
    ];

    protected $casts = [
        'labels' => 'array',
        'checklist' => 'array',
        'attachments' => 'array',
        'due_date' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        // When a task is assigned
        static::updated(function ($task) {
            if ($task->isDirty('assigned_to') && $task->assigned_to) {
                $assignee = User::find($task->assigned_to);
                $assignee->notify(new TaskAssigned($task));
            }

            // When status changes
            if ($task->isDirty('status')) {
                $stakeholders = collect([$task->assignedTo, $task->createdBy, $task->project->projectManager])
                    ->filter()
                    ->unique();
                
                Notification::send($stakeholders, new TaskStatusChanged(
                    $task,
                    $task->getOriginal('status'),
                    $task->status
                ));
            }
        });
    }

    public function checkDueDate()
    {
        if (!$this->due_date || $this->status === 'completed') {
            return;
        }

        $hoursUntilDue = now()->diffInHours($this->due_date, false);
        
        if ($hoursUntilDue <= 24 && $hoursUntilDue > 0) {
            $stakeholders = collect([$this->assignedTo, $this->createdBy])
                ->filter()
                ->unique();
            
            Notification::send($stakeholders, new TaskDueSoon($this, $hoursUntilDue));
        }
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function parentTask(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'parent_task_id');
    }

    public function subtasks(): HasMany
    {
        return $this->hasMany(Task::class, 'parent_task_id');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('title', 'asc');
    }
}
