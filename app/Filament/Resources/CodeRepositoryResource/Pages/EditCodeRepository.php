<?php

namespace App\Filament\Resources\CodeRepositoryResource\Pages;

use App\Filament\Resources\CodeRepositoryResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCodeRepository extends EditRecord
{
    protected static string $resource = CodeRepositoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
