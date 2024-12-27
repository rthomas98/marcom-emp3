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
        Schema::create('team_performances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->integer('tasks_completed');
            $table->integer('story_points_completed')->nullable();
            $table->decimal('hours_logged', 8, 2);
            $table->decimal('billable_hours', 8, 2);
            $table->integer('code_commits')->nullable();
            $table->integer('code_reviews')->nullable();
            $table->integer('bugs_resolved')->nullable();
            $table->decimal('task_completion_rate', 5, 2);
            $table->decimal('code_quality_score', 5, 2)->nullable();
            $table->json('skills_demonstrated')->nullable();
            $table->json('additional_metrics')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_performances');
    }
};
