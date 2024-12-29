<?php

namespace App\Notifications;

use App\Models\Project;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewTeamMemberAdded extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Project $project,
        public User $member,
        public User $addedBy,
        public array $roles = []
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Team Member Added: ' . $this->project->name)
            ->line('A new team member has been added to project: ' . $this->project->name)
            ->line('Member: ' . $this->member->name)
            ->line('Added by: ' . $this->addedBy->name)
            ->line('Date: ' . now()->format('M d, Y H:i'));

        // Add roles if assigned
        if (!empty($this->roles)) {
            $message->line('Assigned Roles:');
            foreach ($this->roles as $role) {
                $message->line('- ' . ucfirst($role));
            }
        }

        // Add project details
        $message->line('Project Details:')
            ->line('Client: ' . $this->project->company?->name)
            ->line('Status: ' . ucfirst($this->project->status))
            ->line('Due Date: ' . $this->project->due_date?->format('M d, Y'));

        // Add team size
        $teamSize = $this->project->team()->count();
        $message->line("Total Team Size: {$teamSize} members");

        return $message
            ->action('View Project', url('/projects/' . $this->project->id))
            ->line('Please welcome the new team member and help them get started.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
            'member_id' => $this->member->id,
            'member_name' => $this->member->name,
            'added_by_id' => $this->addedBy->id,
            'added_by_name' => $this->addedBy->name,
            'roles' => $this->roles,
            'type' => 'new_team_member_added',
            'team_size' => $this->project->team()->count(),
            'added_at' => now()->format('Y-m-d H:i:s'),
        ];
    }
} 