<?php

namespace App\Notifications;

use App\Models\Milestone;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MilestoneCompleted extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Milestone $milestone
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Milestone Completed: ' . $this->milestone->name)
            ->line('A project milestone has been completed.')
            ->line('Milestone: ' . $this->milestone->name)
            ->line('Project: ' . $this->milestone->project->name)
            ->line('Completed on: ' . now()->format('M d, Y H:i'));

        // Add task completion details
        $totalTasks = $this->milestone->tasks()->count();
        $completedTasks = $this->milestone->tasks()->where('status', 'completed')->count();
        $message->line("Tasks Completed: {$completedTasks} of {$totalTasks}");

        // Add milestone description if available
        if ($this->milestone->description) {
            $message->line('Description: ' . $this->milestone->description);
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
            ->line('Please review the milestone completion and proceed with any necessary follow-up actions.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'milestone_id' => $this->milestone->id,
            'milestone_name' => $this->milestone->name,
            'project_id' => $this->milestone->project_id,
            'project_name' => $this->milestone->project->name,
            'completed_at' => now()->format('Y-m-d H:i:s'),
            'type' => 'milestone_completed',
            'total_tasks' => $this->milestone->tasks()->count(),
            'completed_tasks' => $this->milestone->tasks()->where('status', 'completed')->count(),
        ];
    }
} 