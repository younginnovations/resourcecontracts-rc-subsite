<?php
namespace App\Http\Services;

/**
 * Class APIService
 * @package App\Http\Services
 */
class AnnotationService
{
    /**
     * @var APIService
     */
    protected $api;

    /**
     * @param APIService $api
     */
    public function __construct(APIService $api)
    {
        $this->api = $api;
    }

    /**
     * Group the annotations by its Cluster
     * @param $annotations
     * @return array
     */
    public function groupAnnotationsByCluster($annotations)
    {
        $annotations = $annotations->result;
        $data        = [];
        foreach ($annotations as $annotation) {
            $data[$annotation->cluster][$annotation->category][] = $annotation;
        }
        return $data;
    }
}

