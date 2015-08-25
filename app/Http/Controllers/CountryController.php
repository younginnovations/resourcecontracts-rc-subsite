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
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('country.index');
    }

    /**
     * Page for a specific country
     *
     * @param $country
     * @return \Illuminate\View\View
     */
    public function detail($country)
    {
        $filter['country'] = $country;
        $contracts         = $this->api->allContracts($filter);
        $resources         = $this->api->getResourceByCountry($filter);
        if (!$contracts) {
            return abort(404);
        }

        return view('country.detail', compact('contracts', 'country', 'resources'));
    }

}
