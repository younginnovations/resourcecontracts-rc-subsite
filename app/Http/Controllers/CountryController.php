<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class CountryController
 * @package App\Http\Controllers
 */
class CountryController extends BaseController
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
     * All Countries
     * @return \Illuminate\View\View
     * @internal param Request $request
     */
    public function index()
    {
        $countries   = $this->api->summary()->country_summary;
        $countryName = [];
        foreach ($countries as $country) {
            $countryCode = trans('country.'.strtoupper($country->key));
            array_push($countryName, $countryCode);
        }
        $countryName = implode(',', $countryName);

        $meta = [
            'title'       => 'Countries',
            'description' => site()->meta('country_descriptions').$countryName,
        ];

        return view('country.index', compact('meta'));
    }

    /**
     * Page for a specific country
     *
     * @param         $country
     * @param Request $request
     *
     * @return \Illuminate\View\View
     */
    public function detail(Request $request, $country)
    {
        $currentPage     = $request->get('page', 1);
        $filter          = [
            'country' => urldecode($country),
            'from'    => $currentPage,
            'sort_by' => empty($request->get('sortby')) ? 'year' : $request->get('sortby'),
            'order'   => $request->get('order'),
            'all'     => $request->get('all', '0'),
            'group'    =>'metadata|text|annotations',
            'from'      =>$currentPage,
        ];
        $filter['order'] = ($filter['sort_by'] == 'year' && empty($filter['order'])) ? 'desc' : $filter['order'];

        $contracts = $this->api->allContracts($filter);
        $resources = $this->api->getResourceByCountry($filter);
        if (!$contracts) {
            return abort(404);
        }
        $countryName = trans('country.'.strtoupper($country));
        $meta        = [
            'title'       => $countryName,
            'description' => site()->meta('country_description').$countryName,
        ];
        $route                   = $request->path();
        $showYear                = ($route == "contracts" && isset($params['year'])) ? false : true;
        $showCountry=false;
        return view('country.detail', compact('contracts', 'country', 'resources', 'currentPage', 'meta','showYear','showCountry'
    ));
    }

}
