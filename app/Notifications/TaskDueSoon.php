<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskDueSoon extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Task $task,
        public int $hoursRemaining
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Task Due Soon: ' . $this->task->title)
            ->line("A task is due in {$this->hoursRemaining} hours.")
            ->line('Title: ' . $this->task->title)
            ->line('Project: ' . $this->task->project->name)
            ->line('Due Date: ' . $this->task->due_date?->format('M d, Y H:i'))
            ->line('Priority: ' . ucfirst($this->task->priority))
            ->line('Status: ' . ucfirst($this->task->status))
            ->action('View Task', url('/tasks/' . $this->task->id))
            ->line('Please ensure the task is completed before the deadline.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'title' => $this->task->title,
            'project_id' => $this->task->project_id,
            'project_name' => $this->task->project->name,
            'due_date' => $this->task->due_date?->format('Y-m-d H:i'),
            'priority' => $this->task->priority,
            'status' => $this->task->status,
            'hours_remaining' => $this->hoursRemaining,
            'type' => 'task_due_soon',
        ];
    }
}
