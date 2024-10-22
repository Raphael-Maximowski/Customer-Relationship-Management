<?php

use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FunnelController;
use App\Http\Controllers\ValidateEmailcontroller;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\StepController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\LogController;

Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});



Route::post('register',[AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('logout', [AuthController::class, 'logout']);
});

Route::get('user/{id}', [UserController::class, 'profile']);

// Rota para verificar se o usuário está no banco de dados para enviar o email
Route::post('forget_password', [EmailController::class, 'emailValidated'])
    ->middleware('guest')
    ->name('forget_password');

// fazendo a validação para o update da senha
Route::post('reset_password', [EmailController::class, 'resetPassword'])
->middleware('guest')
->name('password.update');

Route::get('email/verify/{id}/{hash}', [AuthController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');

Route::post('email/send-verification', [ValidateEmailcontroller::class, 'sendVerificationLink']);

// a rota para mostrar o usuário autenticado
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [UserController::class, 'getAuthenticatedUser']);
});

Route::put('users/make-admin/{email}', [UserController::class, 'makeAdmin']);


//rotas coleção (preciso ver se posso adicionar elas no grupo acima para autenticar)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('collections', [CollectionController::class, 'index']);
    Route::get('collections/page/{page}', [CollectionController::class, 'index']);
    Route::post('collections', [CollectionController::class, 'store']);
    Route::get('collections/{id}', [CollectionController::class, 'show']);
    Route::put('collections/{id}', [CollectionController::class, 'update']);
    Route::delete('collections/{id}', [CollectionController::class, 'destroy']);
});

//rotas funil

Route::middleware('auth:sanctum')->group(function () {
    Route::get('funnels/collection/{collection_id}', [FunnelController::class, 'index']);
    Route::post('funnels', [FunnelController::class, 'store']);
    Route::get('funnels/{id}', [FunnelController::class, 'show']);
    Route::patch('funnels/{id}', [FunnelController::class, 'update']);
    Route::delete('funnels/{id}', [FunnelController::class, 'destroy']);
    Route::post('funnels/search', [FunnelController::class, 'search']);
});

Route::post('users/search', [UserController::class, 'search']);  // formas de usar no insomnia "users/search?name=nome,email ou sobrenome"

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('teams')->group(function () {
        Route::get('', [TeamController::class, 'index']);
        Route::post('', [TeamController::class, 'store']);
        Route::get('/{id}', [TeamController::class, 'show']);
        Route::put('/{id}', [TeamController::class, 'update']);
        Route::delete('/{id}', [TeamController::class, 'destroy']);

        Route::post('/{teamId}/add-user', [TeamController::class, 'addUserToTeam']);
        Route::delete('/{teamId}/remove-user/{userId}', [TeamController::class, 'removeUserFromTeam']);

        Route::post('/{teamId}/add-collection/{collectionId}', [TeamController::class, 'addCollectionToTeam']);
        Route::delete('/teams/{teamId}/remove-collection/{collectionId}', [TeamController::class, 'removeCollectionFromTeam']);


    });
});

Route::middleware('auth:sanctum')->group(function () {
    // Rotas para etapas
    Route::post('steps', [StepController::class, 'store']);
    Route::get('steps/{id}', [StepController::class, 'index']);
    Route::get('step/{id}', [StepController::class, 'show']);
    Route::patch('stepedit/{id}', [StepController::class, 'editinfo']);
    Route::patch('steps/{id}', [StepController::class, 'update']);
    Route::delete('steps/{id}', [StepController::class, 'destroy']);

    // Rotas para contatos
    Route::get('contacts/{id}', [ContactController::class, 'index']);
    Route::post('contacts', [ContactController::class, 'store']);
    Route::get('contact/{id}', [ContactController::class, 'show']);
    Route::patch('contacts/{id}', [ContactController::class, 'update']);
    Route::patch('contacts/update-old-step/{id}', [ContactController::class, 'updateOldStep']);
    Route::patch('contacts/update-new-step/{id}', [ContactController::class, 'updateNewStep']);
    Route::patch('contacts/update-infos/{id}', [ContactController:: class, 'updateInfos']);
    Route::delete('contacts/{id}', [ContactController::class, 'destroy']);
    Route::post('contacts/search', [ContactController::class, 'search']);

    Route::get('empresas', [EmpresaController::class, 'index']);
    Route::post('empresas', [EmpresaController::class, 'store']);
    Route::get('empresas/{id}', [EmpresaController::class, 'show']);
    Route::put('empresas/{id}', [EmpresaController::class, 'update']);
    Route::delete('empresas/{id}', [EmpresaController::class, 'destroy']);

    Route::post('/profile/photo/upload', [UserController::class, 'uploadPhoto'])->name('profile.photo.upload');
    Route::get('/profile/photo/{id}', [UserController::class, 'getPhoto'])->name('profile.photo.get');

    Route::get('/logs', [LogController::class, 'index'])->name('logs.index');
    Route::get('/logs/{id}', [LogController::class, 'show'])->name('logs.show');

    Route::get('/room/{user1}/{user2}', [MessageController::class, 'show']);
    Route::get('/history/{user1}/{user2}', [MessageController::class, 'history']);

});
