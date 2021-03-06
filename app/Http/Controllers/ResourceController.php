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
        $resources    = $this->api->allCountries();
        $resources    = $resources->results;
        $resourceList = $this->api->summary()->resource_summary;
        $resourceName = [];
        foreach ($resourceList as $resource) {
            $resourceCode = $resource->key;
            array_push($resourceName, $resourceCode);
        }
        $resourceName = implode(',', $resourceName);
        $meta         = [
            'title'       => 'Resources',
            'description' => site()->meta('resource_descriptions').$resourceName,
        ];

        foreach ($resources as &$country) {
            $country->name = trans('country')[strtoupper($country->code)];
        }

        return view('resource.index', compact('resources', 'meta'));
    }

    /**
     * Page for specific resource
     *
     * @param Request $request
     * @param         $resource
     *
     * @return \Illuminate\View\View
     */
    public function detail(Request $request, $resource)
    {
        $resource        = urldecode($resource);
        $currentPage     = $request->get('page', 1);
        $filter          = [
            'resource' => $resource,
            'from'     => $currentPage,
            'sort_by'  => empty($request->get('sortby')) ? 'year' : $request->get('sortby'),
            'order'    => $request->get('order'),
            'all'      => $request->get('all', '0'),
            'group'    =>'metadata|text|annotations',
            'from'      =>$currentPage,
        ];
        $filter['order'] = ($filter['sort_by'] == 'year' && empty($filter['order'])) ? 'desc' : $filter['order'];

        $contracts = $this->api->allContracts($filter);
        $countries = $this->api->getCountryByResource($filter);
        if (!$contracts) {
            return abort(404);
        }

        $meta = [
            'title'       => trans('resources.'.$resource),
            'description' => site()->meta('resource_description').$resource,

        ];
        $route                   = $request->path();
        $showYear                = ($route == "contracts" && isset($params['year'])) ? false : true;
        $showCountry=true;
        return view('resource.detail', compact('contracts', 'resource', 'countries', 'currentPage', 'meta','showYear','showCountry'));
    }

}
