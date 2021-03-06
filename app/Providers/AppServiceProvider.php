<?php namespace App\Providers;

use App\Http\Services\LocalizationService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Aws\S3\S3Client;
use League\Flysystem\AwsS3v2\AwsS3Adapter;
use League\Flysystem\Filesystem;

/**
 * Class AppServiceProvider
 * @package App\Providers
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('*', function ($view) {
            $data = [
                'lang' => app(LocalizationService::class)
            ];
            $view->with($data);
        });

        Storage::extend(
            's3',
            function ($app, $config) {
                $client  = S3Client::factory(
                    [
                        'key'    => env('AWS_KEY'),
                        'secret' => env('AWS_SECRET'),
                        'region' => env('AWS_REGION'),
                    ]
                );
                $adapter = new AwsS3Adapter($client, env('AWS_BUCKET'));

                return new Filesystem($adapter);
            }
        );

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
