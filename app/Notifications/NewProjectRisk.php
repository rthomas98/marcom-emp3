<?php

namespace App\Notifications;

use App\Models\Risk;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewProjectRisk extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Risk $risk
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Risk Identified: ' . $this->risk->project->name)
            ->line('A new risk has been identified for project: ' . $this->risk->project->name)
            ->line('Risk: ' . $this->risk->title)
            ->line('Category: ' . ucfirst($this->risk->category))
            ->line('Severity: ' . ucfirst($this->risk->severity))
            ->line('Probability: ' . ucfirst($this->risk->probability))
            ->line('Impact: ' . ucfirst($this->risk->impact))
            ->line('Identified by: ' . $this->risk->identifiedBy->name)
            ->line('Date: ' . $this->risk->created_at->format('M d, Y H:i'));

        // Add description
        if ($this->risk->description) {
            $message->line('Description: ' . $this->risk->description);
        }

        // Add mitigation plan if available
        if ($this->risk->mitigation_plan) {
            $message->line('Mitigation Plan: ' . $this->risk->mitigation_plan);
        }

        // Add contingency plan if available
        if ($this->risk->contingency_plan) {
            $message->line('Contingency Plan: ' . $this->risk->contingency_plan);
        }

        // Add affected areas if available
        if ($this->risk->affected_areas && count($this->risk->affected_areas) > 0) {
            $message->line('Affected Areas: ' . implode(', ', $this->risk->affected_areas));
        }

        // Add risk score
        $riskScore = $this->calculateRiskScore();
        $message->line('Risk Score: ' . $riskScore . ' (' . $this->getRiskLevel($riskScore) . ')');

        // Add status and next review
        $message->line('Status: ' . ucfirst($this->risk->status));
        if ($this->risk->next_review_date) {
            $message->line('Next Review: ' . $this->risk->next_review_date->format('M d, Y'));
        }

        return $message
            ->action('View Risk', url('/projects/' . $this->risk->project_id . '/risks/' . $this->risk->id))
            ->line('Please review the risk details and take necessary actions.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'risk_id' => $this->risk->id,
            'risk_title' => $this->risk->title,
            'project_id' => $this->risk->project_id,
            'project_name' => $this->risk->project->name,
            'type' => 'new_project_risk',
            'category' => $this->risk->category,
            'severity' => $this->risk->severity,
            'probability' => $this->risk->probability,
            'impact' => $this->risk->impact,
            'status' => $this->risk->status,
            'identified_by_id' => $this->risk->identified_by,
            'identified_by_name' => $this->risk->identifiedBy->name,
            'risk_score' => $this->calculateRiskScore(),
            'affected_areas' => $this->risk->affected_areas,
            'next_review_date' => $this->risk->next_review_date?->format('Y-m-d'),
            'created_at' => $this->risk->created_at->format('Y-m-d H:i:s'),
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