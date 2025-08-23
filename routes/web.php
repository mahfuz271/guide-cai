<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuideAvailabilityController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TripController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GuideController::class, 'welcome'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Guide availability
    Route::get('/guide/availability', [GuideAvailabilityController::class, 'index'])
        ->name('guides.availability');
    Route::post('/guide/availability', [GuideAvailabilityController::class, 'store'])
        ->name('guides.availability.store');
    Route::delete('/guide/availability/{availability}', [GuideAvailabilityController::class, 'destroy'])
        ->name('guides.availability.destroy');

    // Bookings
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::post('/bookings/{booking}/status', [BookingController::class, 'updateStatus'])
        ->name('bookings.update-status');

    Route::post('/bookings/{booking}/review', [ReviewController::class, 'store'])
        ->name('bookings.review.store');
});

Route::get('guide/{user}', [GuideController::class, 'show'])->name('guides.show');
Route::get('guides', [GuideController::class, 'index'])->name('guides.index');
Route::get('explore', [TripController::class, 'index']);

Route::middleware(['auth', 'admin'])->namespace('App\Http\Controllers\Admin')->group(function () {
    Route::get('admin/users/{user}/status', 'UserController@updateStatus');
    Route::get('admin/users/{user}/delete', 'UserController@deleteUser');
    Route::get('admin/users', 'UserController@showVisitorUsers');
    Route::get('admin/guides', 'UserController@showGuides');
    Route::get('admin/admin-users', 'UserController@showAdminUser');
    Route::get('admin/approvals', 'UserController@showPendingUsers');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
