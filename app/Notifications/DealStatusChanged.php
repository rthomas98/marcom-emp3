<?php

namespace App\Notifications;

use App\Models\Deal;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DealStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Deal $deal,
        public string $oldStatus,
        public User $changedBy
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Deal Status Update: ' . $this->deal->name)
            ->line('A deal status has been updated.')
            ->line('Deal: ' . $this->deal->name)
            ->line('Company: ' . $this->deal->company->name)
            ->line('Previous Status: ' . ucfirst($this->oldStatus))
            ->line('New Status: ' . ucfirst($this->deal->status))
            ->line('Changed by: ' . $this->changedBy->name)
            ->line('Value: $' . number_format($this->deal->value, 2));

        if ($this->deal->expected_close_date) {
            $message->line('Expected Close Date: ' . $this->deal->expected_close_date->format('M d, Y'));
        }

        return $message
            ->action('View Deal', url('/deals/' . $this->deal->id))
            ->line('Please review the updated deal details.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'deal_id' => $this->deal->id,
            'deal_name' => $this->deal->name,
            'company_id' => $this->deal->company_id,
            'company_name' => $this->deal->company->name,
            'old_status' => $this->oldStatus,
            'new_status' => $this->deal->status,
            'changed_by_id' => $this->changedBy->id,
            'changed_by_name' => $this->changedBy->name,
            'value' => $this->deal->value,
            'type' => 'deal_status_changed',
        ];
    }
} 