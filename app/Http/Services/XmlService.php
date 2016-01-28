<?php

namespace App\Http\Services;

use SimpleXMLElement;

/**
 * Class XmlService
 * @package App\Http\Services
 */
class XmlService
{

    /**
     * @var array
     */
    protected $feed = [];

    /**
     * write brief description
     */
    public function getMainPages()
    {
        $pages = [
            '',
            'countries',
            'resources'
        ];

        foreach ($pages as $page) {
            $this->feed[] = [
                'url'      => url("/" . $page),
                'priority' => 1
            ];
        }

    }


    /**
     * write brief description
     * @param $countries
     */
    public function getAllCountries($countries)
    {
        foreach ($countries as $country) {
            $this->feed[] = [
                'url'      => url("countries/" . urlencode($country->key)),
                'priority' => 0.85
            ];
        }
    }

    /**
     * write brief description
     * @param $resources
     */
    public function getAllResources($resources)
    {
        foreach ($resources as $resource) {
            $this->feed[] =
                [
                    'url'      => url("resource/" . urlencode($resource->key)),
                    'priority' => 0.69
                ];
        }
    }

    /**
     * write brief description
     * @param $year_summary
     */
    public function getYear($year_summary)
    {
        foreach ($year_summary as $year) {
            $this->feed[] =
                [
                    'url'      => url("contracts?year=" . urlencode($year->key)),
                    'priority' => 0.69
                ];

        }
    }

    /**
     * write brief description
     * @param $contracts
     */
    public function getAllContracts($contracts)
    {
        foreach ($contracts as $contract) {

            $this->feed[] =
                [
                    'url'      => url("contract/" . urlencode($contract->open_contracting_id)),
                    'priority' => 0.85
                ];
            $this->feed[] =
                [
                    'url'      => url("contract/" . urlencode($contract->open_contracting_id) . "/view"),
                    'priority' => 0.85
                ];

        }
    }


    /**
     * write brief description
     */
    public function getStaticPages()
    {
        $pages = [
            'about',
            'page/resources',
            'glossary',
            'publish-contracts',
            'contact'
        ];

        foreach ($pages as $page) {
            $this->feed[] = [
                'url'      => url("/" . $page),
                'priority' => 0.85
            ];
        }
    }

    /**
     * write brief description
     */
    public function generateXML()
    {
        $xml = new SimpleXMLElement("<?xml version=\"1.0\" encoding=\"utf-8\" ?><urlset></urlset>");

        foreach ($this->feed as $link) {

            try {
                $track = $xml->addChild('url');
                $track->addChild('loc', $link['url']);
                $track->addChild('changefreq', 'daily');
                $track->addChild('priority', $link['priority']);

            } catch (\Exception $e) {
                echo $e;
            }
        }
        $xml->saveXML('sitemap.xml');

        Header('Content-type: text/xml');
        print($xml->asXML());
        exit;
    }

}
