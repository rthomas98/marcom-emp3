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
        Schema::create('code_repositories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('provider'); // github, gitlab, bitbucket
            $table->string('url');
            $table->string('main_branch')->default('main');
            $table->json('protected_branches')->nullable();
            $table->string('deployment_type')->nullable(); // manual, automated, github-actions, etc.
            $table->json('environment_urls')->nullable(); // staging, production, etc.
            $table->json('access_tokens')->nullable();
            $table->json('webhook_secrets')->nullable();
            $table->boolean('is_private')->default(true);
            $table->json('collaborators')->nullable();
            $table->text('deployment_instructions')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('code_repositories');
    }
};
