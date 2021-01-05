<?php namespace App\Http\Controllers;

use App\Http\Services\Admin\OptionService;
use App\Http\Services\Admin\ResearchAndAnalysisService;
use App\Http\Services\LocalizationService;
use App\Http\Services\Page\PageService;
use Laravel\Lumen\Routing\Controller as BaseController;
use Spipu\Html2Pdf\Html2Pdf;

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
     * @var ResearchAndAnalysisService
     */
    private $researchAndAnalysisService;
    private $pageToPDF;
    /**
     * @param PageService $page
     * @param LocalizationService $lang
     * @param ResearchAndAnalysisService $researchAndAnalysisService
     */
    public function __construct(PageService $page, LocalizationService $lang, ResearchAndAnalysisService $researchAndAnalysisService,Html2Pdf $pageToPDF)
    {
        $this->page = $page;
        $this->lang = $lang;
        $this->researchAndAnalysisService = $researchAndAnalysisService;
        $this->pageToPDF=$pageToPDF;
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

        if (site()->isRC()) {
            return view('page.master', compact('page', 'hideSearchBar'));
        }
        return view('page.guides', compact('page', 'hideSearchBar'));
    }
    
    public function guidesDownload()
    {
        $guidePage= view('page.guide-download')->render(); 
        $this->pageToPDF->setTestIsImage(false);
        $this->pageToPDF->writeHTML($guidePage);
        
        //D is for download 
        $this->pageToPDF->output('guide-page.pdf', 'D');

    }

    
    /**
     * Research and analysis page
     *
     * @return \Illuminate\View\View
     */
    public function researchAndAnalysis()
    {
        $optionService = app(OptionService::class);
        $page = $optionService->get('research_and_analysis_page_text', true);
        $background = $optionService->get('research_and_analysis_bg_image', true);
        $meta = [
            'title'       => 'Research and analysis',
            'description' => 'Research and analysis',
        ];
        $hideSearchBar = true;
        $researches = $this->researchAndAnalysisService->getLinks();
        $featured = $this->researchAndAnalysisService->getFeaturedLinks();

        return view('page.research-and-analysis', compact('page', 'meta' , 'hideSearchBar', 'researches', 'featured', 'background'));
    }
}
