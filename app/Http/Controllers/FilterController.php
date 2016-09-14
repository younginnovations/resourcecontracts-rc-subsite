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

        $category = env('CATEGORY');
        $data     = trans("meta/$category");
        $meta     = [
            'title'       => 'Search Contracts',
            'description' => 'Search' . getInformation('categoryTitle') . 'using different criteria - year signed, company name, contract type, annotation category.'
        ];

        return view('site.filter', compact('contracts', 'filter', 'show_advance', 'total_contract', 'currentPage', 'meta'));
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
        $type = $type == '' ? 'metadata|text|annotations' : $type;

        return [
            'q'                   => $request->get('q', ''),
            'annotated'           => $request->get('annotated', ''),
            'country_code'        => is_array($request->get('country')) ? join('|', $request->get('country')) : $request->get('country'),
            'year'                => is_array($request->get('year')) ? join('|', $request->get('year')) : $request->get('year'),
            'from'                => is_array($request->get('from')) ? join('|', $request->get('from')) : $request->get('from'),
            'per_page'            => is_array($request->get('per_page')) ? join('|', $request->get('per_page')) : $request->get('per_page'),
            'resource'            => is_array($request->get('resource')) ? join('|', $request->get('resource')) : $request->get('resource'),
            'corporate_group'     => is_array($request->get('corporate_group')) ? join('|', $request->get('corporate_group')) : $request->get('corporate_group'),
            'company_name'        => is_array($request->get('company_name')) ? join('|', $request->get('company_name')) : $request->get('company_name'),
            'contract_type'       => is_array($request->get('contract_type')) ? join('|', $request->get('contract_type')) : $request->get('contract_type'),
            'document_type'       => is_array($request->get('document_type')) ? join('|', $request->get('document_type')) : $request->get('document_type'),
            'language'            => is_array($request->get('language')) ? join('|', $request->get('language')) : $request->get('language'),
            'annotation_category' => is_array($request->get('annotation_category')) ? join('|', $request->get('annotation_category')) : $request->get('annotation_category'),
            'sortby'              => $request->get('sortby'),
            'order'               => $request->get('order'),
            'group'               => $type,
            'all'                 => $request->get('all', '0'),
            "fuzzy"               => 1,
            'download'            => $request->get('download', false)
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

        $filter['year'] = is_array($request->get('year')) ? $request->get('year') : [$request->get('year')];

        $filter['corporate_group'] = is_array($request->get('corporate_group')) ? $request->get('corporate_group') : [$request->get('corporate_group')];

        $filter['company_name'] = is_array($request->get('company_name')) ? $request->get('company_name') : [$request->get('company_name')];

        $filter['contract_type'] = is_array($request->get('contract_type')) ? $request->get('contract_type') : [$request->get('contract_type')];

        $filter['document_type'] = is_array($request->get('document_type')) ? $request->get('document_type') : [$request->get('document_type')];

        $filter['language'] = is_array($request->get('language')) ? $request->get('language') : [$request->get('language')];

        $filter['resource'] = is_array($request->get('resource')) ? $request->get('resource') : [$request->get('resource')];

        $filter['annotation_category'] = is_array($request->get('annotation_category')) ? $request->get('annotation_category') : [$request->get('annotations_category')];

        $filter['type'] = is_array($request->get('type')) ? $request->get('type') : [$request->get('type')];

        if (!$request->get('type')) {
            $filter['type'] = isset($contract->type) ? $contract->type : ['metadata', 'text', 'annotations'];
        }


        return $filter;
    }

    /**
     * Download Search Results in csv
     * @param Request $request
     */
    public function downloadSearchResultAsCSV(Request $request)
    {

        $currentPage    = $request->get('page', 1);
        $filter         = $this->processQueries($request);
        $filter['from'] = $currentPage;
        $contracts      = $this->api->filterSearch($filter);
        echo $contracts;
    }
}
