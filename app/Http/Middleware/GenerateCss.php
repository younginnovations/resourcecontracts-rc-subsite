<?php namespace App\Http\Middleware;

use App\Http\Services\Admin\ThemeService;
use Closure;

class GenerateCss
{
    public function __construct(ThemeService $themeService)
    {
        $this->themeService = $themeService;
    }

    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure                 $next
     * @return mixed
     * @internal param ThemeService $themeService
     * @internal param ThemeService $themeService
     */
    public function handle($request, Closure $next)
    {
        $cssFile = base_path('/public/css/theme-color.css');

        if (!file_exists($cssFile)) {

            $properties = getDefaultThemeProperties();


            generateCssFile($properties);


        }

        return $next($request);
    }

}