<?php

namespace App\Notifications;

use App\Models\Milestone;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MilestoneDeadlineApproaching extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Milestone $milestone,
        public int $daysRemaining
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Milestone Deadline Approaching: ' . $this->milestone->name)
            ->line('This is a reminder that a milestone deadline is approaching.')
            ->line('Milestone: ' . $this->milestone->name)
            ->line('Project: ' . $this->milestone->project->name)
            ->line('Due Date: ' . $this->milestone->due_date->format('M d, Y'))
            ->line('Days Remaining: ' . $this->daysRemaining);

        // Add milestone description if available
        if ($this->milestone->description) {
            $message->line('Description: ' . $this->milestone->description);
        }

        // Add task completion status
        $totalTasks = $this->milestone->tasks()->count();
        $completedTasks = $this->milestone->tasks()->where('status', 'completed')->count();
        $percentage = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;
        $message->line("Tasks Progress: {$completedTasks} of {$totalTasks} tasks completed ({$percentage}%)");

        // Add overdue tasks if any
        $overdueTasks = $this->milestone->tasks()
            ->where('status', '!=', 'completed')
            ->where('due_date', '<', now())
            ->count();
        if ($overdueTasks > 0) {
            $message->line("Warning: {$overdueTasks} tasks are overdue");
        }

        // Add deliverables if available
        if ($this->milestone->deliverables) {
            $message->line('Deliverables:');
            foreach ($this->milestone->deliverables as $deliverable) {
                $message->line('- ' . $deliverable);
            }
        }

        return $message
            ->action('View Milestone', url('/projects/' . $this->milestone->project_id . '/milestones/' . $this->milestone->id))
            ->line('Please review the milestone progress and ensure all tasks will be completed by the deadline.');
    }

    public function toArray(object $notifiable): array
    {
        $totalTasks = $this->milestone->tasks()->count();
        $completedTasks = $this->milestone->tasks()->where('status', 'completed')->count();

        return [
            'milestone_id' => $this->milestone->id,
            'milestone_name' => $this->milestone->name,
            'project_id' => $this->milestone->project_id,
            'project_name' => $this->milestone->project->name,
            'due_date' => $this->milestone->due_date->format('Y-m-d'),
            'days_remaining' => $this->daysRemaining,
            'type' => 'milestone_deadline_approaching',
            'total_tasks' => $totalTasks,
            'completed_tasks' => $completedTasks,
            'completion_percentage' => $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0,
            'overdue_tasks' => $this->milestone->tasks()
                ->where('status', '!=', 'completed')
                ->where('due_date', '<', now())
                ->count(),
        ];
    }
} 