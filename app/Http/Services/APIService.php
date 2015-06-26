<?php
namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;

/**
 * Class APIService
 * @package App\Http\Services
 */
class APIService
{
    /**
     *
     */
    const APIURL = 'http://192.168.1.39:8000/';
    /**
     * @var Client
     */
    private $client;

    /**
     * @param Client $client
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
        return static::APIURL . $request;
    }

    /**
     * @param $contractId
     * @param $pageNo
     * @return Array
     */
    public function getTextPage($contractId, $pageNo)
    {
        $request  = new Request('GET', $this->apiURL('es/contracts/' . $contractId . '/text/' . $pageNo . '/page'));
        $response = $this->client->send($request);
        $data     = $response->getBody();
        $text     = json_decode($data, true);

        return $text;

    }

    /**
     * @param $contractId
     * @param $pageNo
     * @return Array
     */
    public function getAnnotationPage($contractId, $pageNo)
    {
        $request    = new Request(
            'GET',
            $this->apiURL('es/contracts/' . $contractId . '/annotation/' . $pageNo . '/page')
        );
        $response   = $this->client->send($request);
        $data       = $response->getBody();
        $annotation = json_decode($data, true);

        return $annotation;
    }

    /**
     * @return array
     */
    public function getSummary()
    {
        $request    = new Request('GET', $this->apiURL('es/contracts/summary'));
        $response   = $this->client->send($request);
        $data       = $response->getBody();
        $annotation = json_decode($data, true);

        return $annotation;
    }

    /**
     * @param $contractId
     * @return array
     */
    public function getMetadataDocument($contractId)
    {

        $request  = new Request('GET', $this->apiURL('es/contracts/' . $contractId . '/metadata'));
        $response = $this->client->send($request);
        $data     = $response->getBody();
        $metadata = json_decode($data, true);

        return $metadata;

    }

}