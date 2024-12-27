<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Project Management';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Project Details')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\RichEditor::make('description')
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'link',
                                        'bulletList',
                                        'orderedList',
                                        'codeBlock',
                                    ]),
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'planning' => 'Planning',
                                        'in_progress' => 'In Progress',
                                        'on_hold' => 'On Hold',
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
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Timeline & Budget')
                            ->schema([
                                Forms\Components\DatePicker::make('start_date'),
                                Forms\Components\DatePicker::make('due_date'),
                                Forms\Components\TextInput::make('budget')
                                    ->numeric()
                                    ->prefix('$'),
                                Forms\Components\TextInput::make('cost')
                                    ->numeric()
                                    ->prefix('$'),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Technical Details')
                            ->schema([
                                Forms\Components\TagsInput::make('technology_stack'),
                                Forms\Components\TextInput::make('repository_url')
                                    ->url()
                                    ->prefix('https://'),
                                Forms\Components\TextInput::make('staging_url')
                                    ->url()
                                    ->prefix('https://'),
                                Forms\Components\TextInput::make('production_url')
                                    ->url()
                                    ->prefix('https://'),
                            ])
                            ->columns(2),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Team')
                            ->schema([
                                Forms\Components\Select::make('project_manager_id')
                                    ->relationship('projectManager', 'name')
                                    ->required(),
                                Forms\Components\Select::make('team_members')
                                    ->multiple()
                                    ->relationship('teamMembers', 'name'),
                            ]),

                        Forms\Components\Section::make('Client')
                            ->schema([
                                Forms\Components\Select::make('company_id')
                                    ->relationship('company', 'name')
                                    ->searchable(),
                                Forms\Components\Select::make('contact_id')
                                    ->relationship('contact', 'first_name')
                                    ->searchable(),
                            ]),

                        Forms\Components\Section::make('Custom Fields')
                            ->schema([
                                Forms\Components\KeyValue::make('custom_fields')
                                    ->keyLabel('Field Name')
                                    ->valueLabel('Field Value')
                                    ->reorderable(),
                            ])
                            ->collapsible(),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('company.name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'planning' => 'gray',
                        'in_progress' => 'info',
                        'on_hold' => 'warning',
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
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('projectManager.name')
                    ->label('Project Manager')
                    ->searchable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'planning' => 'Planning',
                        'in_progress' => 'In Progress',
                        'on_hold' => 'On Hold',
                        'completed' => 'Completed',
                    ]),
                Tables\Filters\SelectFilter::make('priority')
                    ->options([
                        'low' => 'Low',
                        'medium' => 'Medium',
                        'high' => 'High',
                        'urgent' => 'Urgent',
                    ]),
                Tables\Filters\SelectFilter::make('project_manager')
                    ->relationship('projectManager', 'name'),
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
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
            'kanban' => Pages\KanbanProjects::route('/kanban'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'in_progress')->count();
    }
}
