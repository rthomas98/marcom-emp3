<?php

namespace App\Filament\Resources\CodeRepositoryResource\Pages;

use App\Filament\Resources\CodeRepositoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCodeRepositories extends ListRecords
{
    protected static string $resource = CodeRepositoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
