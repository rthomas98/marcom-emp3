<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;

class CheckTasksDue extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks:check-due';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for tasks that are due soon and send notifications';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tasks = Task::query()
            ->whereNotNull('due_date')
            ->where('status', '!=', 'completed')
            ->where('due_date', '>', now())
            ->where('due_date', '<=', now()->addHours(24))
            ->get();

        foreach ($tasks as $task) {
            $task->checkDueDate();
        }

        $this->info("Checked " . $tasks->count() . " tasks for due date notifications.");
    }
}
