<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->middleware([
    'auth', 'admin'
    ])->group(function () {
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('products.variants', ProductVariantController::class);

    Route::get('/orders', function () {
    return inertia('order/index');
})->name('admin.orders.index');

    Route::get('/dashboard', function () {
        return inertia('home');
    })->name('dashboard');

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/login', function () {
    return inertia('login');
})->name('login');

Route::post('/login', [AuthController::class, 'authenticate']);

Route::get('/test', function() {
    return "test 123";
}) ->name('test');

