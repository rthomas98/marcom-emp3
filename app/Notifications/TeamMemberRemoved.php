<?php

namespace App\Notifications;

use App\Models\Project;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TeamMemberRemoved extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Project $project,
        public User $member,
        public User $removedBy,
        public ?string $reason = null
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Team Member Removed: ' . $this->project->name)
            ->line('A team member has been removed from project: ' . $this->project->name)
            ->line('Member: ' . $this->member->name)
            ->line('Removed by: ' . $this->removedBy->name)
            ->line('Date: ' . now()->format('M d, Y H:i'));

        // Add reason if provided
        if ($this->reason) {
            $message->line('Reason: ' . $this->reason);
        }

        // Add project details
        $message->line('Project Details:')
            ->line('Client: ' . $this->project->company?->name)
            ->line('Status: ' . ucfirst($this->project->status))
            ->line('Due Date: ' . $this->project->due_date?->format('M d, Y'));

        // Add team size
        $teamSize = $this->project->team()->count();
        $message->line("Remaining Team Size: {$teamSize} members");

        // Add reassignment info for tasks
        $reassignedTasks = $this->project->tasks()
            ->where('assigned_to', $this->member->id)
            ->count();
        if ($reassignedTasks > 0) {
            $message->line("Note: {$reassignedTasks} tasks need to be reassigned");
        }

        return $message
            ->action('View Project', url('/projects/' . $this->project->id))
            ->line('Please ensure all tasks are properly reassigned if needed.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
            'member_id' => $this->member->id,
            'member_name' => $this->member->name,
            'removed_by_id' => $this->removedBy->id,
            'removed_by_name' => $this->removedBy->name,
            'reason' => $this->reason,
            'type' => 'team_member_removed',
            'team_size' => $this->project->team()->count(),
            'tasks_to_reassign' => $this->project->tasks()
                ->where('assigned_to', $this->member->id)
                ->count(),
            'removed_at' => now()->format('Y-m-d H:i:s'),
        ];
    }
} 