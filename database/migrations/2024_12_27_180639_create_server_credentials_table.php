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
        Schema::create('server_credentials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('server_environment_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('type'); // database, ssh, api, service
            $table->string('username')->nullable();
            $table->text('password')->nullable();
            $table->text('private_key')->nullable();
            $table->text('access_token')->nullable();
            $table->json('additional_details')->nullable();
            $table->dateTime('last_rotated_at')->nullable();
            $table->dateTime('expires_at')->nullable();
            $table->boolean('requires_rotation')->default(false);
            $table->integer('rotation_interval_days')->nullable();
            $table->string('created_by');
            $table->text('notes')->nullable();
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
        Schema::dropIfExists('server_credentials');
    }
};
