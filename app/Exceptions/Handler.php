<?php namespace App\Exceptions;

use Exception;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\HttpCache\HttpCache;
use ErrorException;
use Symfony\Component\Debug\ExceptionHandler as SymfonyDisplayer;

class Handler extends ExceptionHandler
{

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception $e
     * @return void
     */
    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception               $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($e instanceof HttpException) {
            return $this->renderHttpException($e);
        }
        if (env('APP_ENV') === 'production') {
            if (env('ADMIN_EMAIL')) {
                $this->sendMail($e, $request);
            }

            return view('errors.error');
        }

        return parent::render($request, $e);
    }

    /**
     * Render exception according to exception code
     * @param HttpException $e
     * @return mixed
     */
    private function renderHttpException(HttpException $e)
    {
        if (view()->exists('errors.' . $e->getStatusCode())) {
            return view('errors.' . $e->getStatusCode());
        } else {
            return (new SymfonyDisplayer(config('app.debug')))->createResponse($e);
        }
    }

    /**
     * Sends email
     * @param \Exception   $exception
     * @param  \Illuminate\Http\Request $request
     */
    protected function sendMail($exception, $request)
    {
        $error = $request->fullUrl();
        \Mail::raw(
            (string) $exception,
            function ($msg) use ($error) {
                $site       = env('CATEGORY');
                $recipients = [env('ADMIN_EMAIL')];
                $msg->subject("{$site} Subsite has error.Please check and resolve." . $error);
                $msg->to($recipients);
                $msg->from(['nrgi@yipl.com.np']);
            }
        );
    }

}
