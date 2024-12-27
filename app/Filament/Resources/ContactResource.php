<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactResource\Pages;
use App\Models\Contact;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ContactResource extends Resource
{
    protected static ?string $model = Contact::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'CRM';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Basic Information')
                            ->schema([
                                Forms\Components\TextInput::make('first_name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('last_name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true),
                                Forms\Components\TextInput::make('phone')
                                    ->tel()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('mobile')
                                    ->tel()
                                    ->maxLength(255),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Company Details')
                            ->schema([
                                Forms\Components\Select::make('company_id')
                                    ->relationship('company', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->createOptionForm([
                                        Forms\Components\TextInput::make('name')
                                            ->required()
                                            ->maxLength(255),
                                        Forms\Components\TextInput::make('email')
                                            ->email()
                                            ->maxLength(255),
                                        Forms\Components\TextInput::make('phone')
                                            ->tel()
                                            ->maxLength(255),
                                    ]),
                                Forms\Components\TextInput::make('job_title')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('department')
                                    ->maxLength(255),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Address Information')
                            ->schema([
                                Forms\Components\Textarea::make('address')
                                    ->rows(3)
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('city')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('state')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('postal_code')
                                    ->maxLength(255),
                                Forms\Components\Select::make('country')
                                    ->searchable()
                                    ->options([
                                        'US' => 'United States',
                                        'CA' => 'Canada',
                                        'GB' => 'United Kingdom',
                                        'AU' => 'Australia',
                                        // Add more countries as needed
                                    ]),
                            ])
                            ->columns(2),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status & Assignment')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'active' => 'Active',
                                        'inactive' => 'Inactive',
                                        'lead' => 'Lead',
                                        'prospect' => 'Prospect',
                                        'client' => 'Client',
                                    ])
                                    ->required()
                                    ->default('lead'),
                                Forms\Components\Select::make('assigned_to')
                                    ->relationship('assignedTo', 'name')
                                    ->searchable()
                                    ->preload(),
                            ]),

                        Forms\Components\Section::make('Project Requirements')
                            ->schema([
                                Forms\Components\Select::make('project_type')
                                    ->multiple()
                                    ->options([
                                        'web_development' => 'Web Development',
                                        'mobile_app' => 'Mobile App',
                                        'ui_ux' => 'UI/UX Design',
                                        'ecommerce' => 'E-commerce',
                                        'cms' => 'CMS',
                                        'api_integration' => 'API Integration',
                                        'maintenance' => 'Maintenance',
                                    ]),
                                Forms\Components\Select::make('technology_stack')
                                    ->multiple()
                                    ->options([
                                        'php' => 'PHP',
                                        'laravel' => 'Laravel',
                                        'react' => 'React',
                                        'vue' => 'Vue.js',
                                        'node' => 'Node.js',
                                        'flutter' => 'Flutter',
                                        'react_native' => 'React Native',
                                        'wordpress' => 'WordPress',
                                    ]),
                                Forms\Components\TextInput::make('budget_range')
                                    ->prefix('$')
                                    ->numeric(),
                                Forms\Components\Select::make('project_timeline')
                                    ->options([
                                        'immediate' => 'Immediate',
                                        '1_3_months' => '1-3 months',
                                        '3_6_months' => '3-6 months',
                                        '6_plus_months' => '6+ months',
                                    ]),
                            ]),

                        Forms\Components\Section::make('Personal Information')
                            ->schema([
                                Forms\Components\TextInput::make('linkedin_url')
                                    ->label('LinkedIn Profile')
                                    ->url()
                                    ->prefix('https://')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('twitter_handle')
                                    ->prefix('@')
                                    ->maxLength(255),
                            ]),

                        Forms\Components\Section::make('Technical Contact Details')
                            ->schema([
                                Forms\Components\TextInput::make('github_username')
                                    ->prefix('@'),
                                Forms\Components\TextInput::make('current_website')
                                    ->url()
                                    ->prefix('https://'),
                                Forms\Components\Select::make('preferred_communication')
                                    ->options([
                                        'email' => 'Email',
                                        'phone' => 'Phone',
                                        'slack' => 'Slack',
                                        'teams' => 'Microsoft Teams',
                                        'whatsapp' => 'WhatsApp',
                                    ])
                                    ->default('email'),
                            ]),

                        Forms\Components\Section::make('Notes')
                            ->schema([
                                Forms\Components\RichEditor::make('notes')
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'link',
                                        'bulletList',
                                        'orderedList',
                                    ])
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Section::make('Custom Fields')
                            ->schema([
                                Forms\Components\KeyValue::make('custom_fields')
                                    ->keyLabel('Field Name')
                                    ->valueLabel('Field Value')
                                    ->reorderable()
                                    ->columnSpanFull(),
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
                Tables\Columns\TextColumn::make('full_name')
                    ->searchable(['first_name', 'last_name'])
                    ->sortable(['first_name']),
                Tables\Columns\TextColumn::make('company.name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('job_title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'inactive' => 'danger',
                        'lead' => 'warning',
                    }),
                Tables\Columns\TextColumn::make('assignedTo.name')
                    ->label('Assigned To')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                        'lead' => 'Lead',
                    ]),
                Tables\Filters\SelectFilter::make('company')
                    ->relationship('company', 'name'),
                Tables\Filters\SelectFilter::make('assigned_to')
                    ->relationship('assignedTo', 'name'),
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
            'index' => Pages\ListContacts::route('/'),
            'create' => Pages\CreateContact::route('/create'),
            'edit' => Pages\EditContact::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['first_name', 'last_name', 'email', 'phone', 'company.name'];
    }
}
