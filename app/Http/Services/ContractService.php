<?php
namespace App\Http\Services;

use Exception;
use Illuminate\Support\Facades\Log;


/**
 * Class APIService
 * @package App\Http\Services
 */
class ContractService
{
    /**
     * @var APIService
     */
    protected $api;

    /**
     * @param APIService $api
     * @internal param Log $logger
     */
    public function __construct(APIService $api)
    {
        $this->api = $api;
    }

    /**
     * Get Annotations
     *
     * @param $contractId
     * @return array
     */
    public function annotations($contractId)
    {
        $contractAnnotationsObj = $this->api->getAnnotations($contractId);
        $annotation             = [];
        if ($contractAnnotationsObj->total > 0) {
            foreach ($contractAnnotationsObj->result as $annotations) {
                $annotation[] = [
                    'page'  => $annotations->page_no,
                    'quote' => $annotations->quote,
                    'text'  => $annotations->text,
                    'tags'  => $annotations->tags
                ];
            }
        }

        return $annotation;
    }

    /**
     * Get Contract Text from AWS S3
     *
     * @param $file
     * @return null|string
     */
    public function getTextFromS3($file)
    {
        try {
            return file_get_contents($file);
        } catch (Exception $e) {
            Log::error('File not found:' . $e->getMessage());

            return null;
        }
    }

    /**
     * Return array of country code
     * @param $summary
     * @return array
     */
    public function getListOfCountry($summary)
    {
        $countries = isset($summary->country_summary) ? $summary->country_summary : [];
        $codeList  = [];
        foreach ($countries as $country) {
            array_push($codeList, strtoupper($country->key));
        }

        return $codeList;
    }
}
