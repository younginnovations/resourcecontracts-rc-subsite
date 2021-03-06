<?php namespace App\Http\Controllers;

use App\Http\Services\Admin\OptionService;
use App\Http\Services\Admin\PartnerService;
use App\Http\Services\APIService;
use App\Http\Services\ContractService;
use App\Http\Services\XmlService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class Controller
 * @package App\Http\Controllers
 */
class SiteController extends BaseController
{
    /**
     * @var APIService
     */
    protected $api;
    /**
     * @var Request
     */
    protected $request;
    /**
     * @var ContractService
     */
    protected $contract;

    /**
     * @param APIService      $api
     * @param Request         $request
     * @param ContractService $contract
     */
    public function __construct(APIService $api, Request $request, ContractService $contract)
    {
        $this->api      = $api;
        $this->request  = $request;
        $this->contract = $contract;
    }

    /**
     * Home Page
     *
     * @param OptionService  $option
     * @param PartnerService $partner
     *
     * @return \Illuminate\View\View
     */
    public function home(OptionService $option, PartnerService $partner)
    {
        $summary          = $this->api->summary();
        $countries        = count($summary->country_summary);
        $resources        = count($summary->resource_summary);
        $contracts        = $summary->contract_count;
        $recent_contracts = $summary->recent_contract_count;
        $countryList      = $this->contract->getListOfCountry($summary);
        $links            = $option->getLinks();
        $countryPartners  = $partner->all();
        $homePage         = true;

        if (site()->isCountrySite()) {
            $view = 'site.new-home-country';
            $text = $option->getByCountryGroup('text', strtolower(site()->getCountryCode()));
        } else {
            $view = ($this->request->url() == url()) ? 'site.new-home' : 'site.home';
            $text = $option->getByGroup('text');
        }

        return view(
            $view,
            compact(
                'countries',
                'resources',
                'contracts',
                'recent_contracts',
                'countryList',
                'links',
                'text',
                'countryPartners',
                'homePage'
            )
        );
    }

    /**
     * Dynamically generates the robots.txt file.
     */
    public function robots()
    {
        if (env('APP_ENV') === 'production')
        {
            return response(view('site.prod-robots-txt'))
                ->header('Content-Type', 'text/plain');
        } else {
            return response(view('site.staging-robots-txt'))
                ->header('Content-Type', 'text/plain');
        }
    }

    /**
     * Generates sitemap.xml file
     *
     * @param XmlService $xml
     *
     * @return \Illuminate\Http\RedirectResponse|\Laravel\Lumen\Http\Redirector
     */
    public function sitemap(XmlService $xml)
    {
        $filter = [
            'from'     => 1,
            'per_page' => 10000,
            'group'     =>'metadata|text|annotations',
           ];

        $file = base_path('public/sitemap.xml');

        if (file_exists($file)) {
            $lastModifiedDate = date("Y-m-d", stat($file)['ctime']);
            $currentDate      = date("Y-m-d");

            if ($lastModifiedDate == $currentDate) {
                return redirect('sitemap.xml');
            }
        }

        $countriesSummary = $this->api->summary()->country_summary;
        $resourcesSummary = $this->api->summary()->resource_summary;
        $yearSummary      = $this->api->summary()->year_summary;
        $contracts        = $this->api->allContracts($filter)->results;

        $xml->getMainPages();
        $xml->getStaticPages();
        $xml->getAllResources($resourcesSummary);
        $xml->getAllCountries($countriesSummary);
        $xml->getAllContracts($contracts);
        $xml->getYear($yearSummary);
        $xml->generateXML();
    }
}
