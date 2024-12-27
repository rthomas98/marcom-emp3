<?php

namespace App\Filament\Widgets;

use App\Models\Company;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Support\Facades\DB;

class TopPerformingCompanies extends BaseWidget
{
    protected static ?int $sort = 5;
    protected int|string|array $columnSpan = 1;
    protected static ?string $heading = 'Top Companies by Deal Value';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Company::query()
                    ->select([
                        'companies.*',
                        DB::raw("SUM(CASE WHEN deals.pipeline_stage = 'closed_won' THEN deals.value ELSE 0 END) as total_won_value"),
                        DB::raw("COUNT(DISTINCT CASE WHEN deals.pipeline_stage = 'closed_won' THEN deals.id END) as won_deals_count")
                    ])
                    ->leftJoin('deals', 'companies.id', '=', 'deals.company_id')
                    ->groupBy('companies.id')
                    ->having(DB::raw("SUM(CASE WHEN deals.pipeline_stage = 'closed_won' THEN deals.value ELSE 0 END)"), '>', 0)
                    ->orderByRaw("SUM(CASE WHEN deals.pipeline_stage = 'closed_won' THEN deals.value ELSE 0 END) DESC")
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('won_deals_count')
                    ->label('Won Deals')
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_won_value')
                    ->money()
                    ->sortable()
                    ->label('Total Value'),
            ])
            ->paginated(false);
    }
} 