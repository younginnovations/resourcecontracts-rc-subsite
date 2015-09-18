<?php namespace App\Http\Controllers;

use App\Http\Services\AuthService;
use App\Http\Services\Page\PageService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class PageController
 * @package App\Http\Controllers
 */
class PageController extends BaseController
{
    /**
     * @var PageService
     */
    protected $page;
    /**
     * @var AuthService
     */
    protected $auth;

    /**
     * @param PageService $page
     * @param AuthService $auth
     */
    public function __construct(PageService $page, AuthService $auth)
    {
        $this->page = $page;
        $this->auth = $auth;
    }

    /**
     * About us page
     *
     * @return \Illuminate\View\View
     */
    public function about()
    {
        $page      = $this->page->get('about');
        $page_name = 'contact';

        return view('page.master', compact('page', 'page_name'));
    }

    /**
     * Contact us Page
     *
     * @return \Illuminate\View\View
     */
    public function contact()
    {
        $page      = $this->page->get('contact');
        $page_name = 'contact';

        return view('page.master', compact('page', 'page_name'));
    }

    /**
     * Resources Page
     *
     * @return \Illuminate\View\View
     */
    public function resources()
    {
        $page      = $this->page->get('resources');
        $page_name = 'resources';

        return view('page.master', compact('page', 'page_name'));
    }

    /**
     * FAQs Page
     *
     * @return \Illuminate\View\View
     */
    public function faqs()
    {
        $page      = $this->page->get('faqs');
        $page_name = 'faqs';

        return view('page.master', compact('page', 'page_name'));
    }

    /**
     * Guides Page
     *
     * @return \Illuminate\View\View
     */
    public function glossary()
    {
        $page      = $this->page->get('glossary');
        $page_name = 'glossary';

        return view('page.master', compact('page', 'page_name'));

    }

    /**
     * Save Page
     *
     * @param Request $request
     * @return bool
     * @internal param $page
     */
    public function savePage(Request $request)
    {
        $page               = $request->input('pk');
        $key                = $request->input('name');
        $content            = $request->input('value');
        $contentArray       = $this->page->get($page, true);
        $contentArray[$key] = $content;

        $this->page->save($page, $contentArray);

        return response()->json($contentArray);
    }

    /**
     * Login page
     *
     * @return \Illuminate\View\View
     */
    public function login()
    {
        if ($this->auth->isLoggedIn()) {
            return redirect()->route('home');
        }

        return view('page.login');
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
            return redirect()->route('home');
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

        return redirect()->route('home');
    }
}
