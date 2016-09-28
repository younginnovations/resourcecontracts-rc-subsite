<?php namespace App\Http\Middleware;

use App\Http\Services\LocalizationService;
use Closure;

/**
 * Class Localization
 * @package App\Http\Middleware
 */
class Localization
{
    /**
     * @var LocalizationService
     */
    protected $localization;

    /**
     * @param LocalizationService $localization
     */
    public function __construct(LocalizationService $localization)
    {
        $this->localization = $localization;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $this->localization->setup();


        return $next($request);
    }

}
