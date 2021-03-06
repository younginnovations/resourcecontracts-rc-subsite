<?php

namespace App\Http\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

/**
 * Class APIService
 * @package App\Http\Services
 */
class APIService
{
    /**
     * @var Client
     */
    protected $client;
    /**
     * @var LocalizationService
     */
    protected $lang;
    /**
     * @var SiteService
     */
    private $site;

    /**
     * @param Client              $client
     * @param SiteService         $site
     * @param LocalizationService $lang
     */
    public function __construct(Client $client, SiteService $site, LocalizationService $lang)
    {
        $this->client = $client;
        $this->site   = $site;
        $this->lang   = $lang;
    }

    /**
     * Get Api full URL
     *
     * @param $request
     *
     * @return string
     */
    public function apiURL($request)
    {
        $host    = trim(site()->esUrl(), '/');
        $request = trim($request, '/');

        return sprintf('%s/%s', $host, $request);
    }

    /**
     * Get Summary
     *
     * @return object|null
     */
    public function summary()
    {
        $resource = 'contracts/summary';

        return $this->apiCall($resource);
    }


    /**
     * Get All Contracts
     *
     * @param array $filter
     *
     * @return null|object
     */
    public function allContracts(array $filter = [])
    {
        $default = [
            'country'  => '',
            'year'     => '',
            'resource' => '',
            'per_page' => 25,
            'from'     => 0,
            'sort_by'  => '',
            'order'    => '',
            'all'      => 0,
            'download' => false,
        ];

        $filter = array_merge($default, $filter);
        $query  = [
            'country_code' => $filter['country'],
            'year'         => $filter['year'],
            'resource'     => $filter['resource'],
            'per_page'     => $filter['per_page'],
            'from'         => $filter['per_page'] * ($filter['from'] - 1),
            'sort_by'      => $filter['sort_by'],
            'order'        => $filter['order'],
            'all'          => $filter['all'],
            'download'     => $filter['download'],
            'group'        => $filter['group'],
        ];
        if ($query['download']) {
            $this->downloadAPI('contracts/search', $query);
        }
        $contract = $this->apiCall('contracts/group', $query);

        if ($contract->total > 0) {
            return $contract;
        }

        return null;
    }

    /**
     * Get Contract Detail
     *
     * @param $contract_id
     *
     * @return \stdClass
     */
    public function contractDetail($contract_id)
    {
        $contract           = new \stdClass();
        $contract->metadata = $this->metadata($contract_id);
        if (empty($contract->metadata)) {
            return [];
        }
        $contract->annotations      = $this->getAnnotationsGroup($contract_id);
        $contract->annotationsGroup = $this->groupAnnotationsByCategory($contract->annotations);
        $contract->pages            = $this->getTextPage($contract_id, 1);

        return $contract;
    }

    /**
     * Get Contract Metadata
     *
     * @param $contract_id
     *
     * @return object|null
     */
    public function metadata($contract_id)
    {
        $resource = sprintf('contract/%s/metadata', $contract_id);

        $contract = $this->apiCall($resource);

        return $contract;
    }

    /**
     * Get Annotations
     *
     * @param $contract_id
     *
     * @return object|null
     */
    public function getAnnotations($contract_id)
    {
        $resource     = sprintf('contract/%s/annotations', $contract_id);
        $response     = $this->apiCall($resource);
        $categoryList = [];

        foreach ($response->result as $result) {
            if (!in_array($result->category_key, $categoryList)) {
                $categoryList[] = $result->category_key;
            }
        }

        $totalCategory   = count($categoryList);
        $response->total = $totalCategory;

        return $response;
    }

    /**
     * Get Annotations
     *
     * @param $contract_id
     *
     * @return object|null
     */
    public function annotationSearch($contract_id, $page)
    {
        $resource = sprintf('contract/%s/annotations/search', $contract_id);
        $response = $this->apiCall($resource, ['page' => $page]);

        return $response;
    }

    /**
     * Get Annotations by group
     *
     * @param $contract_id
     *
     * @return array
     * @internal param $annotations
     */
    public function getAnnotationsGroup($contract_id)
    {
        $resource = sprintf('contract/%s/annotations/group', $contract_id);

        return $this->apiCall($resource);
    }

