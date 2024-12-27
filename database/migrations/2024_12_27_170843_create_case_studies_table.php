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
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('client_name');
            $table->string('client_industry');
            $table->string('featured_image')->nullable();
            $table->string('client_logo')->nullable();
            $table->text('summary');
            $table->longText('challenge');
            $table->longText('solution');
            $table->longText('results');
            $table->json('key_metrics')->nullable();
            $table->string('testimonial_author')->nullable();
            $table->string('testimonial_position')->nullable();
            $table->text('testimonial_content')->nullable();
            $table->string('status')->default('draft'); // draft, published
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_studies');
    }
};
