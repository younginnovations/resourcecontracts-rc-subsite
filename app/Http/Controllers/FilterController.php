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
        $currentPage           = $request->get('page', 1);
        $filter                = $this->api->buildSearchQueries($request);
        $filter['from']        = $currentPage;
        $contracts             = $this->api->filterSearch($filter);
        $filter                = $this->updateFilterData($filter, $contracts, $request);
        $show_advance          = true;

        return view('site.filter', compact('contracts', 'filter', 'show_advance', 'total_contract', 'currentPage'));
    }

    /**
     * Update filter data
     *
     * @param array   $filter
     * @param         $contract
     * @param Request $request
     * @return array
     */
    protected function updateFilterData(array $filter, $contract, Request $request)
    {
        $filter['country'] = is_array($request->get('country')) ? $request->get('country') : [$request->get('country')];
        $filter['year'] = is_array($request->get('year')) ? $request->get('year') : [$request->get('year')];
        $filter['corporate_group'] = is_array($request->get('corporate_group')) ? $request->get('corporate_group') : [$request->get('corporate_group')];
        $filter['company_name'] = is_array($request->get('company_name')) ? $request->get('company_name') : [$request->get('company_name')];
        $filter['contract_type'] = is_array($request->get('contract_type')) ? $request->get('contract_type') : [$request->get('contract_type')];
        $filter['resource'] = is_array($request->get('resource')) ? $request->get('resource') : [$request->get('resource')];
        $filter['annotation_category'] = is_array($request->get('annotation_category')) ? $request->get('annotation_category') : [$request->get('annotations_category')];
        $filter['type'] = is_array($request->get('type')) ? $request->get('type') : [$request->get('type')];
        if (!$request->get('type')) {
            $filter['type'] = isset($contract->type) ? $contract->type : ['metadata', 'text', 'annotations'];
        }

        return $filter;
    }
}
