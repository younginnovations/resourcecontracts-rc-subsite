<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $currentPage    = $request->get('page', 1);
        $filter         = $this->processQueries($request);
        $filter['from'] = $currentPage;
        $contracts      = $this->api->filterSearch($filter);
        $filter         = $this->updateFilterData($filter, $contracts, $request);
        $title          = site()->meta('title');
        $descp          = 'Search %s using different criteria - year signed, company name, contract type, annotation category.';

        $meta = [
            'title'       => 'Search Contracts',
            'description' => sprintf($descp, $title),
        ];

        return view(
            'site.filter',
            compact('contracts', 'filter', 'total_contract', 'currentPage', 'meta')
        );
    }

    /**
     * Demo for grouping in search
     *
     * @param Request $request
     *
     * @return \Illuminate\View\View
     */
    public function gIndex(Request $request)
    {
        $filter_params           = $request->all();
        $currentPage             = $request->get('page', 1);
        $filter                  = $this->processQueries($request);
        $filter['from']          = $currentPage;
        $filter['per_page']      = 10;
        $contracts               = isset($filter_params['recent']) ?
            $this->api->filterRecentSearch($filter) :
            $this->api->filterGroupSearch($filter);

        $contracts->current_page = $currentPage;
        $filter                  = $this->updateFilterData($filter, $contracts, $request);
        $title                   = site()->meta('title');
        $descp                   = 'Search %s using different criteria - year signed, company name, contract type, annotation category.';
        $orderBy                = isset($filter_params['order']) ? $filter_params['order'] : '';
        $sortBy                  = isset($filter_params['sort']) ? $filter_params['sort'] : '';
        $query                  = isset($filter_params['q']) ? $filter_params['q'] : '';
        $route                   = $request->path();
        $showYear                = ($route == "contracts" && isset($params['year'])) ? false : true;
        $meta                    = [
            'title'       => 'Search Contracts',
            'description' => sprintf($descp, $title),
        ];

        return view(
            'site.groupDemo',
            compact(
                'contracts',
                'filter',
                'total_contract',
                'currentPage',
                'meta',
                'filter_params',
                'query',
                'orderBy',
                'sortBy',
                'route',
                'showYear'
            )
        );
    }

    /**
     * Show recent result list
     *
     * @param Request $request
     *
     * @return \Illuminate\View\View
     */
    public function recentIndex(Request $request)
    {
        $currentPage             = $request->get('page', 1);
        $filter                  = $this->processQueries($request);
        $filter['from']          = $currentPage;
        $filter['per_page']      = 10;
        $contracts               = $this->api->filterRecentSearch($filter);
        $contracts->current_page = $currentPage;
        $filter                  = $this->updateFilterData($filter, $contracts, $request);
        $title                   = site()->meta('title');
        $descp                   = 'Search %s using different criteria - year signed, company name, contract type, annotation category.';
        $filter_params           = $request->all();
        $orderBy                = isset($filter_params['order']) ? $filter_params['order'] : '';
        $sortBy                  = isset($filter_params['sort']) ? $filter_params['sort'] : '';
        $query                  = isset($filter_params['q']) ? $filter_params['q'] : '';
        $route                   = $request->path();
        $showYear                = ($route == "contracts" && isset($params['year'])) ? false : true;
        $meta                    = [
            'title'       => 'Search Contracts',
            'description' => sprintf($descp, $title),
        ];

        return view(
            'site.groupDemo',
            compact(
                'contracts',
                'filter',
                'total_contract',
                'currentPage',
                'meta',
                'filter_params',
                'query',
                'orderBy',
                'sortBy',
                'route',
                'showYear'
            )
        );
    }

    /**
     * Process user search queries
     *
     * @param Request $request
     *
     * @return array
     */
    protected function processQueries(Request $request)
    {
        $isRcCategorySite = site()->isRCCategorySite();
        $type = is_array($request->get('type')) ? join(',', $request->get('type')) : $request->get('type');
        $type = $type == '' ? 'metadata|text|annotations' : $type;

        $annotated = $isRcCategorySite ? $request->get('tagged') : $request->get('annotated', '');
        if ($isRcCategorySite) {
            $annotationCategoryInput = is_array($request->get('key_clause')) ? join(
                '|',
                $request->get(
                    'key_clause'
                )
            ) : $request->get('key_clause');
        }else{
            $annotationCategoryInput = is_array($request->get('annotation_category')) ? join(
                '|',
                $request->get(
                    'annotation_category'
                )
            ) : $request->get('annotation_category');
        }

        return [
            'q'                   => $request->get('q', ''),
            'annotated'           => $annotated,
            'recent'           => $request->get('recent', ''),
            'country_code'        => is_array($request->get('country')) ? join(
                '|',
                $request->get('country')
            ) : $request->get(
                'country'
            ),
            'year'                => is_array($request->get('year')) ? join('|', $request->get('year')) : $request->get(
                'year'
            ),
            'from'                => is_array($request->get('from')) ? join('|', $request->get('from')) : $request->get(
                'from'
            ),
            'per_page'            => is_array($request->get('per_page')) ? join(
                '|',
                $request->get('per_page')
            ) : $request->get('per_page'),
            'resource'            => is_array($request->get('resource')) ? join(
                '|',
                $request->get('resource')
            ) : $request->get('resource'),
            'corporate_group'     => is_array($request->get('corporate_group')) ? join(
                '|',
                $request->get('corporate_group')
            ) : $request->get('corporate_group'),
            'company_name'        => is_array($request->get('company_name')) ? join(
                '|',
                $request->get('company_name')
            ) : $request->get('company_name'),
            'contract_type'       => is_array($request->get('contract_type')) ? join(
                '|',
                $request->get('contract_type')
            ) : $request->get('contract_type'),
            'document_type'       => is_array($request->get('document_type')) ? join(
                '|',
                $request->get('document_type')
            ) : $request->get('document_type'),
            'language'            => is_array($request->get('language')) ? join(
                '|',
                $request->get('language')
            ) : $request->get('language'),
            'annotation_category' => $annotationCategoryInput,
            'sortby'              => $request->get('sortby'),
            'order'               => $request->get('order'),
            'group'               => $type,
            'all'                 => $request->get('all', '0'),
            'download'            => $request->get('download', false),

        ];
    }

    /**
     * Update filter data
     *
     * @param array   $filter
     * @param         $contract
     * @param Request $request
     *
     * @return array
     */
    protected function updateFilterData(array $filter, $contract, Request $request)
    {
        $isRcCategorySite = site()->isRCCategorySite();
        if ($isRcCategorySite) {
            $annotationCategoryInput =  is_array($request->get('key_clause'))
                ? $request->get('key_clause') : [$request->get('key_clause')];
        }else{
            $annotationCategoryInput = is_array($request->get('annotation_category'))
                ? $request->get('annotation_category') : [$request->get('annotation_category')];
        }
        $filter['country']             = is_array($request->get('country')) ? $request->get('country') : [
            $request->get(
                'country'
            ),
        ];
        $filter['year']                = is_array($request->get('year')) ? $request->get('year') : [
            $request->get(
                'year'
            ),
        ];
        $filter['corporate_group']     = is_array($request->get('corporate_group')) ? $request->get(
            'corporate_group'
        ) : [$request->get('corporate_group')];
        $filter['company_name']        = is_array($request->get('company_name')) ? $request->get(
            'company_name'
        ) : [$request->get('company_name')];
        $filter['contract_type']       = is_array($request->get('contract_type')) ? $request->get(
            'contract_type'
        ) : [$request->get('contract_type')];
        $filter['document_type']       = is_array($request->get('document_type')) ? $request->get(
            'document_type'
        ) : [$request->get('document_type')];
        $filter['language']            = is_array($request->get('language')) ? $request->get('language') : [
            $request->get(
                'language'
            ),
        ];
        $filter['resource']            = is_array($request->get('resource')) ? $request->get('resource') : [
            $request->get(
                'resource'
            ),
        ];
        $filter['annotation_category'] = $annotationCategoryInput;
        $filter['type']                = is_array($request->get('type')) ? $request->get('type') : [
            $request->get(
                'type'
            ),
        ];

        if (!$request->get('type')) {
            $filter['type'] = isset($contract->type) ? $contract->type : ['metadata', 'text', 'annotations'];
        }

        return $filter;
    }

    /**
     * Download Search Results in csv
     *
     * @param Request $request
     */
    public function downloadSearchResultAsCSV(Request $request)
    {
        try {
            $currentPage    = $request->get('page', 1);
            $filter         = $this->processQueries($request);
            $filter['from'] = $currentPage;
            $this->api->filterSearch($filter);
        } catch (\Exception $e) {
            Log::warning($request->url() . ": " . $e->getMessage());
            abort(404);
        }
    }
}
