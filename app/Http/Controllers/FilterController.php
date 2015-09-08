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
        $currentPage    = $request->get('page', 1);
        $filter         = $this->processQueries($request);
        $filter['from'] = $currentPage;
        $contracts      = $this->api->filterSearch($filter);
        $filter         = $this->updateFilterData($filter, $contracts, $request);
        $show_advance   = true;
        return view('site.filter', compact('contracts', 'filter', 'show_advance', 'total_contract', 'currentPage'));
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
        $type = $type == '' ? 'metadata,text,annotations' : $type;

        return [
            'q'               => $request->get('q', ''),
            'country'         => is_array($request->get('country')) ? join(',', $request->get('country')) : $request->get('country'),
            'year'            => is_array($request->get('year')) ? join(',', $request->get('year')) : $request->get('year'),
            'from'            => is_array($request->get('from')) ? join(',', $request->get('from')) : $request->get('from'),
            'per_page'        => is_array($request->get('per_page')) ? join(',', $request->get('per_page')) : $request->get('per_page'),
            'resource'        => is_array($request->get('resource')) ? join(',', $request->get('resource')) : $request->get('resource'),
            'corporate_group' => is_array($request->get('corporate_group')) ? join(',', $request->get('corporate_group')) : $request->get('corporate_group'),
            'company_name'    => is_array($request->get('company_name')) ? join(',', $request->get('company_name')) : $request->get('company_name'),
            'contract_type'   => is_array($request->get('contract_type')) ? join(',', $request->get('contract_type')) : $request->get('contract_type'),
            'annotation_category'   => is_array($request->get('annotation_category')) ? join(',', $request->get('annotation_category')) : $request->get('annotation_category'),
            'sortby'          => $request->get('sortby'),
            'order'           => $request->get('order'),
            'group'           => $type
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
           // $filter['country'] = isset($contract->country) ? (array) $contract->country : [];
        }

        $filter['year'] = is_array($request->get('year')) ? $request->get('year') : [$request->get('year')];

        if (!$request->get('year')) {
           // $filter['year'] = isset($contract->year) ? (array) $contract->year : [];
        }
        $filter['corporate_group'] = is_array($request->get('corporate_group')) ? $request->get('corporate_group') : [$request->get('corporate_group')];

        if (!$request->get('corporate_group')) {
            //$filter['corporate_group'] = isset($contract->corporate_group) ? (array) $contract->corporate_group : [];
        }
        $filter['company_name'] = is_array($request->get('company_name')) ? $request->get('company_name') : [$request->get('company_name')];

        if (!$request->get('company_name')) {
            //$filter['company_name'] = isset($contract->company_name) ? (array) $contract->company_name : [];
        }

        $filter['contract_type'] = is_array($request->get('contract_type')) ? $request->get('contract_type') : [$request->get('contract_type')];

        if (!$request->get('contract_type')) {
           // $filter['contract_type'] = isset($contract->contract_type) ? (array) $contract->contract_type : [];
        }

        $filter['resource'] = is_array($request->get('resource')) ? $request->get('resource') : [$request->get('resource')];

        if (!$request->get('resource')) {
            //$filter['resource'] = isset($contract->resource) ? (array) $contract->resource : [];
        }
        $filter['annotation_category'] = is_array($request->get('annotation_category')) ? $request->get('annotation_category') : [$request->get('annotations_category')];

        $filter['type'] = is_array($request->get('type')) ? $request->get('type') : [$request->get('type')];

        if (!$request->get('type')) {
            $filter['type'] = isset($contract->type) ? $contract->type : ['metadata', 'text', 'annotations'];
        }



        return $filter;
    }
}
