<?php namespace App\Http\Controllers;

use App\Http\Services\LocalizationService;
use App\Http\Services\Page\PageService;
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
     * @var LocalizationService
     */
    protected $lang;

    /**
     * @param PageService         $page
     * @param LocalizationService $lang
     */
    public function __construct(PageService $page, LocalizationService $lang)
    {
        $this->page = $page;
        $this->lang = $lang;
        view()->share('currentLang', $lang->getCurrentLang());
    }

    /**
     * About us page
     *
     * @return \Illuminate\View\View
     */
    public function about()
    {
        $page = $this->page->get('about');

        if (is_null($page)) {
            abort(404);
        }

        $meta = [
            'title' => $page->title(),
        ];

        $hideSearchBar = true;

        return view('page.master', compact('page', 'meta', 'hideSearchBar'));
    }

    /**
     * Contact us Page
     *
     * @return \Illuminate\View\View
     */
    public function contact()
    {
        $page = $this->page->get('contact');

        if (is_null($page)) {
            abort(404);
        }

        $meta = [
            'title'       => $page->title(),
            'description' => 'Please send your questions, comments, and feedback by email at '.site()->contactEmail(),
        ];

        $hideSearchBar = true;

        return view('page.master', compact('page', 'meta', 'hideSearchBar'));
    }

    /**
     * Resources Page
     *
     * @return \Illuminate\View\View
     */
    public function resources()
    {
        $page = $this->page->get('guides');

        if (is_null($page)) {
            abort(404);
        }

        $meta = [
            'title'       => $page->title(),
            'description' => 'Guides and documents providing further information on reading, understanding, and assessing land contracts.',
        ];

        $hideSearchBar = true;

        return view('page.master', compact('page', 'meta', 'hideSearchBar'));
    }

    /**
     * FAQs Page
     *
     * @return \Illuminate\View\View
     */
    public function faqs()
    {
        $page = $this->page->get('faqs');

        if (is_null($page)) {
            abort(404);
        }

        $meta = [
            'title'       => $page->title(),
            'description' => 'Frequently Asked Questions about'.site()->meta('name').', an online repository of publicly available
            contracts for large-scale land, agriculture, and forestry projects.',
        ];

        $hideSearchBar = true;

        return view('page.faq', compact('page', 'meta', 'hideSearchBar'));
    }

    /**
     * Guides Page
     *
     * @return \Illuminate\View\View
     */
    public function glossary()
    {
        $page = $this->page->get('glossary');

        if (is_null($page)) {
            abort(404);
        }

        $meta = [
            'title'       => $page->title(),
            'description' => 'A glossary of key terms to help navigate contracts and conduct analysis.',
        ];

        $hideSearchBar = true;

        return view('page.master', compact('page', 'meta', 'hideSearchBar'));
    }

    /**
     * Country Sites
     *
     * @return \Illuminate\View\View
     */
    public function countrySites()
    {
        $page = $this->page->get('country-sites');

        if (is_null($page)) {
            abort(404);
        }

        $meta = [
            'title'       => $page->title(),
            'description' => 'Learn more about disclosing contracts on'.site()->meta('name').', and how we can support host governments, investors, and other relevant stakeholders in their efforts to disclose contracts.',
        ];

        $hideSearchBar = true;

        return view('page.master', compact('page', 'meta', 'hideSearchBar'));
    }

     /**
     * Guides Page
     *
     * @return \Illuminate\View\View
     */
    public function guides()
    {
        $page = $this->page->get('guides');

        if (is_null($page)) {
            abort(404);
        }
        $hideSearchBar = true;

        return view('page.guides', compact('page', 'hideSearchBar'));
    }
}
