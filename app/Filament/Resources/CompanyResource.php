<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyResource\Pages;
use App\Models\Company;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CompanyResource extends Resource
{
    protected static ?string $model = Company::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static ?string $navigationGroup = 'CRM';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Basic Information')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required(),
                                Forms\Components\TextInput::make('industry'),
                                Forms\Components\TextInput::make('website')
                                    ->url(),
                                Forms\Components\TextInput::make('email')
                                    ->email(),
                                Forms\Components\TextInput::make('phone'),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Address')
                            ->schema([
                                Forms\Components\Textarea::make('address')
                                    ->rows(3)
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('city'),
                                Forms\Components\TextInput::make('state'),
                                Forms\Components\TextInput::make('postal_code'),
                                Forms\Components\TextInput::make('country'),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Company Details')
                            ->schema([
                                Forms\Components\TextInput::make('employee_count')
                                    ->numeric(),
                                Forms\Components\TextInput::make('annual_revenue')
                                    ->numeric()
                                    ->prefix('$'),
                                Forms\Components\TextInput::make('linkedin_url')
                                    ->url()
                                    ->columnSpanFull(),
                                Forms\Components\Textarea::make('description')
                                    ->rows(3)
                                    ->columnSpanFull(),
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
                                        'customer' => 'Customer',
                                    ])
                                    ->required(),
                                Forms\Components\Select::make('assigned_to')
                                    ->relationship('assignedTo', 'name'),
                            ]),

                        Forms\Components\Section::make('Custom Fields')
                            ->schema([
                                Forms\Components\KeyValue::make('custom_fields')
                                    ->keyLabel('Field Name')
                                    ->valueLabel('Field Value')
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
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('industry')
                    ->searchable(),
                Tables\Columns\TextColumn::make('city')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'inactive' => 'danger',
                        'lead' => 'warning',
                        'customer' => 'info',
                    }),
                Tables\Columns\TextColumn::make('assignedTo.name')
                    ->label('Assigned To')
                    ->sortable(),
                Tables\Columns\TextColumn::make('contacts_count')
                    ->counts('contacts')
                    ->label('Contacts'),
                Tables\Columns\TextColumn::make('deals_count')
                    ->counts('deals')
                    ->label('Deals'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                        'lead' => 'Lead',
                        'customer' => 'Customer',
                    ]),
                Tables\Filters\SelectFilter::make('industry'),
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
            'index' => Pages\ListCompanies::route('/'),
            'create' => Pages\CreateCompany::route('/create'),
            'edit' => Pages\EditCompany::route('/{record}/edit'),
        ];
    }
}