    /**
     * Get Text Page
     *
     * @param      $contract_id
     *
     * @param null $page_no
     *
     * @return null|object
     */
    public function getTextPage($contract_id, $page_no = null)
    {
        $resource = sprintf('contract/%s/text', $contract_id);

        return $this->apiCall($resource, ['page' => $page_no]);
    }

    /**
     * Get annotation by page
     *
     * @param $contract_id
     * @param $page_no
     *
     * @return array|false
     */
    public function getAnnotationPage($contract_id, $page_no)
    {
        $resource = sprintf('contract/%s/annotations', $contract_id);

        return $this->apiCall($resource, ['page' => $page_no], true);
    }

    /**
     * Get Full text search
     *
     * @param $contract_id
     * @param $query
     *
     * @return mixed
     */
    public function getFullTextSearch($contract_id, $query)
    {
        $resource = sprintf('contract/%s/searchtext', $contract_id);

        return $this->apiCall($resource, ['q' => $query], true);
    }

    /**
     * Recent contracts search
     *
     * @param $filter
     *
     * @return array
     */
    public function filterRecentSearch($filter)
    {
        extract($filter);
        $per_page = !empty($per_page) ? $per_page : 25;
        redirectIfOldAnnotationCategory($annotation_category);

        $query = [
            'q'                   => urlencode($q),
            'country_code'        => $country_code,
            'corporate_group'     => $corporate_group,
            'company_name'        => $company_name,
            'contract_type'       => $contract_type,
            'document_type'       => $document_type,
            'language'            => $language,
            'year'                => $year,
            'resource'            => $resource,
            'group'               => $group,
            'annotation_category' => $annotation_category,
            'sort_by'             => empty($sortby) ? 'year' :$sort_by,
            'order'               => empty($order) ? 'desc' :$order,
            'per_page'            => $all ? $from * 25 : $per_page,
            'from'                => $per_page * ($from - 1),
            'all'                 => $all,
            'download'            => $download,
            'annotated'           => $annotated,

        ];
        if ($filter['download']) {
            $this->downloadAPI('contracts/search', $query);
        }

        $contract = $this->apiCall('contracts/recent', $query);
        if ($contract) {
            return $contract;
        }

        return null;
    }

    /**
     * Full text search group
     *
     * @param $filter
     *
     * @return array
     */
    public function filterGroupSearch($filter)
    {
        extract($filter);
        $per_page = !empty($per_page) ? $per_page : 25;
        redirectIfOldAnnotationCategory($annotation_category);

        $query = [
            'q'                   => urlencode($q),
            'country_code'        => $country_code,
            'corporate_group'     => $corporate_group,
            'company_name'        => $company_name,
            'contract_type'       => $contract_type,
            'document_type'       => $document_type,
            'language'            => $language,
            'year'                => $year,
            'resource'            => $resource,
            'group'               => $group,
            'annotation_category' => $annotation_category,
            'sort_by'             => empty($sortby)?'year':$sort_by,
            'order'               => empty($order)?'desc':$order,
            'per_page'            => $all ? $from * 25 : $per_page,
            'from'                => $per_page * ($from - 1),
            'all'                 => $all,
            'download'            => $download,
            'annotated'           => $annotated,

        ];
        if ($filter['download']) {
            $this->downloadAPI('contracts/group', $query);
        }
        $contract = $this->apiCall('contracts/group', $query);
        if ($contract) {
            return $contract;
        }

        return null;
    }

    /**
     * Full text search
     *
     * @param $filter
     *
     * @return array
     */
    public function filterSearch($filter)
    {
        extract($filter);

        $per_page = !empty($per_page) ? $per_page : 25;

        redirectIfOldAnnotationCategory($annotation_category);

        $query = [
            'q'                   => urlencode($q),
            'country_code'        => $country_code,
            'corporate_group'     => $corporate_group,
            'company_name'        => $company_name,
            'contract_type'       => $contract_type,
            'document_type'       => $document_type,
            'language'            => $language,
            'year'                => $year,
            'resource'            => $resource,
            'group'               => $group,
            'annotation_category' => $annotation_category,
            'sort_by'             => empty($sortby)?'year':$sort_by,
            'order'               => empty($order)?'desc':$order,
            'per_page'            => $all ? $from * 25 : $per_page,
            'from'                => $per_page * ($from - 1),
            'all'                 => $all,
            'download'            => $download,
            'annotated'           => $annotated,

        ];

        if ($filter['download']) {
            $this->downloadAPI('contracts/search', $query);
        }

        $contract = $this->apiCall('contracts/search', $query);

        if ($contract) {
            return $contract;
        }

        return null;
    }

