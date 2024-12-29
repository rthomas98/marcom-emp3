<?php

namespace App\Notifications;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Project $project,
        public string $oldStatus,
        public string $newStatus
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Project Status Updated: ' . $this->project->name)
            ->line('A project status has been updated.')
            ->line('Project: ' . $this->project->name)
            ->line('Client: ' . $this->project->company?->name)
            ->line('Previous Status: ' . ucfirst($this->oldStatus))
            ->line('New Status: ' . ucfirst($this->newStatus))
            ->line('Due Date: ' . $this->project->due_date?->format('M d, Y'))
            ->line('Progress: ' . $this->getProjectProgress())
            ->action('View Project', url('/projects/' . $this->project->id));
    }

    public function toArray(object $notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'name' => $this->project->name,
            'company_id' => $this->project->company_id,
            'company_name' => $this->project->company?->name,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'due_date' => $this->project->due_date?->format('Y-m-d'),
            'type' => 'project_status_changed',
        ];
    }

    protected function getProjectProgress(): string
    {
        $totalTasks = $this->project->tasks()->count();
        if ($totalTasks === 0) {
            return 'No tasks created';
        }

        $completedTasks = $this->project->tasks()->where('status', 'completed')->count();
        $percentage = round(($completedTasks / $totalTasks) * 100);
        
        return "{$completedTasks} of {$totalTasks} tasks completed ({$percentage}%)";
    }
}
