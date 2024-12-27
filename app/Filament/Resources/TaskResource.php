<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TaskResource\Pages;
use App\Models\Task;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class TaskResource extends Resource
{
    protected static ?string $model = Task::class;
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';
    protected static ?string $navigationGroup = 'Project Management';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Task Details')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Select::make('project_id')
                                    ->options(Project::query()->pluck('name', 'id'))
                                    ->required(),
                                Forms\Components\RichEditor::make('description')
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'link',
                                        'bulletList',
                                        'orderedList',
                                        'codeBlock',
                                    ]),
                                Forms\Components\Select::make('type')
                                    ->options([
                                        'task' => 'Task',
                                        'bug' => 'Bug',
                                        'feature' => 'Feature',
                                        'improvement' => 'Improvement',
                                    ])
                                    ->required(),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Status & Priority')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'todo' => 'To Do',
                                        'in_progress' => 'In Progress',
                                        'review' => 'Review',
                                        'completed' => 'Completed',
                                    ])
                                    ->required(),
                                Forms\Components\Select::make('priority')
                                    ->options([
                                        'low' => 'Low',
                                        'medium' => 'Medium',
                                        'high' => 'High',
                                        'urgent' => 'Urgent',
                                    ])
                                    ->required(),
                                Forms\Components\DatePicker::make('due_date'),
                            ])
                            ->columns(3),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Assignment')
                            ->schema([
                                Forms\Components\TextInput::make('assigned_to')
                                    ->numeric(),
                                Forms\Components\TextInput::make('parent_task_id')
                                    ->numeric()
                                    ->label('Parent Task'),
                            ]),

                        Forms\Components\Section::make('Time Tracking')
                            ->schema([
                                Forms\Components\TextInput::make('estimated_hours')
                                    ->numeric()
                                    ->label('Estimated Hours'),
                                Forms\Components\TextInput::make('actual_hours')
                                    ->numeric()
                                    ->label('Actual Hours'),
                            ]),

                        Forms\Components\Section::make('Labels & Checklist')
                            ->schema([
                                Forms\Components\TagsInput::make('labels'),
                                Forms\Components\KeyValue::make('checklist')
                                    ->keyLabel('Item')
                                    ->valueLabel('Done')
                                    ->reorderable(),
                            ]),

                        Forms\Components\Section::make('Attachments')
                            ->schema([
                                Forms\Components\FileUpload::make('attachments')
                                    ->multiple()
                                    ->directory('task-attachments'),
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
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('project_id')
                    ->formatStateUsing(fn ($state) => Project::find($state)?->name ?? '-')
                    ->label('Project'),
                Tables\Columns\TextColumn::make('type')
                    ->badge(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'todo' => 'gray',
                        'in_progress' => 'info',
                        'review' => 'warning',
                        'completed' => 'success',
                    }),
                Tables\Columns\TextColumn::make('priority')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'low' => 'gray',
                        'medium' => 'info',
                        'high' => 'warning',
                        'urgent' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('due_date')
                    ->date(),
                Tables\Columns\TextColumn::make('assigned_to')
                    ->numeric(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'todo' => 'To Do',
                        'in_progress' => 'In Progress',
                        'review' => 'Review',
                        'completed' => 'Completed',
                    ]),
                Tables\Filters\SelectFilter::make('priority')
                    ->options([
                        'low' => 'Low',
                        'medium' => 'Medium',
                        'high' => 'High',
                        'urgent' => 'Urgent',
                    ]),
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'task' => 'Task',
                        'bug' => 'Bug',
                        'feature' => 'Feature',
                        'improvement' => 'Improvement',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListTasks::route('/'),
            'create' => Pages\CreateTask::route('/create'),
            'edit' => Pages\EditTask::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'todo')->count();
    }
}
