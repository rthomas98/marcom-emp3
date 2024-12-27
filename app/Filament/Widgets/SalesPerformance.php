<?php

namespace App\Filament\Widgets;

use App\Models\Deal;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SalesPerformance extends ChartWidget
{
    protected static ?string $heading = 'Sales Performance';
    protected static ?int $sort = 6;
    protected int|string|array $columnSpan = 2;

    protected function getData(): array
    {
        $months = collect(range(5, 0))->map(function ($month) {
            return Carbon::now()->subMonths($month)->format('Y-m');
        });

        $wonDeals = Deal::select(
            DB::raw("to_char(closed_date, 'YYYY-MM') as month"),
            DB::raw('SUM(value) as total_value'),
            DB::raw('COUNT(*) as count')
        )
            ->where('pipeline_stage', 'closed_won')
            ->whereDate('closed_date', '>=', Carbon::now()->subMonths(6))
            ->groupBy(DB::raw("to_char(closed_date, 'YYYY-MM')"))
            ->get()
            ->keyBy('month');

        $values = $months->map(fn ($month) => $wonDeals->get($month)?->total_value ?? 0);
        $counts = $months->map(fn ($month) => $wonDeals->get($month)?->count ?? 0);

        return [
            'datasets' => [
                [
                    'label' => 'Deal Value ($)',
                    'data' => $values->toArray(),
                    'borderColor' => '#36A2EB',
                    'fill' => false,
                ],
                [
                    'label' => 'Number of Deals',
                    'data' => $counts->toArray(),
                    'borderColor' => '#FF6384',
                    'fill' => false,
                ],
            ],
            'labels' => $months->map(fn ($month) => Carbon::createFromFormat('Y-m', $month)->format('M Y'))->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
} 