<?php

namespace App\Notifications;

use App\Models\Task;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskAssigned extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Task $task,
        public User $assignedBy
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Task Assignment: ' . $this->task->title)
            ->line('You have been assigned a new task.')
            ->line('Task: ' . $this->task->title)
            ->line('Project: ' . $this->task->project->name)
            ->line('Assigned by: ' . $this->assignedBy->name)
            ->line('Priority: ' . ucfirst($this->task->priority))
            ->line('Due Date: ' . ($this->task->due_date ? $this->task->due_date->format('M d, Y') : 'Not set'));

        if ($this->task->description) {
            $message->line('Description: ' . $this->task->description);
        }

        if ($this->task->estimated_hours) {
            $message->line('Estimated Hours: ' . $this->task->estimated_hours);
        }

        return $message
            ->action('View Task', url('/tasks/' . $this->task->id))
            ->line('Please review the task details and start working on it.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'task_title' => $this->task->title,
            'project_id' => $this->task->project_id,
            'project_name' => $this->task->project->name,
            'assigned_by_id' => $this->assignedBy->id,
            'assigned_by_name' => $this->assignedBy->name,
            'priority' => $this->task->priority,
            'due_date' => $this->task->due_date?->format('Y-m-d'),
            'type' => 'task_assigned',
        ];
    }
}
