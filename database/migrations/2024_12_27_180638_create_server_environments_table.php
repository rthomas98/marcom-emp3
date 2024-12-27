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
        Schema::create('server_environments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('name'); // development, staging, production, etc.
            $table->string('domain');
            $table->string('server_type'); // aws, digitalocean, custom, etc.
            $table->string('server_location')->nullable();
            $table->string('php_version');
            $table->json('installed_extensions')->nullable();
            $table->json('environment_variables')->nullable();
            $table->text('ssh_access_details')->nullable();
            $table->json('backup_configuration')->nullable();
            $table->json('monitoring_configuration')->nullable();
            $table->json('security_configuration')->nullable();
            $table->json('scaling_configuration')->nullable();
            $table->text('deployment_instructions')->nullable();
            $table->text('maintenance_notes')->nullable();
            $table->json('health_check_endpoints')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('server_environments');
    }
};
