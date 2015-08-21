<?php
namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

/**
 * Class APIService
 * @package App\Http\Services
 */
class APIService
{
    /**
     * @const BASE_URL
     */
    const CATEGORY = 'rc';
    /**
     * @var Client
     */
    protected $client;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * Get Api full URL
     *
     * @param $request
     * @return string
     */
    protected function apiURL($request)
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
     * @return object|null
     */
    public function allContracts(array $filter = [])
    {
        $default = [
            'country'  => '',
            'year'     => '',
            'resource' => ''
        ];

        $filter = array_merge($default, $filter);

        $query = [
            'country_code' => $filter['country'],
            'year'         => $filter['year'],
            'resource'     => $filter['resource']
        ];

        $contract = $this->apiCall('contracts', $query);

        if ($contract->total > 0) {
            return $contract->results;
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
        $contract              = new \stdClass();
        $contract->metadata    = $this->metadata($contract_id);
        $contract->annotations = $this->getAnnotations($contract_id);
        $contract->pages       = $this->getTextPage($contract_id, 1);

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

        return $this->apiCall($resource);
    }

    /**
     * Get Annotations
     *
     * @param $contract_id
     * @return object|null
     */
    public function getAnnotations($contract_id)
    {
        $resource = sprintf('contract/%d/annotations', $contract_id);

        return $this->apiCall($resource);
    }


    /**
     * Get Text Page
     *
     * @param $contract_id
     * @return object|null
     */
    public function getTextPage($contract_id, $page_no)
    {
        $resource = sprintf('contract/%d/text', $contract_id);

        return $this->apiCall($resource, ['page' => $page_no]);
    }

    /**
     * @param $contract_id
     * @param $pageNo
     * @return array|false
     */
    public function getAnnotationPage($contract_id, $page_no)
    {
        $resource = sprintf('contract/%d/annotations', $contract_id);

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
        $resource = sprintf('contract/%d/searchtext', $contract_id);

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

        $query = [
            'q'        => $q,
            'country'  => $country,
            'year'     => $year,
            'resource' => $resource,
            'group'    => $group,
            'sort_by'  => $sortby,
            'order'    => $order,
            'per_page' => $per_page,
            'from'     => $from

        ];


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
            $query['category'] = static::CATEGORY;
            $request->setQuery($query);

            $response = $this->client->send($request);
            $data     = $response->getBody();

            \Session::flash('url', $request->getUrl());
            \Session::flash('response', json_decode($data));

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
        $default  = [
            'resource' => '',
        ];
        $filter   = array_merge($default, $filter);
        $query    = [
            'resource' => $filter['resource']
        ];
        $country = $this->apiCall('contract/countries', $query);

        if (count($country->results) > 0) {
            return $country->results;
        }

        return [];

    }


}
