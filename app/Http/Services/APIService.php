<?php
namespace App\Http\Services;

use GuzzleHttp\Client;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Message\Request;

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
     * @var Log
     */
    protected $logger;

    /**
     * @param Client    $client
     * @internal param Log $logger
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * @param $request
     * @return string
     */
    protected function apiURL($request)
    {
        return env('ELASTIC_SEARCH_HOST') . $request;
    }

    /**
     * @param $contractId
     * @param $pageNo
     * @return Array|false
     */
    public function getTextPage($contractId, $pageNo)
    {
        try {
            $response = $this->client->get(
                $this->apiURL(sprintf('es/contracts/%s/text/%s/page', $contractId, $pageNo))
            );

            $data = $response->getBody();

            return json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return false;

    }

    /**
     * @param $contractId
     * @param $pageNo
     * @return Array|false
     */
    public function getAnnotationPage($contractId, $pageNo)
    {
        try {
            $request  = new Request(
                'GET',
                $this->apiURL('es/contracts/' . $contractId . '/page/' . $pageNo . '/annotations')
            );
            $response = $this->client->send($request);

            $data = $response->getBody();
            Log::Info("result.{$data}");

            return json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }
        return false;
    }

    /**
     * @return Array|false
     */
    public function getSummary()
    {
        try {
            $response = $this->client->get($this->apiURL('es/contracts/summary'));
            $data     = $response->getBody();

            return json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return false;
    }

    /**
     * @param $contractId
     * @return array
     */
    public function getMetadataDocument($contractId)
    {
        try {
            $request  = new Request('GET', $this->apiURL('es/contracts/' . $contractId . '/metadata'));
            $response = $this->client->send($request);
            $data     = $response->getBody();

            return json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return false;
    }

    /**
     * @param $contractId
     * @return Array|false
     */
    public function getAnnotations($contractId)
    {
        try {
            $request  = new Request('GET', $this->apiURL(sprintf('es/contracts/%d/annotations', $contractId)));
            $response = $this->client->send($request);
            $data     = $response->getBody();

            return json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return false;
    }

    /**
     * @return Array|false
     */
    public function getAllContracts()
    {
        try {
            $request  = new Request('GET', $this->apiURL(sprintf('es/contracts')));
            $response = $this->client->send($request);
            $data     = $response->getBody();
            $metadata = json_decode($data, true);

            return $metadata;
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return false;
    }

    /**
     * @param $filter
     * @return Array|false
     */
    public function filterSearch($filter)
    {
        try {

            $filter = array_filter($filter);
            $response     = $this->client->get(
                $this->apiURL(sprintf('es/contracts/fulltextsearch')),
                ['query' => $filter]
            );
            $data         = $response->getBody();
            $data = (object) json_decode($data, true);

            $data->result = new Paginator($data->result, $data->per_page);
            return $data;

        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return null;
    }

    /**
     * @param $f
     * @return Array|false
     */
    public function getFullTextSearch($contractId, $query)
    {
        try {
            $response = $this->client->get(
                $this->apiURL(sprintf('es/contracts/pdfsearch')),
                ['query' => ['contract_id' => $contractId, 'q' => $query]]
            );
            $data     = $response->getBody();
            $metadata = json_decode($data, true);

            return $metadata;
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return false;
    }

}