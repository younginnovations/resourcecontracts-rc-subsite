<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use App\Http\Services\ContractService;
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

}
