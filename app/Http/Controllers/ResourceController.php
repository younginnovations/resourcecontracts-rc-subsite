<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class ResourceController
 * @package App\Http\Controllers
 */
class ResourceController extends BaseController
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
     * @param APIService $api
     * @param Request    $request
     */
    public function __construct(APIService $api, Request $request)
    {
        $this->api     = $api;
        $this->request = $request;
    }

    /**
     * All Resources Page
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $resources = $this->api->allCountries();
        $resources = $resources->results;

        foreach ($resources as &$country) {
            $country->name = trans('country')[strtoupper($country->code)];
        }

        return view('resource.index', compact('resources'));
    }

    /**
     * Page for specific resource
     *
     * @param Request $request
     * @param         $resource
     * @return \Illuminate\View\View
     */
    public function detail(Request $request, $resource)
    {
        $resource    = urldecode($resource);
        $currentPage = $request->get('page', 1);
        $filter      = ['resource' => $resource, 'from' => $currentPage];
        $contracts   = $this->api->allContracts($filter);
        $countries   = $this->api->getCountryByResource($filter);
        $allFilter             = $filter;
        $allFilter['per_page'] = $contracts->total;
        $allContracts          = $this->api->allContracts($allFilter);
        $contract_id           = $this->api->getContractsId($allContracts);

        if (!$contracts) {
            return abort(404);
        }

        return view('resource.detail', compact('contracts', 'resource', 'countries', 'currentPage','contract_id'));
    }

}
