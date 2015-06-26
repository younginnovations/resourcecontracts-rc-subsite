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
     * Elastic Search Host
     */
    const APIURL = 'http://192.168.1.39:8000/';
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
     * @return Array
     */
    public function getTextPage($contractId, $pageNo)
    {
        $request = new Request('GET', $this->apiURL('es/contracts/' . $contractId . '/text/' . $pageNo . '/page'));
        try {
            $response = $this->client->send($request);
            $data     = $response->getBody();
            $text     = json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }


        return $text;
    }

    /**
     * @param $contractId
     * @param $pageNo
     * @return Array
     */
    public function getAnnotationPage($contractId, $pageNo)
    {
        try {
            $request    = new Request(
                'GET',
                $this->apiURL('es/contracts/' . $contractId . '/annotation/' . $pageNo . '/page')
            );
            $response   = $this->client->send($request);
            $data       = $response->getBody();
            $annotation = json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return $annotation;
    }

    /**
     * @return array
     */
    public function getSummary()
    {
        try {
            $request    = new Request('GET', $this->apiURL('es/contracts/summary'));
            $response   = $this->client->send($request);
            $data       = $response->getBody();
            $annotation = json_decode($data, true);
        } catch (\Exception $e) {
            return [];
            //Log::error("Error.{$e->getMessage()}");
        }

        return $annotation;
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
            $metadata = json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return $metadata;
    }

    /**
     * @param $contractId
     * @return Array
     */
    public function getAnnotations($contractId)
    {
        try {
            $request  = new Request('GET', $this->apiURL(sprintf('es/contracts/%d/annotations', $contractId)));
            $response = $this->client->send($request);
            $data     = $response->getBody();
            $response = json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return $response;
    }

    /**
     * @return Array
     */
    public function getAllContracts()
    {
        try {
            $request  = new Request('GET', $this->apiURL(sprintf('es/contracts')));
            $response = $this->client->send($request);
            $data     = $response->getBody();
            $metadata = json_decode($data, true);
        } catch (\Exception $e) {
            Log::error("Error.{$e->getMessage()}");
        }

        return $metadata;
    }

}