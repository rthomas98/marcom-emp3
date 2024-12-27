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
        Schema::create('api_endpoints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('api_collection_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('method'); // GET, POST, PUT, DELETE, etc.
            $table->string('path');
            $table->json('parameters')->nullable();
            $table->json('headers')->nullable();
            $table->json('request_body')->nullable();
            $table->json('response_examples')->nullable();
            $table->json('authentication')->nullable();
            $table->text('rate_limiting')->nullable();
            $table->json('validation_rules')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_deprecated')->default(false);
            $table->string('deprecated_reason')->nullable();
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
        Schema::dropIfExists('api_endpoints');
    }
};
