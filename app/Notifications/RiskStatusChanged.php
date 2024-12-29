<?php

namespace App\Notifications;

use App\Models\Risk;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RiskStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Risk $risk,
        public string $oldStatus,
        public string $newStatus,
        public User $changedBy,
        public ?string $notes = null
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Risk Status Updated: ' . $this->risk->project->name)
            ->line('A risk status has been updated for project: ' . $this->risk->project->name)
            ->line('Risk: ' . $this->risk->title)
            ->line('Previous Status: ' . ucfirst($this->oldStatus))
            ->line('New Status: ' . ucfirst($this->newStatus))
            ->line('Updated by: ' . $this->changedBy->name)
            ->line('Date: ' . now()->format('M d, Y H:i'));

        // Add update notes if provided
        if ($this->notes) {
            $message->line('Update Notes: ' . $this->notes);
        }

        // Add risk details
        $message->line('Risk Details:')
            ->line('Category: ' . ucfirst($this->risk->category))
            ->line('Severity: ' . ucfirst($this->risk->severity))
            ->line('Probability: ' . ucfirst($this->risk->probability))
            ->line('Impact: ' . ucfirst($this->risk->impact));

        // Add risk score
        $riskScore = $this->calculateRiskScore();
        $message->line('Risk Score: ' . $riskScore . ' (' . $this->getRiskLevel($riskScore) . ')');

        // Add mitigation status if available
        if ($this->risk->mitigation_status) {
            $message->line('Mitigation Status: ' . ucfirst($this->risk->mitigation_status));
        }

        // Add next review date if set
        if ($this->risk->next_review_date) {
            $message->line('Next Review: ' . $this->risk->next_review_date->format('M d, Y'));
        }

        return $message
            ->action('View Risk', url('/projects/' . $this->risk->project_id . '/risks/' . $this->risk->id))
            ->line('Please review the updated risk status and take any necessary actions.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'risk_id' => $this->risk->id,
            'risk_title' => $this->risk->title,
            'project_id' => $this->risk->project_id,
            'project_name' => $this->risk->project->name,
            'type' => 'risk_status_changed',
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'changed_by_id' => $this->changedBy->id,
            'changed_by_name' => $this->changedBy->name,
            'notes' => $this->notes,
            'risk_score' => $this->calculateRiskScore(),
            'mitigation_status' => $this->risk->mitigation_status,
            'next_review_date' => $this->risk->next_review_date?->format('Y-m-d'),
            'updated_at' => now()->format('Y-m-d H:i:s'),
        ];
    }

    protected function calculateRiskScore(): int
    {
        $severityScore = match ($this->risk->severity) {
            'critical' => 5,
            'high' => 4,
            'medium' => 3,
            'low' => 2,
            default => 1
        };

        $probabilityScore = match ($this->risk->probability) {
            'very_high' => 5,
            'high' => 4,
            'medium' => 3,
            'low' => 2,
            'very_low' => 1,
            default => 1
        };

        return $severityScore * $probabilityScore;
    }

    protected function getRiskLevel(int $score): string
    {
        return match (true) {
            $score >= 20 => 'Critical',
            $score >= 15 => 'High',
            $score >= 10 => 'Medium',
            $score >= 5 => 'Low',
            default => 'Very Low'
        };
    }
} 