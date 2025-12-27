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
        Schema::table('service_catalog_items', function (Blueprint $table) {
            $table->string('provider_name')->nullable()->after('slug');
            $table->string('summary')->nullable()->after('provider_name');
            $table->string('service_logo_path')->nullable()->after('summary');
            $table->string('service_logo_name')->nullable()->after('service_logo_path');
            $table->unsignedBigInteger('service_logo_size')->nullable()->after('service_logo_name');
            $table->string('service_logo_disk')->default('public')->after('service_logo_size');
            $table->string('service_status')->default('online')->after('service_logo_disk');
            $table->string('service_cta_label')->nullable()->after('service_status');
            $table->string('service_cta_url')->nullable()->after('service_cta_label');
            $table->string('hotline_phone')->nullable()->after('service_cta_url');
            $table->string('service_website_url')->nullable()->after('hotline_phone');
            $table->text('service_address')->nullable()->after('service_website_url');
            $table->string('service_phone')->nullable()->after('service_address');
            $table->string('service_email')->nullable()->after('service_phone');
            $table->json('operational_hours')->nullable()->after('service_email');
            $table->json('social_links')->nullable()->after('operational_hours');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_catalog_items', function (Blueprint $table) {
            $table->dropColumn([
                'provider_name',
                'summary',
                'service_logo_path',
                'service_logo_name',
                'service_logo_size',
                'service_logo_disk',
                'service_status',
                'service_cta_label',
                'service_cta_url',
                'hotline_phone',
                'service_website_url',
                'service_address',
                'service_phone',
                'service_email',
                'operational_hours',
                'social_links',
            ]);
        });
    }
};
