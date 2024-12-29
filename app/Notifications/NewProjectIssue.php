<?php

namespace App\Notifications;

use App\Models\Issue;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewProjectIssue extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Issue $issue
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Issue Reported: ' . $this->issue->project->name)
            ->line('A new issue has been reported for project: ' . $this->issue->project->name)
            ->line('Issue: ' . $this->issue->title)
            ->line('Category: ' . ucfirst($this->issue->category))
            ->line('Priority: ' . ucfirst($this->issue->priority))
            ->line('Status: ' . ucfirst($this->issue->status))
            ->line('Reported by: ' . $this->issue->reportedBy->name)
            ->line('Date: ' . $this->issue->created_at->format('M d, Y H:i'));

        // Add description
        if ($this->issue->description) {
            $message->line('Description: ' . $this->issue->description);
        }

        // Add impact assessment if available
        if ($this->issue->impact_assessment) {
            $message->line('Impact Assessment: ' . $this->issue->impact_assessment);
        }

        // Add affected areas if available
        if ($this->issue->affected_areas && count($this->issue->affected_areas) > 0) {
            $message->line('Affected Areas: ' . implode(', ', $this->issue->affected_areas));
        }

        // Add related tasks if any
        $relatedTasks = $this->issue->tasks()->count();
        if ($relatedTasks > 0) {
            $message->line("Related Tasks: {$relatedTasks}");
        }

        // Add resolution target date if set
        if ($this->issue->target_resolution_date) {
            $message->line('Target Resolution: ' . $this->issue->target_resolution_date->format('M d, Y'));
        }

        // Add assigned team member if available
        if ($this->issue->assignedTo) {
            $message->line('Assigned to: ' . $this->issue->assignedTo->name);
        }

        return $message
            ->action('View Issue', url('/projects/' . $this->issue->project_id . '/issues/' . $this->issue->id))
            ->line('Please review the issue and take necessary actions.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'issue_id' => $this->issue->id,
            'issue_title' => $this->issue->title,
            'project_id' => $this->issue->project_id,
            'project_name' => $this->issue->project->name,
            'type' => 'new_project_issue',
            'category' => $this->issue->category,
            'priority' => $this->issue->priority,
            'status' => $this->issue->status,
            'reported_by_id' => $this->issue->reported_by,
            'reported_by_name' => $this->issue->reportedBy->name,
            'assigned_to_id' => $this->issue->assigned_to,
            'assigned_to_name' => $this->issue->assignedTo?->name,
            'affected_areas' => $this->issue->affected_areas,
            'related_tasks_count' => $this->issue->tasks()->count(),
            'target_resolution_date' => $this->issue->target_resolution_date?->format('Y-m-d'),
            'created_at' => $this->issue->created_at->format('Y-m-d H:i:s'),
        ];
    }
} 