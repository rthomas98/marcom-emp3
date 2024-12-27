<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InteractionResource\Pages;
use App\Models\Interaction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class InteractionResource extends Resource
{
    protected static ?string $model = Interaction::class;
    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationGroup = 'CRM';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Interaction Details')
                            ->schema([
                                Forms\Components\Select::make('type')
                                    ->options([
                                        'email' => 'Email',
                                        'call' => 'Phone Call',
                                        'meeting' => 'Meeting',
                                        'note' => 'Note',
                                        'task' => 'Task',
                                    ])
                                    ->required()
                                    ->live(),
                                Forms\Components\DateTimePicker::make('interaction_date')
                                    ->required()
                                    ->default(now()),
                                Forms\Components\RichEditor::make('content')
                                    ->required()
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Related Records')
                            ->schema([
                                Forms\Components\Select::make('company_id')
                                    ->relationship('company', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->createOptionForm([
                                        Forms\Components\TextInput::make('name')
                                            ->required(),
                                        Forms\Components\TextInput::make('email')
                                            ->email(),
                                        Forms\Components\TextInput::make('phone'),
                                    ]),
                                Forms\Components\Select::make('contact_id')
                                    ->relationship('contact', 'first_name', fn (Builder $query) => $query
                                        ->when(fn () => filled(request()->get('company_id')), 
                                            fn ($query) => $query->where('company_id', request()->get('company_id'))
                                        )
                                        ->selectRaw("CONCAT(first_name, ' ', last_name) as full_name")
                                    )
                                    ->searchable()
                                    ->preload()
                                    ->createOptionForm([
                                        Forms\Components\TextInput::make('first_name')
                                            ->required(),
                                        Forms\Components\TextInput::make('last_name')
                                            ->required(),
                                        Forms\Components\TextInput::make('email')
                                            ->email(),
                                    ]),
                                Forms\Components\Select::make('deal_id')
                                    ->relationship('deal', 'title')
                                    ->searchable()
                                    ->preload(),
                            ])
                            ->columns(3),

                        Forms\Components\Section::make('Follow-up')
                            ->schema([
                                Forms\Components\Toggle::make('needs_follow_up')
                                    ->label('Requires Follow-up')
                                    ->live()
                                    ->default(false),
                                Forms\Components\DateTimePicker::make('follow_up_date')
                                    ->required(fn (Forms\Get $get) => $get('needs_follow_up'))
                                    ->visible(fn (Forms\Get $get) => $get('needs_follow_up')),
                                Forms\Components\Select::make('follow_up_type')
                                    ->options([
                                        'call' => 'Phone Call',
                                        'email' => 'Email',
                                        'meeting' => 'Meeting',
                                        'task' => 'Task',
                                    ])
                                    ->required(fn (Forms\Get $get) => $get('needs_follow_up'))
                                    ->visible(fn (Forms\Get $get) => $get('needs_follow_up')),
                                Forms\Components\Toggle::make('follow_up_done')
                                    ->label('Follow-up Completed')
                                    ->visible(fn (Forms\Get $get) => $get('needs_follow_up')),
                            ])
                            ->columns(2),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Additional Details')
                            ->schema([
                                Forms\Components\KeyValue::make('metadata')
                                    ->keyLabel('Field')
                                    ->valueLabel('Value')
                                    ->reorderable(),
                            ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'email' => 'info',
                        'call' => 'success',
                        'meeting' => 'warning',
                        'note' => 'gray',
                        'task' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('company.name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('contact.full_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('deal.title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('interaction_date')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\IconColumn::make('follow_up_done')
                    ->boolean()
                    ->label('Follow-up')
                    ->visible(fn ($record) => $record->follow_up_date !== null),
                Tables\Columns\TextColumn::make('follow_up_date')
                    ->dateTime()
                    ->sortable()
                    ->color(fn ($record) => 
                        $record->follow_up_done ? 'gray' :
                        ($record->follow_up_date && $record->follow_up_date < now() ? 'danger' : 'warning')
                    ),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Logged By')
                    ->sortable(),
            ])
            ->defaultSort('interaction_date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'email' => 'Email',
                        'call' => 'Phone Call',
                        'meeting' => 'Meeting',
                        'note' => 'Note',
                        'task' => 'Task',
                    ]),
                Tables\Filters\SelectFilter::make('company')
                    ->relationship('company', 'name'),
                Tables\Filters\SelectFilter::make('contact')
                    ->relationship('contact', 'first_name'),
                Tables\Filters\Filter::make('follow_up')
                    ->form([
                        Forms\Components\Select::make('follow_up_status')
                            ->options([
                                'pending' => 'Pending',
                                'overdue' => 'Overdue',
                                'completed' => 'Completed',
                            ]),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when($data['follow_up_status'], function ($query, $status) {
                            return match ($status) {
                                'pending' => $query->whereNotNull('follow_up_date')
                                    ->where('follow_up_done', false)
                                    ->where('follow_up_date', '>=', now()),
                                'overdue' => $query->whereNotNull('follow_up_date')
                                    ->where('follow_up_done', false)
                                    ->where('follow_up_date', '<', now()),
                                'completed' => $query->where('follow_up_done', true),
                                default => $query,
                            };
                        });
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('complete_follow_up')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->visible(fn ($record) => $record->follow_up_date && !$record->follow_up_done)
                    ->action(fn ($record) => $record->update(['follow_up_done' => true])),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInteractions::route('/'),
            'create' => Pages\CreateInteraction::route('/create'),
            'edit' => Pages\EditInteraction::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::whereNotNull('follow_up_date')
            ->where('follow_up_done', false)
            ->where('follow_up_date', '<', now())
            ->count() ?: null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return static::getNavigationBadge() ? 'danger' : null;
    }
}
