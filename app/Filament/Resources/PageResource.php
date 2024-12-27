<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Basic Information')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $state, Forms\Set $set) => 
                                        $set('slug', Str::slug($state))
                                    ),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->disabled()
                                    ->dehydrated(),
                                Forms\Components\Select::make('layout')
                                    ->options([
                                        'default' => 'Default Layout',
                                        'full-width' => 'Full Width',
                                        'sidebar' => 'With Sidebar',
                                        'landing' => 'Landing Page',
                                    ])
                                    ->required(),
                                Forms\Components\Select::make('parent_id')
                                    ->label('Parent Page')
                                    ->relationship('parent', 'title'),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Content Blocks')
                            ->schema([
                                Forms\Components\Repeater::make('content')
                                    ->schema([
                                        Forms\Components\Select::make('type')
                                            ->options([
                                                'text' => 'Text Block',
                                                'image' => 'Image',
                                                'gallery' => 'Image Gallery',
                                                'video' => 'Video',
                                                'cta' => 'Call to Action',
                                                'features' => 'Features Grid',
                                                'testimonial' => 'Testimonial',
                                                'stats' => 'Statistics',
                                            ])
                                            ->required()
                                            ->live(),
                                        Forms\Components\RichEditor::make('content')
                                            ->columnSpanFull()
                                            ->visible(fn (Forms\Get $get) => $get('type') === 'text'),
                                        Forms\Components\FileUpload::make('image')
                                            ->image()
                                            ->directory('pages')
                                            ->visible(fn (Forms\Get $get) => in_array($get('type'), ['image', 'gallery'])),
                                        Forms\Components\TextInput::make('video_url')
                                            ->url()
                                            ->visible(fn (Forms\Get $get) => $get('type') === 'video'),
                                        Forms\Components\Group::make()
                                            ->schema([
                                                Forms\Components\TextInput::make('button_text'),
                                                Forms\Components\TextInput::make('button_url')
                                                    ->url(),
                                                Forms\Components\ColorPicker::make('background_color'),
                                            ])
                                            ->visible(fn (Forms\Get $get) => $get('type') === 'cta')
                                            ->columns(3),
                                        Forms\Components\Repeater::make('features')
                                            ->schema([
                                                Forms\Components\TextInput::make('title')->required(),
                                                Forms\Components\Textarea::make('description')->required(),
                                                Forms\Components\FileUpload::make('icon')
                                                    ->image()
                                                    ->directory('pages/icons'),
                                            ])
                                            ->visible(fn (Forms\Get $get) => $get('type') === 'features')
                                            ->columns(3),
                                    ])
                                    ->columnSpanFull()
                                    ->collapsible(),
                            ]),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status & Visibility')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'published' => 'Published',
                                        'scheduled' => 'Scheduled',
                                    ])
                                    ->required(),
                                Forms\Components\DateTimePicker::make('published_at')
                                    ->required()
                                    ->native(false),
                                Forms\Components\Toggle::make('show_in_navigation')
                                    ->label('Show in Navigation')
                                    ->default(true),
                                Forms\Components\TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0),
                            ]),

                        Forms\Components\Section::make('Featured Image')
                            ->schema([
                                Forms\Components\FileUpload::make('featured_image')
                                    ->image()
                                    ->directory('pages/featured'),
                            ]),

                        Forms\Components\Section::make('SEO')
                            ->schema([
                                Forms\Components\TextInput::make('meta_title'),
                                Forms\Components\Textarea::make('meta_description')
                                    ->rows(3),
                            ]),

                        Forms\Components\Section::make('Additional Settings')
                            ->schema([
                                Forms\Components\KeyValue::make('settings')
                                    ->keyLabel('Setting Name')
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
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('url')
                    ->searchable(),
                Tables\Columns\TextColumn::make('layout')
                    ->searchable(),
                Tables\Columns\IconColumn::make('show_in_navigation')
                    ->boolean()
                    ->label('In Nav'),
                Tables\Columns\TextColumn::make('status')
                    ->sortable(),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'scheduled' => 'Scheduled',
                    ]),
                Tables\Filters\SelectFilter::make('layout')
                    ->options([
                        'default' => 'Default Layout',
                        'full-width' => 'Full Width',
                        'sidebar' => 'With Sidebar',
                        'landing' => 'Landing Page',
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
            ])
            ->defaultSort('sort_order');
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
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