    /**
     * Call API
     *
     * @param       $resource
     * @param array $query
     * @param bool  $array
     *
     * @return array|object|null
     */
    public function apiCall($resource, array $query = [], $array = false)
    {
        try {
            $request = new Request('GET', $this->apiURL($resource));

            if ($this->site->isCountrySite()) {
                $query['country_code']    = strtolower($this->site->getCountryCode());
                $query['is_country_site'] = 1;
            }

            if ($this->lang->getCurrentLang() != $this->lang->getDefaultLang()) {
                $query['lang'] = $this->lang->getCurrentLang();
            }

            $query['category'] = strtolower($this->site->getCategory());
            $request->setQuery($query);
            $key = md5($request->getUrl());

            if (Cache::has($key)) {
                $data = Cache::get($key);
            } else {
                $response   = $this->client->send($request);
                $data       = $response->getBody();
                $data       = $data->getContents();
                $statusCode = $response->getStatusCode();
                if ($statusCode == 200) {
                    Cache::put($key, $data, Carbon::now()->addMinutes(5));
                } else {
                    Cache::put($key, $data, Carbon::now()->addMinutes(5));
                    Log::error("API call to:".$request->getUrl()." returned status code ".$statusCode);
                    Log::error("Response body of the API call ".$request->getUrl()." was ".$data);
                }
            }

            if ($array) {
                return json_decode($data, true);
            }

            return json_decode($data);

        } catch (\Exception $e) {
            Log::error($resource.":".$e->getMessage(), $query);

            return null;
        }
    }

    /**
     * Get all countries
     *
     * @return object
     */
    public function allCountries()
    {
        $resource = sprintf('contract/country/resource');

        return $this->apiCall($resource);
    }

    /**
     * Get Resource by Country
     *
     * @param $filter
     *
     * @return array
     */
    public function getResourceByCountry($filter)
    {
        $default  = [
            'country' => '',
        ];
        $filter   = array_merge($default, $filter);
        $query    = [
            'country' => $filter['country'],
        ];
        $contract = $this->apiCall('contract/resources', $query);

        if (count($contract->results) > 0) {
            return $contract->results;
        }

        return [];
    }

    /**
     * Get Country By resource
     *
     * @param $filter
     *
     * @return array
     */
    public function getCountryByResource($filter)
    {
        $default = [
            'resource' => '',
        ];
        $filter  = array_merge($default, $filter);
        $query   = [
            'resource' => $filter['resource'],
        ];
        $country = $this->apiCall('contract/countries', $query);

        if (count($country->results) > 0) {
            return $country->results;
        }

        return [];

    }

    /**
     * Get Search Attributes such as contract_type,corporate_grouping,company_name
     *
     * @return object|null
     */
    public function searchAttributed()
    {
        $resource = 'contract/attributes';

        return $this->apiCall($resource);
    }

    /**
     * Get Annotations category
     *
     * @return object|null
     */
    public function getAnnotationsCategory()
    {
        $resource = 'contracts/annotations/category';

        $response = $this->apiCall($resource);

        return $response;
    }

    /**
     * Return all the metadata of given id
     *
     * @param $id
     *
     * @return array
     */
    public function getAllMetadata($id)
    {
        $contracts = $this->apiCall('/contracts/metadata/download', ['id' => $id]);

        return $contracts;
    }

    /**
     * Sort countries
     *
     * @return null|object
     */
    public function sortSummaryCountry()
    {
        $summaries = $this->summary();
        $data      = [];

        foreach ($summaries->country_summary as $summary) {

            $data[trans('country.'.strtoupper($summary->key))] = [
                'key'       => $summary->key,
                'name'      => trans('country.'.strtoupper($summary->key)),
                'doc_count' => $summary->doc_count,
            ];
        }
        ksort($data);
        unset($summaries->country_summary);
        $summaries->country_summary = $data;

        return $summaries;
    }

