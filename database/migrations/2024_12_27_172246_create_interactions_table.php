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
        Schema::create('interactions', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // email, call, meeting, note
            $table->text('content');
            $table->foreignId('contact_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('company_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('deal_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained(); // who logged the interaction
            $table->datetime('interaction_date');
            $table->datetime('follow_up_date')->nullable();
            $table->string('follow_up_type')->nullable();
            $table->boolean('follow_up_done')->default(false);
            $table->json('metadata')->nullable(); // For storing type-specific data
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interactions');
    }
};
