<?php

namespace App\Filament\Widgets;

use App\Models\Contact;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentlyAddedContacts extends BaseWidget
{
    protected static ?int $sort = 7;
    protected int|string|array $columnSpan = 1;
    protected static ?string $heading = 'Recently Added Contacts';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Contact::query()
                    ->latest()
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\TextColumn::make('full_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('company.name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->paginated(false);
    }
} 