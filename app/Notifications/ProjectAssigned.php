<?php

namespace App\Notifications;

use App\Models\Project;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectAssigned extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Project $project,
        public User $assignedBy
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Project Assignment: ' . $this->project->name)
            ->line('You have been assigned to a new project.')
            ->line('Project: ' . $this->project->name)
            ->line('Assigned by: ' . $this->assignedBy->name)
            ->line('Status: ' . ucfirst($this->project->status))
            ->line('Start Date: ' . ($this->project->start_date ? $this->project->start_date->format('M d, Y') : 'Not set'))
            ->line('End Date: ' . ($this->project->end_date ? $this->project->end_date->format('M d, Y') : 'Not set'));

        if ($this->project->description) {
            $message->line('Description: ' . $this->project->description);
        }

        if ($this->project->budget) {
            $message->line('Budget: ' . $this->project->budget);
        }

        return $message
            ->action('View Project', url('/projects/' . $this->project->id))
            ->line('Please review the project details and prepare for your role.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
            'assigned_by_id' => $this->assignedBy->id,
            'assigned_by_name' => $this->assignedBy->name,
            'status' => $this->project->status,
            'start_date' => $this->project->start_date?->format('Y-m-d'),
            'end_date' => $this->project->end_date?->format('Y-m-d'),
            'type' => 'project_assigned',
        ];
    }
} 