<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserInvitation extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $invitationToken
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = route('invitation.accept', ['token' => $this->invitationToken]);

        return (new MailMessage)
            ->subject('Welcome to ' . config('app.name'))
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('You have been invited to join ' . config('app.name'))
            ->line('Click the button below to set up your account and get started.')
            ->action('Accept Invitation', $url)
            ->line('This invitation link will expire in 48 hours.')
            ->line('If you did not expect this invitation, no further action is required.');
    }
} 