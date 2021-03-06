<?php

use App\Http\Controllers\AdvertisementsController;
use App\Http\Controllers\BidsController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RubricsController;
use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/advertisements', [AdvertisementsController::class, 'index']);

Route::get('/rubrics', [RubricsController::class, 'index']);

Route::post('/advertisements', [AdvertisementsController::class, 'store']);

Route::post('/advertisements/search', [AdvertisementsController::class, 'searchByDistance']);

require __DIR__.'/auth.php';

Route::put('/setpriority/{advertisement}', [AdvertisementsController::class, 'setPriority']);

Route::put('/advertisements/{advertisement}', [AdvertisementsController::class, 'update']);

Route::get('/bids', [BidsController::class, 'index']);

Route::post('/bids', [BidsController::class, 'store']);

Route::put('/bids/{bid}', [BidsController::class, 'update']);

Route::delete('/delete/{advertisement}', [AdvertisementsController::class, 'destroy']);

Route::middleware('auth')->get('/chat/rooms', [ChatController::class, 'rooms']);

Route::middleware('auth')->get('/chat/room/{roomId}/messages', [ChatController::class, 'messages']);

Route::middleware('auth')->post('/chat/room/{roomId}/message', [ChatController::class, 'newMessage']);

Route::middleware('auth')->post('/chat/newroom/', [ChatController::class, 'newRoom']);
