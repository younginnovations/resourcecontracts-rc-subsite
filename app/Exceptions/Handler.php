<?php namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Mail;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Debug\ExceptionHandler as SymfonyDisplayer;

/**
 * Class Handler
 * @package App\Exceptions
 */
class Handler extends ExceptionHandler
{

    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        'Symfony\Component\HttpKernel\Exception\NotFoundHttpException',
        HttpException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception $e
     *
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
     *
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {

        if ($e instanceof HttpException) {
            return $this->renderHttpException($e);
        }

        if ($e instanceof Exception) {
            return view('errors.error');
        }

        if (env('APP_ENV') === 'production') {
            $this->sendMail($e, $request);
        }

        return parent::render($request, $e);
    }

    /**
     * Sends email
     *
     * @param \Exception                $exception
     * @param  \Illuminate\Http\Request $request
     */
    protected function sendMail($exception, $request)
    {
        $error       = $exception->getMessage();
        $current_url = $request->fullUrl();
        $message     = sprintf("Url: %s \n\rError: %s \n\rLog: %s", $current_url, $error, (string) $exception);
        Mail::raw(
            $message,
            function ($msg) use ($current_url) {
                $site       = env('CATEGORY');
                $recipients = [env('ADMIN_EMAIL')];
                $msg->subject("{$site} subsite has error - ".$current_url);
                $msg->to($recipients);
                $msg->from(['nrgi@yipl.com.np']);
            }
        );
    }

    /**
     * Render exception according to exception code
     *
     * @param HttpException $e
     *
     * @return mixed
     */
    private function renderHttpException(HttpException $e)
    {
        $status = $e->getStatusCode();

        if (view()->exists('errors.'.$status)) {
            return response(view('errors.'.$status), $status);
        } else {
            return (new SymfonyDisplayer(config('app.debug')))->createResponse($e);
        }
    }
}
