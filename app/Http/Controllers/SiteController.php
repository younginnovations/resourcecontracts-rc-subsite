<?php namespace App\Http\Controllers;

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
     * @return \Illuminate\View\View
     */
    public function home()
    {
        $summary   = $this->api->summary();
        $countries = count($summary->country_summary);
        $resources = count($summary->resource_summary);
        $contracts = $summary->contract_count;

        return view('site.home', compact('countries', 'resources', 'contracts'));
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
