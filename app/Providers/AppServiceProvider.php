<?php namespace App\Providers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Aws\S3\S3Client;
use League\Flysystem\AwsS3v2\AwsS3Adapter;
use League\Flysystem\Filesystem;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
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
