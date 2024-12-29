<?php

namespace App\Notifications;

use App\Models\Document;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewProjectDocument extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Document $document
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Document Added: ' . $this->document->project->name)
            ->line('A new document has been added to project: ' . $this->document->project->name)
            ->line('Document: ' . $this->document->name)
            ->line('Type: ' . ucfirst($this->document->type))
            ->line('Added by: ' . $this->document->uploadedBy->name)
            ->line('Date: ' . $this->document->created_at->format('M d, Y H:i'));

        // Add description if available
        if ($this->document->description) {
            $message->line('Description: ' . $this->document->description);
        }

        // Add file details
        $message->line('File Details:')
            ->line('Size: ' . $this->formatFileSize($this->document->size))
            ->line('Format: ' . strtoupper($this->document->format));

        // Add version info if this is an update
        if ($this->document->version > 1) {
            $message->line('Version: ' . $this->document->version);
            if ($this->document->version_notes) {
                $message->line('Version Notes: ' . $this->document->version_notes);
            }
        }

        // Add category and tags if available
        if ($this->document->category) {
            $message->line('Category: ' . ucfirst($this->document->category));
        }
        if ($this->document->tags && count($this->document->tags) > 0) {
            $message->line('Tags: ' . implode(', ', $this->document->tags));
        }

        return $message
            ->action('View Document', url('/projects/' . $this->document->project_id . '/documents/' . $this->document->id))
            ->line('Please review the document if needed.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'document_id' => $this->document->id,
            'document_name' => $this->document->name,
            'project_id' => $this->document->project_id,
            'project_name' => $this->document->project->name,
            'type' => 'new_project_document',
            'document_type' => $this->document->type,
            'uploaded_by_id' => $this->document->uploaded_by,
            'uploaded_by_name' => $this->document->uploadedBy->name,
            'size' => $this->document->size,
            'format' => $this->document->format,
            'version' => $this->document->version,
            'category' => $this->document->category,
            'tags' => $this->document->tags,
            'created_at' => $this->document->created_at->format('Y-m-d H:i:s'),
        ];
    }

    protected function formatFileSize(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);

        return round($bytes, 2) . ' ' . $units[$pow];
    }
} 