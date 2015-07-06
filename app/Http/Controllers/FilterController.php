<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use Illuminate\Http\Request;

/**
 * Class FilterController
 * @package App\Http\Controllers
 */
class FilterController
{
    /**
     * @var APIService
     */
    protected $api;

    /**
     * @param APIService $api
     */
    public function __construct(APIService $api)
    {
        $this->api = $api;
    }

    /**
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function filter(Request $request)
    {
        $filter = [
            'q'       => $request->get('q'),
            'country' => is_array($request->get('country')) ? join(',', $request->get('country')) : $request->get(
                'country'
            ),
            'year'    => is_array($request->get('year')) ? join(',', $request->get('year')) : $request->get('year'),
            'sortby'  => $request->get('sortby'),
            'order'   => $request->get('order'),
        ];

        $contract = $this->api->filterSearch($filter);

        $filter['country'] = is_array($request->get('country')) ? $request->get('country') : [$request->get('country')];

        if (!$request->get('country')) {
            $filter['country'] = isset($contract->country) ? $contract->country : [];
        }

        $filter['year'] = is_array($request->get('year')) ? $request->get('year') : [$request->get('year')];

        if (!$request->get('year')) {
            $filter['year'] = isset($contract->year) ? $contract->year : [];
        }

        $show_advance = (isset($contract->total) && $contract->total > 0) ? true : false;

        return view('site.filter', compact('contract', 'filter', 'show_advance'));
    }
}
