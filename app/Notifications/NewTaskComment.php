<?php

namespace App\Notifications;

use App\Models\TaskComment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewTaskComment extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public TaskComment $comment
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Comment on Task: ' . $this->comment->task->title)
            ->line('A new comment has been added to task: ' . $this->comment->task->title)
            ->line('Project: ' . $this->comment->task->project->name)
            ->line('Comment by: ' . $this->comment->user->name)
            ->line('Content: ' . $this->comment->content);

        if ($this->comment->mentions && count($this->comment->mentions) > 0) {
            $mentionedUsers = collect($this->comment->mentions)->map(fn($user) => $user['name'])->join(', ');
            $message->line('Mentioned: ' . $mentionedUsers);
        }

        if ($this->comment->attachments && count($this->comment->attachments) > 0) {
            $message->line('This comment includes ' . count($this->comment->attachments) . ' attachment(s)');
        }

        return $message
            ->action('View Comment', url('/tasks/' . $this->comment->task_id))
            ->line('Please review and respond if needed.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'comment_id' => $this->comment->id,
            'task_id' => $this->comment->task_id,
            'task_title' => $this->comment->task->title,
            'project_id' => $this->comment->task->project_id,
            'project_name' => $this->comment->task->project->name,
            'commenter_id' => $this->comment->user_id,
            'commenter_name' => $this->comment->user->name,
            'type' => 'new_task_comment',
            'has_mentions' => !empty($this->comment->mentions),
            'has_attachments' => !empty($this->comment->attachments),
        ];
    }
} 