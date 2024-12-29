<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Str;
use App\Notifications\UserInvitation;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'invitation_token',
        'invitation_sent_at',
        'invitation_accepted_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'invitation_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'invitation_sent_at' => 'datetime',
            'invitation_accepted_at' => 'datetime',
        ];
    }

    public function assignedTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    public function createdTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return !is_null($this->password) && $this->hasAcceptedInvitation();
    }

    public function sendInvitation(): void
    {
        $this->invitation_token = Str::random(64);
        $this->invitation_sent_at = now();
        $this->save();

        $this->notify(new UserInvitation($this->invitation_token));
    }

    public function acceptInvitation(): void
    {
        $this->invitation_accepted_at = now();
        $this->invitation_token = null;
        $this->email_verified_at = now();
        $this->save();
    }

    public function hasAcceptedInvitation(): bool
    {
        return !is_null($this->invitation_accepted_at);
    }

    public function isPendingInvitation(): bool
    {
        return !is_null($this->invitation_token);
    }
}
