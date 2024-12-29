<?php

namespace App\Notifications;

use App\Models\Activity;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewProjectActivity extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Activity $activity
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Activity: ' . $this->activity->project->name)
            ->line('A new activity has been recorded on project: ' . $this->activity->project->name)
            ->line('Type: ' . ucfirst($this->activity->type))
            ->line('Description: ' . $this->activity->description)
            ->line('Performed by: ' . $this->activity->causer?->name)
            ->line('Date: ' . $this->activity->created_at->format('M d, Y H:i'));

        // Add related model details if available
        if ($this->activity->subject) {
            $message->line('Related to: ' . class_basename($this->activity->subject) . ' - ' . $this->getSubjectName());
        }

        // Add changes if available
        if ($this->activity->changes) {
            $message->line('Changes:');
            foreach ($this->activity->changes as $field => $change) {
                if (is_array($change) && isset($change['old']) && isset($change['new'])) {
                    $message->line("- {$field}: {$change['old']} → {$change['new']}");
                }
            }
        }

        return $message
            ->action('View Project', url('/projects/' . $this->activity->project_id))
            ->line('Please review the activity details if needed.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'activity_id' => $this->activity->id,
            'project_id' => $this->activity->project_id,
            'project_name' => $this->activity->project->name,
            'type' => 'new_project_activity',
            'activity_type' => $this->activity->type,
            'description' => $this->activity->description,
            'causer_id' => $this->activity->causer_id,
            'causer_name' => $this->activity->causer?->name,
            'subject_type' => $this->activity->subject_type,
            'subject_id' => $this->activity->subject_id,
            'changes' => $this->activity->changes,
            'created_at' => $this->activity->created_at->format('Y-m-d H:i:s'),
        ];
    }

    protected function getSubjectName(): string
    {
        if (!$this->activity->subject) {
            return 'Unknown';
        }

        return match (class_basename($this->activity->subject)) {
            'Task' => $this->activity->subject->title,
            'Milestone' => $this->activity->subject->name,
            'Comment' => 'Comment on ' . $this->activity->subject->commentable->title ?? 'Unknown',
            default => $this->activity->subject->name ?? 'Unknown'
        };
    }
} 