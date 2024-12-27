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
        Schema::create('development_tools', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type'); // ide, ci_cd, monitoring, testing, analytics
            $table->string('provider'); // github, aws, newrelic, etc.
            $table->text('configuration')->nullable();
            $table->json('integration_details')->nullable();
            $table->text('api_key')->nullable();
            $table->text('webhook_url')->nullable();
            $table->json('notification_settings')->nullable();
            $table->text('documentation_url')->nullable();
            $table->decimal('monthly_cost', 10, 2)->nullable();
            $table->date('subscription_renewal_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('development_tools');
    }
};
