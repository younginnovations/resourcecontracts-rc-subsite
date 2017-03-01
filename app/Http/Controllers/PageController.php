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

        $meta = [
            'title' => $page->title()
        ];

        return view('page.master', compact('page',  'meta'));
    }

    /**
     * Contact us Page
     *
     * @return \Illuminate\View\View
     */
    public function contact()
    {
        $page      = $this->page->get('contact');

        $meta = [
            'title'       => $page->title(),
            'description' => 'Please send your questions, comments, and feedback by email at ' . site()->contactEmail()
        ];

        return view('page.master', compact('page',  'meta'));
    }

    /**
     * Resources Page
     *
     * @return \Illuminate\View\View
     */
    public function resources()
    {
        $page      = $this->page->get('guides');

        $meta = [
            'title'       => $page->title(),
            'description' => 'Guides and documents providing further information on reading, understanding, and assessing land contracts.'
        ];

        return view('page.master', compact('page',  'meta'));
    }

    /**
     * FAQs Page
     *
     * @return \Illuminate\View\View
     */
    public function faqs()
    {
        $page      = $this->page->get('faqs');

        $meta = [
            'title'       => $page->title(),
            'description' => 'Frequently Asked Questions about' . site()->meta('name') .', an online repository of publicly available
            contracts for large-scale land, agriculture, and forestry projects.'
        ];

        return view('page.faq', compact('page',  'meta'));
    }

    /**
     * Guides Page
     *
     * @return \Illuminate\View\View
     */
    public function glossary()
    {
        $page      = $this->page->get('glossary');

        $meta = [
            'title'       => $page->title(),
            'description' => 'A glossary of key terms to help navigate contracts and conduct analysis.'
        ];

        return view('page.master', compact('page',  'meta'));

    }

    /**
     * Country Sites
     *
     * @return \Illuminate\View\View
     */
    public function countrySites()
    {
        $page      = $this->page->get('country-sites');
        $meta = [
            'title'       => $page->title(),
            'description' => 'Learn more about disclosing contracts on' . site()->meta('name') .', and how we can support host governments, investors, and other relevant stakeholders in their efforts to disclose contracts.'
        ];

        return view('page.master', compact('page',  'meta'));
    }

}
