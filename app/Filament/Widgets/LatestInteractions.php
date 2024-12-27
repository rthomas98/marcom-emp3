<?php

namespace App\Filament\Widgets;

use App\Models\Interaction;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestInteractions extends BaseWidget
{
    protected static ?int $sort = 3;
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Interaction::query()
                    ->latest('interaction_date')
                    ->limit(5)
            )
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
                    ->searchable(),
                Tables\Columns\TextColumn::make('contact.full_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('content')
                    ->limit(50),
                Tables\Columns\TextColumn::make('interaction_date')
                    ->dateTime(),
            ])
            ->paginated(false);
    }
} 