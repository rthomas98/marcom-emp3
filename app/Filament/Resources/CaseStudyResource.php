<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CaseStudyResource\Pages;
use App\Models\CaseStudy;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CaseStudyResource extends Resource
{
    protected static ?string $model = CaseStudy::class;
    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 2;

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
                                Forms\Components\TextInput::make('client_name')
                                    ->required(),
                                Forms\Components\TextInput::make('client_industry')
                                    ->required(),
                                Forms\Components\Select::make('category_id')
                                    ->relationship('category', 'name')
                                    ->createOptionForm([
                                        Forms\Components\TextInput::make('name')
                                            ->required()
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn (string $state, Forms\Set $set) => 
                                                $set('slug', Str::slug($state))
                                            ),
                                        Forms\Components\TextInput::make('slug')
                                            ->required()
                                            ->unique()
                                            ->disabled()
                                            ->dehydrated(),
                                        Forms\Components\Textarea::make('description')
                                            ->rows(3),
                                    ])
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Media')
                            ->schema([
                                Forms\Components\FileUpload::make('featured_image')
                                    ->image()
                                    ->directory('case-studies/featured')
                                    ->columnSpanFull(),
                                Forms\Components\FileUpload::make('client_logo')
                                    ->image()
                                    ->directory('case-studies/logos')
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Section::make('Case Study Content')
                            ->schema([
                                Forms\Components\Textarea::make('summary')
                                    ->required()
                                    ->rows(3),
                                Forms\Components\RichEditor::make('challenge')
                                    ->required()
                                    ->columnSpanFull(),
                                Forms\Components\RichEditor::make('solution')
                                    ->required()
                                    ->columnSpanFull(),
                                Forms\Components\RichEditor::make('results')
                                    ->required()
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Section::make('Key Metrics')
                            ->schema([
                                Forms\Components\Repeater::make('key_metrics')
                                    ->schema([
                                        Forms\Components\TextInput::make('label')
                                            ->required(),
                                        Forms\Components\TextInput::make('value')
                                            ->required(),
                                        Forms\Components\TextInput::make('suffix')
                                            ->placeholder('%'),
                                    ])
                                    ->columns(3)
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'published' => 'Published',
                                    ])
                                    ->required(),
                                Forms\Components\DateTimePicker::make('published_at')
                                    ->required()
                                    ->native(false),
                                Forms\Components\Toggle::make('is_featured')
                                    ->label('Featured Case Study'),
                            ]),

                        Forms\Components\Section::make('Testimonial')
                            ->schema([
                                Forms\Components\TextInput::make('testimonial_author'),
                                Forms\Components\TextInput::make('testimonial_position'),
                                Forms\Components\Textarea::make('testimonial_content')
                                    ->rows(4),
                            ]),

                        Forms\Components\Section::make('SEO')
                            ->schema([
                                Forms\Components\TextInput::make('meta_title'),
                                Forms\Components\Textarea::make('meta_description')
                                    ->rows(3),
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
                Tables\Columns\ImageColumn::make('featured_image'),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('client_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('client_industry')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
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
                    ]),
                Tables\Filters\SelectFilter::make('client_industry')
                    ->options(fn () => CaseStudy::distinct()->pluck('client_industry', 'client_industry')->toArray()),
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
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCaseStudies::route('/'),
            'create' => Pages\CreateCaseStudy::route('/create'),
            'edit' => Pages\EditCaseStudy::route('/{record}/edit'),
        ];
    }
}
