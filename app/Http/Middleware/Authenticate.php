<?php namespace App\Http\Middleware;

use App\Http\Services\AuthService;
use Closure;

class Authenticate {
    /**
     * @var AuthService
     */
    protected $auth;


    /**
     * Create a new filter instance.
     *
     * @param AuthService $auth
     */
    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }


    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($this->auth->guest()) {
            return redirect()->route('login');
        }

        return $next($request);
    }

}
