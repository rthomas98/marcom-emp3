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
        Schema::create('test_cases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('type'); // functional, integration, ui, performance, security
            $table->string('status')->default('draft'); // draft, active, deprecated
            $table->text('prerequisites')->nullable();
            $table->json('test_steps');
            $table->text('expected_result');
            $table->json('test_data')->nullable();
            $table->string('environment')->nullable();
            $table->boolean('is_automated')->default(false);
            $table->string('automation_script_path')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('last_executed_by')->nullable()->constrained('users');
            $table->dateTime('last_executed_at')->nullable();
            $table->string('last_execution_status')->nullable(); // passed, failed, blocked
            $table->text('last_execution_notes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_cases');
    }
};