    /**
     * Downloads CSV
     *
     * @param        $resource
     * @param array  $query
     * @param false  $array
     * @param string $id
     *
     * @throws \Exception
     */
    public function downloadAPI($resource, array $query = [], $array = false, $id = "")
    {
        $filename = "contract_".date('Y-m-d');

        if (!empty($id)) {
            $metadata = $this->contractDetail($id);

            if (empty($metadata)) {
                throw new \Exception('Contract not found with id '.$id);
            }
        }
        $request = new Request('GET', $this->apiURL($resource));

        if ($this->site->isCountrySite()) {
            $query['country']         = strtolower($this->site->getCountryCode());
            $query['is_country_site'] = 1;
        }
        $query['category'] = strtolower($this->site->getCategory());
        $request->setQuery($query);
        $response                  = $this->client->send($request);
        $data                      = $response->getBody()->getContents();
        $data                      = json_decode($data, true);
        $is_rc_with_annotation_cat = false;

        if (site()->isRC() && isset($query['annotation_category']) && !empty($query['annotation_category'])) {
            $is_rc_with_annotation_cat = true;

            foreach ($data as $key => $datum) {
                unset($data[$key]['OCID']);
                unset($data[$key]['Document Type']);
                unset($data[$key]['Government Entity']);
                unset($data[$key]['Company Address']);
                unset($data[$key]['Jurisdiction of Incorporation']);
                unset($data[$key]['Registration Agency']);
                unset($data[$key]['Company Number']);
                unset($data[$key]['Corporate Grouping']);
                unset($data[$key]['Participation Share']);
                unset($data[$key]['Open Corporates Link']);
                unset($data[$key]['Incorporation Date']);
                unset($data[$key]['Operator']);
                unset($data[$key]['Project Title']);
                unset($data[$key]['Project Identifier']);
                unset($data[$key]['License Name']);
                unset($data[$key]['License Identifier']);
                unset($data[$key]['Source Url']);
                unset($data[$key]['Disclosure Mode']);
                unset($data[$key]['Retrieval Date']);
            }
        }

        Excel::create(
            $filename,
            function ($csv) use (&$data, $is_rc_with_annotation_cat) {
                $csv->sheet(
                    'sheetname',
                    function ($sheet) use (&$data, $is_rc_with_annotation_cat) {
                        $sheet->fromArray($data);

                        $sheet->row(
                            1,
                            function ($row) {

                                $row->setFontSize(10);
                                $row->setFontWeight('bold');

                            }
                        );

                        if (site()->isRC()) {
                            if ($is_rc_with_annotation_cat) {
                                for ($i = 2; $i <= sizeof($data) + 1; $i++) {
                                    $pdfUrlCell = 'C'.$i;
                                    $sheet->getCell($pdfUrlCell)->getHyperlink()->setUrl($data[$i - 2]['PDF URL']);
                                    $sheet->getStyle($pdfUrlCell)->applyFromArray(
                                        array('font' => array('color' => ['rgb' => '0000FF'], 'underline' => 'single'))
                                    );

                                    if (isset($data[$i - 2]['Link']) && !empty($data[$i - 2]['Link'])) {
                                        $articleRefCell = 'K'.$i;
                                        $removeLinkCell = 'L'.($i - 1);
                                        $removeLink     = 'L'.$i;

                                        $sheet->getCell($articleRefCell)->getHyperlink()->setUrl(
                                            url().'/'.$data[$i - 2]['Link']
                                        );
                                        $sheet->getStyle($articleRefCell)->applyFromArray(
                                            array(
                                                'font' => array(
                                                    'color'     => ['rgb' => '0000FF'],
                                                    'underline' => 'single',
                                                ),
                                            )
                                        );

                                        $sheet->getCell($removeLinkCell)->setValue(' ');
                                        $sheet->getCell($removeLink)->setValue(' ');
                                    }
                                }
                            } else {
                                for ($i = 2; $i <= sizeof($data) + 1; $i++) {
                                    $pdfUrlCell        = 'D'.$i;
                                    $sourceUrlCell     = 'Z'.$i;
                                    $openCorporateCell = 'S'.$i;
                                    $sheet->getCell($pdfUrlCell)->getHyperlink()->setUrl($data[$i - 2]['PDF URL']);
                                    $sheet->getStyle($pdfUrlCell)->applyFromArray(
                                        array('font' => array('color' => ['rgb' => '0000FF'], 'underline' => 'single'))
                                    );

                                    $sheet->getCell($sourceUrlCell)->getHyperlink()->setUrl(
                                        $data[$i - 2]['Source Url']
                                    );
                                    $sheet->getStyle($sourceUrlCell)->applyFromArray(
                                        array('font' => array('color' => ['rgb' => '0000FF'], 'underline' => 'single'))
                                    );

                                    $sheet->getCell($openCorporateCell)->getHyperlink()->setUrl(
                                        $data[$i - 2]['Open Corporates Link']
                                    );
                                    $sheet->getStyle($openCorporateCell)->applyFromArray(
                                        array('font' => array('color' => ['rgb' => '0000FF'], 'underline' => 'single'))
                                    );

                                    if (isset($data[$i - 2]['Link']) && !empty($data[$i - 2]['Link'])) {

                                        $articleRefCell = 'AD'.$i;
                                        $removeLinkCell = 'AE'.($i - 1);
                                        $removeLink     = 'AE'.$i;

                                        $sheet->getCell($articleRefCell)->getHyperlink()->setUrl(
                                            url().'/'.$data[$i - 2]['Link']
                                        );
                                        $sheet->getStyle($articleRefCell)->applyFromArray(
                                            array(
                                                'font' => array(
                                                    'color'     => ['rgb' => '0000FF'],
                                                    'underline' => 'single',
                                                ),
                                            )
                                        );

                                        $sheet->getCell($removeLinkCell)->setValue(' ');
                                        $sheet->getCell($removeLink)->setValue(' ');

                                    }
                                }
                            }
                        }
                    }
                );
            }
        )->download('xls');
    }

