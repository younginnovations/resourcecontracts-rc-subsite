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
        $summary   = $this->api->summary();
        $resources = $summary->resource_summary;

        return view('resource.index', compact('resources'));
    }

    /**
     * Page for specific resource
     *
     * @param $resource
     * @return \Illuminate\View\View
     */
    public function detail($resource)
    {
        $filter = ['resource' => $resource];
        $contracts = $this->api->allContracts($filter);

        if(!$contracts)
        {
          return abort(404);
        }

        return view('resource.detail', compact('contracts', 'resource'));
    }

}
