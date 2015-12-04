<?php namespace App\Http\Controllers\Admin;

use App\Http\Services\Admin\ImageService;
use App\Http\Services\AuthService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class AuthController
 * @package App\Http\Controllers\Admin
 */
class AuthController extends BaseController
{
    /**
     * @var AuthService
     */
    protected $auth;

    /**
     * @param AuthService $auth
     */
    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Login page
     *
     * @param ImageService $image
     * @return \Illuminate\View\View
     */
    public function login(ImageService $image)
    {
        if ($this->auth->isLoggedIn()) {
            return redirect()->route('admin.dashboard');
        }

        $image = $image->getHomePageImageUrl();

        return view('page.login', compact('image'));
    }

    /**
     * Login process
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function loginPost(Request $request)
    {
        $username = $request->input('email');
        $password = $request->input('password');

        if ($this->auth->login($username, $password)) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('login')->withInput()->with('error', 'Invalid Username or password');
    }

    /**
     * Logout page
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout()
    {
        $this->auth->logout();

        return redirect()->route('login');
    }
}