    /**
     * Get Annotation Detail
     *
     * @param $contract_id
     * @param $annotation_id
     *
     * @return array
     */
    public function getAnnotationDetail($contract_id, $annotation_id)
    {
        try {
            $metadata    = $this->metadata($contract_id);
            $annotations = $this->getAnnotations($contract_id);
            $annotations = collect($annotations->result);
            $annotation  = $annotations->where('id', $annotation_id)->first();
            $annotations = $annotations->groupBy('annotation_id')->toArray();
            $pages       = [];

            foreach ($annotations[$annotation->annotation_id] as $ann) {
                $pages[] = [
                    'id'                => $ann->id,
                    'article_reference' => $ann->article_reference,
                    'page_no'           => $ann->page_no,
                ];
            }

            return [
                'contract_id'    => $metadata->id,
                'contract_title' => $metadata->name,
                'annotation_id'  => $annotation->annotation_id,
                'total_pages'    => $metadata->number_of_pages,
                'quote'          => $annotation->quote,
                'text'           => $annotation->text,
                'category'       => $annotation->category,
                'category_key'   => $annotation->category_key,
                'pages'          => $pages,
                'cluster'        => $annotation->cluster,
                'shapes'         => $annotation->shapes,
            ];
        } catch (\Exception $e) {
            Log::error('Contract popup :'.$e->getMessage());

            return null;
        }
    }

    /**
     * Group the annotations by its category
     *
     * @param $annotations
     *
     * @return array
     */
    private function groupAnnotationsByCategory($annotations)
    {
        $annotations = $annotations->result;
        $data        = [];
        foreach ($annotations as $annotation) {

            if (array_key_exists($annotation->category_key, $data)) {
                array_push($data[$annotation->category_key], $annotation);
            } else {

                $data[$annotation->category_key] = [$annotation];
            }
        }

        ksort($data);

        return $data;
    }

    /**
     * Returns recent contract counts
     *
     * @return int
     */
    public function recentContractCount()
    {
        $recent_contract_count = $this->apiCall('contracts/recent/count');

        return isset($recent_contract_count->aggregations->recent_contract_count->value) ?
            $recent_contract_count->aggregations->recent_contract_count->value : 0;
    }
}
