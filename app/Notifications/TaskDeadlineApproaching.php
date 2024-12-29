<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskDeadlineApproaching extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Task $task,
        public int $daysRemaining
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Task Deadline Approaching: ' . $this->task->title)
            ->line('This is a reminder that a task deadline is approaching.')
            ->line('Task: ' . $this->task->title)
            ->line('Project: ' . $this->task->project->name)
            ->line('Due Date: ' . $this->task->due_date->format('M d, Y'))
            ->line('Days Remaining: ' . $this->daysRemaining)
            ->line('Priority: ' . ucfirst($this->task->priority))
            ->line('Status: ' . ucfirst($this->task->status));

        // Add description if available
        if ($this->task->description) {
            $message->line('Description: ' . $this->task->description);
        }

        // Add time tracking info if available
        if ($this->task->estimated_hours) {
            $message->line('Estimated Hours: ' . $this->task->estimated_hours);
            if ($this->task->actual_hours) {
                $message->line('Actual Hours: ' . $this->task->actual_hours);
            }
        }

        // Add blocking tasks if any
        $blockingTasks = $this->task->blockingTasks()
            ->where('status', '!=', 'completed')
            ->get();
        if ($blockingTasks->isNotEmpty()) {
            $message->line('Blocking Tasks:');
            foreach ($blockingTasks as $blockingTask) {
                $message->line("- {$blockingTask->title} (Status: {$blockingTask->status})");
            }
        }

        return $message
            ->action('View Task', url('/tasks/' . $this->task->id))
            ->line('Please review the task and ensure it will be completed by the deadline.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'task_title' => $this->task->title,
            'project_id' => $this->task->project_id,
            'project_name' => $this->task->project->name,
            'due_date' => $this->task->due_date->format('Y-m-d'),
            'days_remaining' => $this->daysRemaining,
            'priority' => $this->task->priority,
            'status' => $this->task->status,
            'type' => 'task_deadline_approaching',
            'blocking_tasks' => $this->task->blockingTasks()
                ->where('status', '!=', 'completed')
                ->count(),
        ];
    }
} 