<?php

use App\Http\Controllers\GuideController;
use App\Http\Controllers\TripController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('guide/{user}', [GuideController::class, 'show']);
Route::get('guides', [GuideController::class, 'index']);
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
