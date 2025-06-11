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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->unsignedBigInteger('user_id');
            $table->string('address');
            $table->string('phone');
            $table->string('postal_code');
            $table->string('url')->nullable();
            $table->float('total')->default(0);
            $table->string('payment_method')->nullable();
            $table->string('payment_channel')->nullable();
            $table->string('country');
            $table->enum('status', ['pending', 'paid', 'shipped', 'completed', 'cancelled'])->default('pending');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('add_orders');
    }
};
