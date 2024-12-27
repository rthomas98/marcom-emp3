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
        Schema::create('deployment_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('code_repository_id')->constrained()->cascadeOnDelete();
            $table->string('environment'); // local, development, staging, production
            $table->string('status'); // started, completed, failed, rolled_back
            $table->string('deployment_type'); // manual, automated, scheduled
            $table->string('version')->nullable();
            $table->string('branch');
            $table->string('commit_hash');
            $table->text('changes_deployed');
            $table->json('configuration_changes')->nullable();
            $table->json('environment_variables')->nullable();
            $table->text('deployment_notes')->nullable();
            $table->text('rollback_notes')->nullable();
            $table->foreignId('deployed_by')->constrained('users');
            $table->dateTime('started_at');
            $table->dateTime('completed_at')->nullable();
            $table->boolean('requires_migration')->default(false);
            $table->boolean('is_migration_successful')->nullable();
            $table->json('health_checks')->nullable();
            $table->json('performance_metrics')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deployment_logs');
    }
};
