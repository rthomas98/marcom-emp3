<?php

namespace App\Notifications;

use App\Models\Issue;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class IssueStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Issue $issue,
        public string $oldStatus,
        public string $newStatus,
        public User $changedBy,
        public ?string $resolution = null,
        public ?string $notes = null
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Issue Status Updated: ' . $this->issue->project->name)
            ->line('An issue status has been updated for project: ' . $this->issue->project->name)
            ->line('Issue: ' . $this->issue->title)
            ->line('Previous Status: ' . ucfirst($this->oldStatus))
            ->line('New Status: ' . ucfirst($this->newStatus))
            ->line('Updated by: ' . $this->changedBy->name)
            ->line('Date: ' . now()->format('M d, Y H:i'));

        // Add resolution if provided (especially for resolved/closed status)
        if ($this->resolution) {
            $message->line('Resolution: ' . $this->resolution);
        }

        // Add update notes if provided
        if ($this->notes) {
            $message->line('Update Notes: ' . $this->notes);
        }

        // Add issue details
        $message->line('Issue Details:')
            ->line('Category: ' . ucfirst($this->issue->category))
            ->line('Priority: ' . ucfirst($this->issue->priority));

        // Add impact assessment if available
        if ($this->issue->impact_assessment) {
            $message->line('Impact Assessment: ' . $this->issue->impact_assessment);
        }

        // Add time tracking if available
        if ($this->issue->resolution_time) {
            $message->line('Resolution Time: ' . $this->formatDuration($this->issue->resolution_time));
        }

        // Add related tasks status if any
        $totalTasks = $this->issue->tasks()->count();
        if ($totalTasks > 0) {
            $completedTasks = $this->issue->tasks()->where('status', 'completed')->count();
            $message->line("Related Tasks Progress: {$completedTasks} of {$totalTasks} completed");
        }

        // Add assigned team member if available
        if ($this->issue->assignedTo) {
            $message->line('Assigned to: ' . $this->issue->assignedTo->name);
        }

        return $message
            ->action('View Issue', url('/projects/' . $this->issue->project_id . '/issues/' . $this->issue->id))
            ->line('Please review the updated issue status and take any necessary actions.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'issue_id' => $this->issue->id,
            'issue_title' => $this->issue->title,
            'project_id' => $this->issue->project_id,
            'project_name' => $this->issue->project->name,
            'type' => 'issue_status_changed',
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'changed_by_id' => $this->changedBy->id,
            'changed_by_name' => $this->changedBy->name,
            'resolution' => $this->resolution,
            'notes' => $this->notes,
            'resolution_time' => $this->issue->resolution_time,
            'assigned_to_id' => $this->issue->assigned_to,
            'assigned_to_name' => $this->issue->assignedTo?->name,
            'related_tasks_completed' => $this->issue->tasks()->where('status', 'completed')->count(),
            'related_tasks_total' => $this->issue->tasks()->count(),
            'updated_at' => now()->format('Y-m-d H:i:s'),
        ];
    }

    protected function formatDuration(int $minutes): string
    {
        if ($minutes < 60) {
            return "{$minutes} minutes";
        }

        $hours = floor($minutes / 60);
        $remainingMinutes = $minutes % 60;

        if ($remainingMinutes === 0) {
            return "{$hours} " . ($hours === 1 ? 'hour' : 'hours');
        }

        return "{$hours} " . ($hours === 1 ? 'hour' : 'hours') . " {$remainingMinutes} minutes";
    }
} 