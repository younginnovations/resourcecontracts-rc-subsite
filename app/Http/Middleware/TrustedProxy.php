<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Log;


class TrustedProxy
{
    /**
     * Filter the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        Request::setTrustedProxies(array($request->server->get('REMOTE_ADDR')));
        Request::setTrustedHeaderName(Request::HEADER_CLIENT_IP, 'X_FORWARDED_FOR');
        Request::setTrustedHeaderName(Request::HEADER_CLIENT_HOST, null);
        Request::setTrustedHeaderName(Request::HEADER_CLIENT_PORT, 'X_FORWARDED_PORT');
        Request::setTrustedHeaderName(Request::HEADER_CLIENT_PROTO, 'X_FORWARDED_PROTO');
        return $next($request);
    }
}
