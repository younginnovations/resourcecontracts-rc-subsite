<?php

use \Illuminate\Support\Facades\Lang as Lang;
use Laracasts\Integrated\Extensions\Goutte as IntegrationTest;
use Tests\Api\ApiTester;

class Testing extends IntegrationTest
{
    public $baseUrl = 'http://olc.yipl.com.np';
    public $apiUrl = 'http://api.resourcecontracts.org';
    public $category = 'olc';
    public $api;

    /**
     * Set class ApiTester to $api variable.
     */
    public function setUp()
    {
        parent::setUp();
        $this->api = new ApiTester();
    }

    /**
     * @param $message
     */
    public function cliPrint($message)
    {
        echo PHP_EOL;
        echo "***********************************************";
        echo PHP_EOL;
        echo $message;
        echo PHP_EOL;
        echo "***********************************************";
        echo PHP_EOL;
    }

    /** @test */
    public function testItTestsHomePage()
    {
        $this->cliPrint('Action: Testing Home Page');

        $totalContracts = $this->api->get($this->apiUrl . '/contracts?category=olc')->getJson()->total;
        $totalCountries = count($this->api->get($this->apiUrl . '/contracts/summary?category=olc')->getJson()->country_summary);
        $totalResources = count($this->api->get($this->apiUrl . '/contracts/summary?category=olc')->getJson()->resource_summary);

        print_r('There are ' . $totalCountries . ' countries in ' . $this->category);
        echo PHP_EOL;
        print_r('There are ' . $totalResources . ' resources in ' . $this->category);

        $this->visit('/')
             ->andSee('Search ' . $totalContracts . ' Contracts')
             ->andSee($totalCountries . '</span> Countries')
             ->andSee($totalResources . '</span> Resources');

        $this->cliPrint('Completed !');

    }

    /** @test */
    public function testItTestsCountriesPage()
    {
        $getCountries = $this->api
            ->get($this->apiUrl . '/contracts/summary?category=olc')
            ->getJson()
            ->country_summary;

        $this->visit('/countries');

        foreach ($getCountries as $country) {

            $countryCode = strtoupper($country->key);
            $countryName = Lang::get('country.' . $countryCode);
            $this->see($countryName);
        }
    }

    /** @test */
    public function testItTestsResourcesPage()
    {
        $getResources = $this->api
            ->get($this->apiUrl . '/contracts/summary?category=olc')
            ->getJson()
            ->resource_summary;

        $this->visit('/resources');

        foreach ($getResources as $resource) {

            $resourceCode = $resource->key;
            $resourceName = 'resources.' . $resourceCode;

            if (Lang::has($resourceName)) {
                $resourceName = Lang::get($resourceName);
            } else {
                $resourceName = $resource->key;
            }

            $this->cliPrint('Checking for ' . $resourceName);
            $this->see($resourceName);
        }
    }


}

