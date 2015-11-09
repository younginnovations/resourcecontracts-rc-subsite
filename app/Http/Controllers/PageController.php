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
    }

    /**
     * About us page
     *
     * @return \Illuminate\View\View
     */
    public function about()
    {
        $page      = $this->page->get('about');
        $page_name = 'about';

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
     * Publish contracts
     *
     * @return \Illuminate\View\View
     */
    public function publishContracts()
    {
        $page      = $this->page->get('publish-contracts');
        $page_name = 'publish-contracts';

        return view('page.master', compact('page', 'page_name'));

    }

}
