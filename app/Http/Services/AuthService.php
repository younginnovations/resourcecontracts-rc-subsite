<?php namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;
use Illuminate\Support\Facades\Session;

/**
 * Class AuthService
 * @package App\Http\Services
 */
Class AuthService
{
    /**
     * @var Client
     */
    protected $client;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * Login a user
     *
     * @param $username
     * @param $password
     * @return bool
     */
    public function login($username, $password)
    {
        $loginUrl = sprintf('%s/site/login', trim(env('ADMIN_API_URL'), '/'));

        try {
            $request = new Request('GET', $loginUrl);
            $request->setQuery(
                [
                    'username' => $username,
                    'password' => $password
                ]
            );

            $data = file_get_contents($request->getUrl());

            $data = json_decode($data);

            if ($data->status == 'success') {
                $this->setAuth($data);

                return true;
            } else {
                return false;
            }

        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Logged out user
     */
    public function logout()
    {
        Session::forget('user_auth');
    }

    /**
     * Check if user logged in or not
     *
     * @return bool
     */
    public function isLoggedIn()
    {
        if (Session::has('user_auth')) {
            return true;
        }

        return false;
    }

    /**
     * Check for Guest User
     *
     * @return bool
     */
    public function guest()
    {
        return !$this->isLoggedIn();
    }

    /**
     * Set Auth
     *
     * @param $userData
     */
    protected function setAuth($userData)
    {
        session(['user_auth' => $userData->message]);
    }

    /**
     * Get User Data
     *
     * @return Session
     */
    public function user()
    {
        return session('user_auth');
    }

}
