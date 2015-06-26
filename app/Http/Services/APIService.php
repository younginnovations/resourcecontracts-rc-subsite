<?php
/**
 * Created by PhpStorm.
 * User: deepak
 * Date: 6/25/15
 * Time: 4:11 PM
 */

namespace App\Http\Services;


use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;


class APIService
{
    const APIURL = 'http://localhost:8000/';
    /**
     * @var
     */
    private $client;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {

        $this->client = $client;
    }

    protected function apiURL($request)
    {
        return static::APIURL . $request;
    }

    public function getTextPage($contractId, $pageNo)
    {
        $request  = new Request('GET', $this->apiURL('es/contracts/' . $contractId . '/text/' . $pageNo . '/page'));
        $response = $this->client->send($request);
        $data     = $response->getBody();
        $text     = json_decode($data, true);
        return $text;

    }

    public function getAnnotationPage($contractId, $pageNo)
    {
        $request    = new Request('GET',
            $this->apiURL('es/contracts/' . $contractId . '/annotation/' . $pageNo . '/page'));
        $response   = $this->client->send($request);
        $data       = $response->getBody();
        $annotation = json_decode($data, true);
        return $annotation;
    }

    public function getSummary()
    {
        $request    = new Request('GET', $this->apiURL('es/contracts/summary'));
        $response   = $this->client->send($request);
        $data       = $response->getBody();
        $annotation = json_decode($data, true);
        return $annotation;
    }

    public function getMetadataDocument($contractId)
    {

        $request  = new Request('GET', $this->apiURL('es/contracts/' . $contractId . '/metadata'));
        $response = $this->client->send($request);
        $data     = $response->getBody();
        $metadata = json_decode($data, true);
        return $metadata;

    }

}