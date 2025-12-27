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
        Schema::create('service_catalog_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_sector_id')
                ->constrained('service_sectors')
                ->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('media_information');
            $table->longText('community_benefits');
            $table->longText('sidatuk_features');
            $table->longText('service_terms');
            $table->longText('service_flow');
            $table->string('infographic_path')->nullable();
            $table->string('infographic_name')->nullable();
            $table->unsignedBigInteger('infographic_size')->nullable();
            $table->string('infographic_disk')->default('public');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['service_sector_id', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_catalog_items');
    }
};
