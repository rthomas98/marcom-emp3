<?php

namespace App\Filament\Widgets;

use App\Models\Company;
use App\Models\Contact;
use App\Models\Deal;
use App\Models\Interaction;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CrmStatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;
    protected static ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        $totalDealsValue = Deal::where('pipeline_stage', '!=', 'closed_lost')
            ->sum('value');
        
        $openDealsValue = Deal::whereNotIn('pipeline_stage', ['closed_won', 'closed_lost'])
            ->sum('value');

        return [
            Stat::make('Total Companies', Company::count())
                ->description('Active organizations')
                ->descriptionIcon('heroicon-m-building-office')
                ->chart([7, 3, 4, 5, 6, 3, 5, 3])
                ->color('success'),

            Stat::make('Active Deals', Deal::whereNotIn('pipeline_stage', ['closed_won', 'closed_lost'])->count())
                ->description('$' . number_format($openDealsValue, 2) . ' in pipeline')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->chart([4, 7, 3, 5, 6, 3, 5, 3])
                ->color('warning'),

            Stat::make('Won Deals', Deal::where('pipeline_stage', 'closed_won')->count())
                ->description('$' . number_format($totalDealsValue, 2) . ' total value')
                ->descriptionIcon('heroicon-m-trophy')
                ->chart([3, 5, 7, 8, 6, 9, 5, 3])
                ->color('success'),

            Stat::make('Pending Follow-ups', 
                Interaction::whereNotNull('follow_up_date')
                    ->where('follow_up_done', false)
                    ->count()
            )
                ->description('Requires attention')
                ->descriptionIcon('heroicon-m-clock')
                ->color('danger'),
        ];
    }
} 