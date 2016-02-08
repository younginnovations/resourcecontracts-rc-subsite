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

        $meta = [
            'title' => 'About'
        ];

        return view('page.master', compact('page', 'page_name', 'meta'));
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

        $meta = [
            'title'       => 'Contact',
            'description' => 'Please send your questions, comments, and feedback by email at ' . env('CONTACT_MAIL')
        ];

        return view('page.master', compact('page', 'page_name', 'meta'));
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

        $meta = [
            'title'       => 'Resources',
            'description' => 'See different guides and documents to learn more about the contracts.'
        ];

        return view('page.master', compact('page', 'page_name', 'meta'));
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

        $meta = [
            'title'       => 'FAQS',
            'description' => 'Frequently Asked Questions about' . getCategoryTitle()
        ];

        return view('page.master', compact('page', 'page_name', 'meta'));
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

        $meta = [
            'title'       => 'Glossary',
            'description' => 'A number of key terms are critical for conducting contract analysis.' . getCategoryTitle(
                ) . 'provides a growing glossary that can help you navigate the language of the contracts.'
        ];

        return view('page.master', compact('page', 'page_name', 'meta'));

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

        $meta = [
            'title'       => 'Publish Contracts',
            'description' => 'Learn more about how the' . getCategoryTitle() . 'team can support host governments, investors, and other relevant stakeholders in their efforts to disclose contracts.'
        ];

        return view('page.master', compact('page', 'page_name', 'meta'));

    }

}
