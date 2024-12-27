<?php

namespace App\Filament\Resources\CaseStudyCategoryResource\Pages;

use App\Filament\Resources\CaseStudyCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCaseStudyCategory extends EditRecord
{
    protected static string $resource = CaseStudyCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
