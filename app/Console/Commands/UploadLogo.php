<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class UploadLogo extends Command
{
    protected $signature = 'logo:upload';
    protected $description = 'Upload logo to DigitalOcean Spaces';

    public function handle()
    {
        $sourcePath = public_path('images/logos/logo.svg');
        $destinationPath = 'images/logos/logo.svg';

        if (!file_exists($sourcePath)) {
            $this->error('Logo file not found!');
            return 1;
        }

        try {
            $fileContents = file_get_contents($sourcePath);
            Storage::disk('do_spaces')->put($destinationPath, $fileContents, 'public');
            $this->info('Logo uploaded successfully!');
            return 0;
        } catch (\Exception $e) {
            $this->error('Error uploading logo: ' . $e->getMessage());
            return 1;
        }
    }
}
