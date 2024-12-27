<?php

namespace App\Filament\Widgets;

use App\Models\Interaction;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class UpcomingFollowUps extends BaseWidget
{
    protected static ?int $sort = 4;
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Interaction::query()
                    ->whereNotNull('follow_up_date')
                    ->where('follow_up_done', false)
                    ->orderBy('follow_up_date')
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\TextColumn::make('follow_up_type')
                    ->badge(),
                Tables\Columns\TextColumn::make('company.name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('contact.full_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('content')
                    ->limit(50),
                Tables\Columns\TextColumn::make('follow_up_date')
                    ->dateTime()
                    ->color(fn ($record) => 
                        $record->follow_up_date < now() ? 'danger' : 'warning'
                    ),
            ])
            ->actions([
                Tables\Actions\Action::make('complete')
                    ->icon('heroicon-m-check')
                    ->color('success')
                    ->action(fn (Interaction $record) => $record->update(['follow_up_done' => true])),
            ])
            ->paginated(false);
    }
} 