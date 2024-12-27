<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->integer('total_tasks');
            $table->integer('completed_tasks');
            $table->integer('story_points_total')->nullable();
            $table->integer('story_points_completed')->nullable();
            $table->decimal('planned_hours', 10, 2);
            $table->decimal('actual_hours', 10, 2);
            $table->decimal('planned_cost', 10, 2);
            $table->decimal('actual_cost', 10, 2);
            $table->integer('bugs_reported');
            $table->integer('bugs_resolved');
            $table->decimal('velocity', 5, 2)->nullable();
            $table->decimal('burn_rate', 10, 2)->nullable();
            $table->json('additional_metrics')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_metrics');
    }
};
