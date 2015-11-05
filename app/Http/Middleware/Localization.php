<?php namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;

/**
 * Class Localization
 * @package App\Http\Middleware
 */
class Localization
{
    /**
     * @var string
     */
    protected $key = 'lang';

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure                 $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $lang = $this->getLanguage($request->input('lang'));
        $this->setLanguage($lang);

        return $next($request);
    }

    /**
     * Get Language code
     *
     * @param null $lang
     * @return string
     */
    public function getLanguage($lang = null)
    {
        if (is_null($lang)) {
            $lang = isset($_COOKIE[$this->key]) ? $_COOKIE[$this->key] : 'en';
        }

        return $lang;
    }

    /**
     * Set Language code
     *
     * @param $lang
     * @return Void
     */
    public function setLanguage($lang)
    {
        $lang = trim(strtolower($lang));

        app('translator')->setLocale($lang);

        setcookie($this->key, $lang, Carbon::now()->addYear(1)->timestamp, '/');
    }
}
