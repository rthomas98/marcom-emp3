<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\CrmStatsOverview;
use App\Filament\Widgets\DealsPipeline;
use App\Filament\Widgets\LatestInteractions;
use App\Filament\Widgets\UpcomingFollowUps;
use App\Filament\Widgets\TopPerformingCompanies;
use App\Filament\Widgets\SalesPerformance;
use App\Filament\Widgets\RecentlyAddedContacts;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationGroup = null;
    protected static ?int $navigationSort = -2;

    public function getWidgets(): array
    {
        return [
            CrmStatsOverview::class,
            DealsPipeline::class,
            UpcomingFollowUps::class,
            LatestInteractions::class,
        ];
    }

    public function getColumns(): int | array
    {
        return 2;
    }

    protected function getHeaderWidgets(): array
    {
        return [
            CrmStatsOverview::class,
            SalesPerformance::class,
        ];
    }

    protected function getFooterWidgets(): array
    {
        return [
            DealsPipeline::class,
            TopPerformingCompanies::class,
            RecentlyAddedContacts::class,
            UpcomingFollowUps::class,
            LatestInteractions::class,
        ];
    }
} 