<?php

namespace App\Notifications;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectDueSoon extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Project $project,
        public int $daysRemaining
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Project Due Soon: ' . $this->project->name)
            ->line("Project is due in {$this->daysRemaining} days.")
            ->line('Project: ' . $this->project->name)
            ->line('Client: ' . $this->project->company?->name)
            ->line('Due Date: ' . $this->project->due_date?->format('M d, Y'))
            ->line('Status: ' . ucfirst($this->project->status))
            ->line('Progress: ' . $this->getProjectProgress())
            ->action('View Project', url('/projects/' . $this->project->id))
            ->line('Please ensure all tasks are on track for completion.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'name' => $this->project->name,
            'company_id' => $this->project->company_id,
            'company_name' => $this->project->company?->name,
            'due_date' => $this->project->due_date?->format('Y-m-d'),
            'status' => $this->project->status,
            'days_remaining' => $this->daysRemaining,
            'type' => 'project_due_soon',
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
