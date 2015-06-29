<?php
namespace App\Http\Services;

use GuzzleHttp\Client;
use Log;
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
     * @param Client $client
     * @param Log    $logger
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
        $request = new Request('GET', $this->apiURL('es/contracts/' . $contractId . '/text/' . $pageNo . '/page'));
        try {
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
     * @param $pageNo
     * @return Array|false
     */
    public function getAnnotationPage($contractId, $pageNo)
    {
        try {
            $request  = new Request(
                'GET',
                $this->apiURL('es/contracts/' . $contractId . '/annotation/' . $pageNo . '/page')
            );
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
    public function filter($filter)
    {
        try {
            $response = $this->client->get($this->apiURL(sprintf('es/contracts/filter')), ['query' => $filter]);
            $data     = $response->getBody();
            $metadata = json_decode($data, true);

            return $metadata;
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return false;
    }

}