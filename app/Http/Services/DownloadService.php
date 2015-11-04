<?php
namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Message\Request;
use Illuminate\Support\Facades\Log;

/**
 * Class DownloadService
 * @package App\Http\Services
 */
class DownloadService
{
    /**
     * @var APIService
     */
    private $api;

    /**
     * @param APIService $api
     */
    public function __construct(APIService $api)
    {

        $this->api = $api;
    }


    /**
     * Fulltext search filter
     *
     * @param $filter
     * @return null
     */
    public function filterSearch($filter)
    {
        extract($filter);
        $per_page = !empty($per_page) ? $per_page : 25;
        $query    = [
            'q'                   => urlencode($q),
            'country'             => $country,
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
        $contract = $this->apiCall('contracts/search', $query);

        if ($contract) {
            return $contract;
        }

        return null;
    }

    /**
     * call API
     *
     * @param       $resource
     * @param array $query
     * @param bool  $array
     * @return null
     */
    protected function apiCall($resource, array $query = [], $array = false)
    {
        try {
            $request           = new Request('GET', $this->api->apiURL($resource));
            $query['category'] = $this->api->category;
            $request->setQuery($query);
            $response = $this->api->client->send($request);
            $data     = $response->getBody()->getContents();
            $filename = "export" . date('Y-m-d');
            header('Content-type: text/csv');
            header('Content-Disposition: attachment; filename="' . $filename . '.csv"');
            print $data;
            die;
        } catch (\Exception $e) {
            Log::error($resource . ":" . $e->getMessage(), $query);

            return null;
        }
    }

    /**
     * Filter for all contracts download
     *
     * @param $filter
     * @return null
     */
    public function allContractsdownload($filter)
    {
        $default = [
            'country'  => '',
            'year'     => '',
            'resource' => '',
            'per_page' => 10000,
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
            'from'         => 0,
            'sort_by'      => $filter['sort_by'],
            'order'        => $filter['order'],
            'download'     => $filter['download']
        ];

        $contract = $this->apiCall('contracts', $query);

        if ($contract->total > 0) {
            return $contract;
        }

        return null;
    }


}
