<?php
namespace App\Http\Services;

use GuzzleHttp\Client;
use Illuminate\Pagination\Paginator;
use GuzzleHttp\Message\Request;
use Illuminate\Support\Facades\Log;

/**
 * Class APIService
 * @package App\Http\Services
 */
class APIService
{
    /**
     * @const BASE_URL
     */
    const BASE_URL = 'es';
    /**
     * @var Client
     */
    protected $client;
    /**
     * @var Log
     */
    protected $logger;
    /**
     * @var Log
     */
    private $log;

    /**
     * @param Client $client
     * @param Log    $log
     * @internal param Log $logger
     */
    public function __construct(Client $client, Log $log)
    {
        $this->client = $client;
        $this->log    = $log;
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
        $base    = self::BASE_URL;
        $request = trim($request, '/');

        return sprintf('%s/%s/%s', $host, $base, $request);
    }

    /**
     * Get Summary
     *
     * @return array|null
     */
    public function getSummary()
    {
        $call = '/contracts/summary';

        return $this->apiCall($call, true);
    }

    /**
     * Get All Contracts
     *
     * @return object|null
     */
    public function getAllContracts(array $filter = [])
    {
        $default = [
            'country'  => '',
            'year'     => '',
            'resource' => ''
        ];

        $filter = array_merge($default, $filter);
        extract($filter);
        $call     = sprintf('/contracts?country_code=%s&year=%s&resource=%s', $country, $year, $resource);
        $contract = $this->apiCall($call);

        if ($contract) {
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
    public function getContractDetail($contract_id)
    {
        $contract              = new \stdClass();
        $contract->metadata    = $this->getMetadata($contract_id);
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
    public function getMetadata($contract_id)
    {
        $call = sprintf('/contract/%s/metadata', $contract_id);

        return $this->apiCall($call);
    }

    /**
     * Get Annotations
     *
     * @param $contract_id
     * @return object|null
     */
    public function getAnnotations($contract_id)
    {
        $call = sprintf('/contract/%d/annotations', $contract_id);

        return $this->apiCall($call);
    }


    /**
     * Get Text Page
     *
     * @param $contract_id
     * @return object|null
     */
    public function getTextPage($contract_id, $page_no)
    {
        $call = sprintf('/contract/%d/text?page=%d', $contract_id, $page_no);

        return $this->apiCall($call);
    }

    /**
     * @param $contractId
     * @param $pageNo
     * @return Array|false
     */
    public function getAnnotationPage($contractId, $pageNo)
    {

        $call = sprintf('/contract/%d/annotations?page=%d', $contractId, $pageNo);

        return $this->apiCall($call, true);
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
        $call = sprintf('/contract/%d/searchtext?q=%s', $contract_id, $query);

        return $this->apiCall($call, true);
    }

    /**
     * Call API
     *
     * @param      $call
     * @param bool $array
     * @return mixed
     */
    protected function apiCall($call, $array = false)
    {
        try {
            $request  = new Request('GET', $this->apiURL($call));
            $response = $this->client->send($request);
            $data     = $response->getBody();
            if ($array) {
                return json_decode($data, true);
            }

            return json_decode($data);

        } catch (\Exception $e) {
            Log::error($call . ":" . $e->getMessage());
        }
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
        $call = sprintf(
            '/contracts/search?q=%s&country=%s&year=%s&resource=%s&group=%s&sort_by=%s&order=%s&per_page=%s&from=%s',
            $q,
            $country,
            $year,
            $resource,
            $group,
            $sortby,
            $order,
            $per_page,
            $from
        );

        $contract = $this->apiCall($call);
        if ($contract) {
            return $contract;
        }

        return null;
    }


}