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
        Schema::create('project_dependencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type'); // package, library, framework, service
            $table->string('current_version');
            $table->string('required_version');
            $table->string('latest_version')->nullable();
            $table->boolean('needs_update')->default(false);
            $table->text('update_notes')->nullable();
            $table->json('compatibility_requirements')->nullable();
            $table->json('security_advisories')->nullable();
            $table->text('documentation_url')->nullable();
            $table->text('repository_url')->nullable();
            $table->boolean('is_development_only')->default(false);
            $table->text('installation_instructions')->nullable();
            $table->json('configuration')->nullable();
            $table->dateTime('last_checked_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_dependencies');
    }
};
