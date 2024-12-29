<?php

namespace App\Notifications;

use App\Models\ClientFeedback;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewClientFeedback extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public ClientFeedback $feedback
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Client Feedback: ' . $this->feedback->project->name)
            ->line('New feedback has been received for project: ' . $this->feedback->project->name)
            ->line('Type: ' . ucfirst($this->feedback->type))
            ->line('Content: ' . $this->feedback->content);

        if ($this->feedback->sentiment) {
            $message->line('Sentiment: ' . ucfirst($this->feedback->sentiment));
        }

        if ($this->feedback->rating) {
            $message->line('Rating: ' . $this->feedback->rating . '/10');
        }

        return $message
            ->action('View Feedback', url('/projects/' . $this->feedback->project_id))
            ->line('Please review and take appropriate action if needed.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'feedback_id' => $this->feedback->id,
            'project_id' => $this->feedback->project_id,
            'project_name' => $this->feedback->project->name,
            'type' => 'new_client_feedback',
            'feedback_type' => $this->feedback->type,
            'sentiment' => $this->feedback->sentiment,
            'rating' => $this->feedback->rating,
        ];
    }
}
