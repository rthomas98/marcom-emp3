<?php

namespace App\Filament\Widgets;

use App\Models\Deal;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class DealsPipeline extends ChartWidget
{
    protected static ?string $heading = 'Deals Pipeline';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $stages = [
            'qualification' => 'Qualification',
            'proposal' => 'Proposal',
            'negotiation' => 'Negotiation',
            'closed_won' => 'Closed Won',
            'closed_lost' => 'Closed Lost',
        ];

        $dealsByStage = Deal::select('pipeline_stage', DB::raw('count(*) as count'), DB::raw('sum(value) as value'))
            ->groupBy('pipeline_stage')
            ->get()
            ->keyBy('pipeline_stage');

        $counts = [];
        $values = [];
        foreach ($stages as $stage => $label) {
            $counts[] = $dealsByStage->get($stage)?->count ?? 0;
            $values[] = $dealsByStage->get($stage)?->value ?? 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Number of Deals',
                    'data' => $counts,
                    'backgroundColor' => '#36A2EB',
                ],
                [
                    'label' => 'Value ($)',
                    'data' => $values,
                    'backgroundColor' => '#FF6384',
                ],
            ],
            'labels' => array_values($stages),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    public function getColumnSpan(): int | string | array
    {
        return 'full';
    }
} 