<?php
namespace App\Http\Services;

use Log;

/**
 * Class APIService
 * @package App\Http\Services
 */
class ContractService
{
    /**
     * @var Log
     */
    protected $logger;
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

    public function annotations($contractId)
    {
        $contractAnnotationsObj = $this->api->getAnnotations($contractId);
        $annotation             = [];
        if ($contractAnnotationsObj) {
            foreach ($contractAnnotationsObj as $annotations) {
                $annotation[] = [
                    'page'  => $annotations->page_no,
                    'quote' => $annotations->quote,
                    'text'  => $annotations->text,
                    'tags'  => $annotations->tag
                ];
            }
        }

        return $annotation;
    }
}