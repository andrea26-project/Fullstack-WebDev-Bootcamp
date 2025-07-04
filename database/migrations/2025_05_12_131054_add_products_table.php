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
        Schema::create('products', function (Blueprint $table) {
$table->uuid('id')->primary();
$table->string('name')->unique();
$table->uuid('category_id');
$table->text('description')->nullable();
$table->string('company')->nullable();
$table->float('price');
$table->timestamps();

$table->foreign('category_id')
->references('id')
->on('categories');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
