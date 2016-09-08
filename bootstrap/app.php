<?php

require_once __DIR__ . '/../vendor/autoload.php';

Dotenv::load(__DIR__ . '/../');

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that serves as the central piece of this framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/

$app = new Laravel\Lumen\Application(
    realpath(__DIR__ . '/../')
);

$app->withFacades();

$app->withEloquent();

/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/


$app->middleware(
    [
        // Illuminate\Cookie\Middleware\EncryptCookies::class,
        // Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        Illuminate\Session\Middleware\StartSession::class,
        // Illuminate\View\Middleware\ShareErrorsFromSession::class,
        // Laravel\Lumen\Http\Middleware\VerifyCsrfToken::class,
        App\Http\Middleware\Localization::class
    ]
);

$app->routeMiddleware(
    [
        'user' => App\Http\Middleware\Authenticate::class
    ]
);

/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/

//$app->register('Collective\Html\HtmlServiceProvider');
//$app->register('Laracasts\Utilities\UtilitiesServiceProvider');
$app->register(App\Providers\AppServiceProvider::class);
$app->register(Maatwebsite\Excel\ExcelServiceProvider::class);
$app->register(LynX39\LaraPdfMerger\PdfMergerServiceProvider::class);

class_alias('Maatwebsite\Excel\Facades\Excel', 'Excel');
//class_alias('Collective\Html\FormFacade', 'Form');
class_alias('Illuminate\Support\Facades\Response', 'Response');
class_alias('LynX39\LaraPdfMerger\Facades\PdfMerger', 'PdfMerger');


// $app->register(App\Providers\EventServiceProvider::class);


config(
    [
        'hoglog'       => [
            'rootPrefix' => 'logger/',
            'logdir'     => storage_path() . '/logs'
        ],
        'language'     => [
            'en' => [
                'code'         => 'en',
                'name'         => 'English',
                'country_code' => 'us',
                'dir'          => 'ltr'
            ],
            'fr' => [
                'code'         => 'fr',
                'country_code' => 'fr',
                'name'         => 'French',
                'dir'          => 'ltl'
            ],
            'ar' => [
                'code'         => 'ar',
                'country_code' => 'tn',
                'name'         => 'Arabic',
                'dir'          => 'rtl'
            ]

        ],
        'localisation' => true,
        'clip'         => true,
    ]
);
$app->register('HogLog\HogLogServiceProvider');


/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/

$app->group(
    ['namespace' => 'App\Http\Controllers'],
    function ($app) {
        require __DIR__ . '/../app/Http/routes.php';
    }
);

return $app;
