<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PostPublished extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Post $post,
        public User $publishedBy
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('New Post Published: ' . $this->post->title)
            ->line('A new post has been published.')
            ->line('Title: ' . $this->post->title);

        if ($this->post->excerpt) {
            $message->line('Preview: ' . $this->post->excerpt);
        }

        $message->line('Category: ' . $this->post->category->name)
            ->line('Published by: ' . $this->publishedBy->name)
            ->line('Published at: ' . $this->post->published_at->format('M d, Y H:i'));

        if ($this->post->tags->count() > 0) {
            $message->line('Tags: ' . $this->post->tags->pluck('name')->join(', '));
        }

        return $message
            ->action('Read Post', url('/blog/' . $this->post->slug))
            ->line('We hope you enjoy reading this new content!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'post_slug' => $this->post->slug,
            'category_id' => $this->post->category_id,
            'category_name' => $this->post->category->name,
            'published_by_id' => $this->publishedBy->id,
            'published_by_name' => $this->publishedBy->name,
            'published_at' => $this->post->published_at->format('Y-m-d H:i:s'),
            'type' => 'post_published',
        ];
    }
} 