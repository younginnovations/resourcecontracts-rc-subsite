<?php
namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;
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
    public $client;
    public $category;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client   = $client;
        $this->category = trim(env('CATEGORY'));
    }

    /**
     * Get Api full URL
     *
     * @param $request
     * @return string
     */
    public function apiURL($request)
    {
        $host    = trim(env('ELASTIC_SEARCH_HOST'), '/');
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
            'download' => false
        ];

        $filter = array_merge($default, $filter);

        $query = [
            'country_code' => $filter['country'],
            'year'         => $filter['year'],
            'resource'     => $filter['resource'],
            'per_page'     => $filter['per_page'],
            'from'         => $filter['per_page'] * ($filter['from'] - 1),
            'sort_by'      => $filter['sort_by'],
            'order'        => $filter['order'],
            'download'     => $filter['download']
        ];

        if ($query['download']) {
            echo $this->downloadAPI('contracts', $query);
        }
        $contract = $this->apiCall('contracts', $query);

        if ($contract->total > 0) {
            return $contract;
        }

        return null;
    }

    /**
     * Get Contract Detail
     *
     * @param $contract_id
     * @return \stdClass
     */
    public function contractDetail($contract_id)
    {
        $contract                   = new \stdClass();
        $contract->metadata         = $this->metadata($contract_id);
        $contract->annotations      = $this->getAnnotations($contract_id);
        $contract->annotationsGroup = $this->groupAnnotationsByCategory($contract->annotations);
        $contract->pages            = $this->getTextPage($contract_id, 1);

        return $contract;
    }

    /**
     * Get Contract Metadata
     *
     * @param $contract_id
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
     * @return object|null
     */
    public function getAnnotations($contract_id)
    {
        $resource = sprintf('contract/%s/annotations', $contract_id);
        $response = $this->apiCall($resource);

        return $response;
    }


    /**
     * Get Text Page
     *
     * @param $contract_id
     * @return object|null
     */
    public function getTextPage($contract_id, $page_no)
    {
        $resource = sprintf('contract/%s/text', $contract_id);

        return $this->apiCall($resource, ['page' => $page_no]);
    }

    /**
     * @param $contract_id
     * @param $page_no
     * @return array|false
     * @internal param $pageNo
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
     * @return mixed
     */
    public function getFullTextSearch($contract_id, $query)
    {
        $resource = sprintf('contract/%s/searchtext', $contract_id);

        return $this->apiCall($resource, ['q' => $query], true);
    }

    /**
     * Full text search
     *
     * @param $filter
     * @return array
     */
    public function filterSearch($filter)
    {
        extract($filter);
        $per_page = !empty($per_page) ? $per_page : 25;
        $query    = [
            'q'                   => urlencode($q),
            'fuzzy'               => $fuzzy,
            'country_code'        => $country_code,
            'corporate_group'     => $corporate_group,
            'company_name'        => $company_name,
            'contract_type'       => $contract_type,
            'year'                => $year,
            'resource'            => $resource,
            'group'               => $group,
            'annotation_category' => $annotation_category,
            'sort_by'             => $sortby,
            'order'               => $order,
            'per_page'            => $per_page,
            'from'                => $per_page * ($from - 1),
            'download'            => $download,

        ];


        if ($filter['download']) {
            echo $this->downloadAPI('contracts/search', $query);
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
     * @return array|object|null
     */
    protected function apiCall($resource, array $query = [], $array = false)
    {
        try {
            $request           = new Request('GET', $this->apiURL($resource));
            $query['category'] = $this->category;
            $request->setQuery($query);
            $response = $this->client->send($request);
            $data     = $response->getBody();

            if ($array) {
                return json_decode($data, true);
            }

            return json_decode($data);

        } catch (\Exception $e) {
            Log::error($resource . ":" . $e->getMessage(), $query);

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
     * @param $filter
     * @return array
     */
    public function getResourceByCountry($filter)
    {
        $default  = [
            'country' => '',
        ];
        $filter   = array_merge($default, $filter);
        $query    = [
            'country' => $filter['country']
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
     * @return array
     */
    public function getCountryByResource($filter)
    {
        $default = [
            'resource' => '',
        ];
        $filter  = array_merge($default, $filter);
        $query   = [
            'resource' => $filter['resource']
        ];
        $country = $this->apiCall('contract/countries', $query);

        if (count($country->results) > 0) {
            return $country->results;
        }

        return [];

    }

    /**
     * Group the annotations by its category
     * @param $annotations
     * @return array
     */
    private function groupAnnotationsByCategory($annotations)
    {
        $annotations = $annotations->result;
        $data        = [];
        foreach ($annotations as $annotation) {

            if (array_key_exists($annotation->category, $data)) {
                array_push($data[$annotation->category], $annotation);
            } else {

                $data[$annotation->category] = [$annotation];
            }

        }
        ksort($data);

        return $data;
    }

    /**
     * Get Search Atributes such as contract_type,corporate_grouping,company_name
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
     * @param $id
     * @return array
     */
    public function getAllMetadata($id)
    {
        $contracts = $this->apiCall('/contracts/metadata/download', ['id' => $id]);

        return $contracts;
    }

    public function sortSummaryCountry()
    {
        $summaries = $this->summary();
        $data      = [];
        foreach ($summaries->country_summary as $summary) {

            $data[trans('country.' . strtoupper($summary->key))] = [
                'key'       => $summary->key,
                'name'      => trans('country.' . strtoupper($summary->key)),
                'doc_count' => $summary->doc_count
            ];
        }
        ksort($data);
        unset($summaries->country_summary);
        $summaries->country_summary = $data;

        return $summaries;
    }

    /**
     * call API
     *
     * @param       $resource
     * @param array $query
     * @param bool  $array
     * @return null
     */
    public function downloadAPI($resource, array $query = [], $array = false, $id = "")
    {
        try {
            $filename = "export" . date('Y-m-d');
            if (!empty($id)) {
                $metadata     = $this->contractDetail($id);
                $contractName = $metadata->metadata->name;
                $contractName = str_slug($contractName, "_");
                $filename     = "Annotations_" . $contractName . "_" . date('Ymdhis');
            }
            $request           = new Request('GET', $this->apiURL($resource));
            $query['category'] = $this->category;
            $request->setQuery($query);
            $response = $this->client->send($request);
            $data     = $response->getBody()->getContents();
            $data     = json_decode($data, true);

            Excel::create(
                $filename,
                function ($csv) use (&$data) {
                    $csv->sheet(
                        'sheetname',
                        function ($sheet) use (&$data) {
                            $sheet->fromArray($data);
                        }
                    );
                }
            )->download('xls');
            die;
        } catch (\Exception $e) {
            Log::error($resource . ":" . $e->getMessage(), $query);

            return null;
        }
    }

}

