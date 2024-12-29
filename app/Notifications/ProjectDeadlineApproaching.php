<?php

namespace App\Notifications;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectDeadlineApproaching extends Notification implements ShouldQueue
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
        $message = (new MailMessage)
            ->subject('Project Deadline Approaching: ' . $this->project->name)
            ->line('This is a reminder that a project deadline is approaching.')
            ->line('Project: ' . $this->project->name)
            ->line('Client: ' . $this->project->company?->name)
            ->line('Due Date: ' . $this->project->due_date->format('M d, Y'))
            ->line('Days Remaining: ' . $this->daysRemaining);

        // Add project progress
        $totalTasks = $this->project->tasks()->count();
        if ($totalTasks > 0) {
            $completedTasks = $this->project->tasks()->where('status', 'completed')->count();
            $percentage = round(($completedTasks / $totalTasks) * 100);
            $message->line("Project Progress: {$completedTasks} of {$totalTasks} tasks completed ({$percentage}%)");
        }

        // Add overdue tasks if any
        $overdueTasks = $this->project->tasks()
            ->where('status', '!=', 'completed')
            ->where('due_date', '<', now())
            ->count();
        if ($overdueTasks > 0) {
            $message->line("Warning: {$overdueTasks} tasks are overdue");
        }

        // Add upcoming milestones if any
        $upcomingMilestones = $this->project->milestones()
            ->where('status', '!=', 'completed')
            ->where('due_date', '>=', now())
            ->orderBy('due_date')
            ->take(3)
            ->get();
        if ($upcomingMilestones->isNotEmpty()) {
            $message->line('Upcoming Milestones:');
            foreach ($upcomingMilestones as $milestone) {
                $message->line("- {$milestone->name} (Due: {$milestone->due_date->format('M d, Y')})");
            }
        }

        return $message
            ->action('View Project', url('/projects/' . $this->project->id))
            ->line('Please review the project status and take necessary actions to ensure timely completion.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
            'company_id' => $this->project->company_id,
            'company_name' => $this->project->company?->name,
            'due_date' => $this->project->due_date->format('Y-m-d'),
            'days_remaining' => $this->daysRemaining,
            'type' => 'project_deadline_approaching',
            'total_tasks' => $this->project->tasks()->count(),
            'completed_tasks' => $this->project->tasks()->where('status', 'completed')->count(),
            'overdue_tasks' => $this->project->tasks()
                ->where('status', '!=', 'completed')
                ->where('due_date', '<', now())
                ->count(),
        ];
    }
} 