<?php

namespace App\Notifications;

use App\Models\Task;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Task $task,
        public string $oldStatus,
        public string $newStatus,
        public User $changedBy
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Task Status Updated: ' . $this->task->title)
            ->line('A task status has been updated.')
            ->line('Task: ' . $this->task->title)
            ->line('Project: ' . $this->task->project->name)
            ->line('Updated by: ' . $this->changedBy->name)
            ->line('Previous Status: ' . ucfirst($this->oldStatus))
            ->line('New Status: ' . ucfirst($this->newStatus));

        if ($this->task->actual_hours) {
            $message->line('Time Spent: ' . $this->task->actual_hours . ' hours');
        }

        if ($this->newStatus === 'completed') {
            $message->line('Task completed on: ' . now()->format('M d, Y H:i'));
        }

        return $message
            ->action('View Task', url('/tasks/' . $this->task->id))
            ->line('Please review the task status update.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'task_title' => $this->task->title,
            'project_id' => $this->task->project_id,
            'project_name' => $this->task->project->name,
            'changed_by_id' => $this->changedBy->id,
            'changed_by_name' => $this->changedBy->name,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'type' => 'task_status_changed',
            'completed_at' => $this->newStatus === 'completed' ? now()->format('Y-m-d H:i:s') : null,
        ];
    }
}
