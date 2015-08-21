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
     * Show search result
     *
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $filter = $this->processQueries($request);

        $contracts = $this->api->filterSearch($filter);
        $contracts = $contracts->result;

        $filter = $this->updateFilterData($filter, $contracts, $request);

        $show_advance = true;

        return view('site.filter', compact('contracts', 'filter', 'show_advance'));
    }

    /**
     * Process user search queries
     *
     * @param Request $request
     * @return array
     */
    protected function processQueries(Request $request)
    {
        $type = is_array($request->get('type')) ? join(',', $request->get('type')) : $request->get('type');
        $type = $type == '' ? 'metadata,text,annotation' : $type;

        return [
            'q'       => $request->get('q'),
            'country' => is_array($request->get('country')) ? join(',', $request->get('country')) : $request->get(
                'country'
            ),
            'year'    => is_array($request->get('year')) ? join(',', $request->get('year')) : $request->get('year'),
            'from'    => is_array($request->get('from')) ? join(',', $request->get('from')) : $request->get('from'),
            'per_page'    => is_array($request->get('per_page')) ? join(',', $request->get('per_page')) : $request->get('per_page'),
            'resource'    => is_array($request->get('resource')) ? join(',', $request->get('resource')) : $request->get('resource'),
            'sortby'  => $request->get('sortby'),
            'order'   => $request->get('order'),
            'group'    => $type
        ];
    }


    /**
     * Update filter data
     *
     * @param array   $filter
     * @param         $contract
     * @param Request $request
     * @return mixed
     */
    protected function updateFilterData(array $filter, $contract, Request $request)
    {
        $filter['country'] = is_array($request->get('country')) ? $request->get('country') : [$request->get('country')];

        if (!$request->get('country')) {
            $filter['country'] = isset($contract->country) ? $contract->country : [];
        }

        $filter['year'] = is_array($request->get('year')) ? $request->get('year') : [$request->get('year')];

        if (!$request->get('year')) {
            $filter['year'] = isset($contract->year) ? $contract->year : [];
        }

        $filter['type'] = is_array($request->get('type')) ? $request->get('type') : [$request->get('type')];

        if (!$request->get('type')) {
            $filter['type'] = isset($contract->type) ? $contract->type : ['metadata', 'text', 'annotations'];
        }

        return $filter;
    }
}
