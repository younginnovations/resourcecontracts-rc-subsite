<?php namespace App\Http\Controllers\Contract;

use App\Http\Services\APIService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class ApiController
 * @package App\Http\Controllers\Contract
 */
class ApiController extends BaseController
{
    /**
     * @var APIService
     */
    protected $api;

    /**
     * ApiController constructor.
     *
     * @param APIService $api
     */
    public function __construct(APIService $api)
    {
        $this->api = $api;
    }

    /**
     * Contract Text
     *
     * @param $id
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function text($id)
    {
        $page = $this->api->getTextPage($id, null);
        return response()->json($page);
    }

    /**
     * Contract Annotations Search
     *
     * @param         $id
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function annotationSearch($id, Request $request)
    {
        $page        = $request->input('page');
        $annotations = $this->api->annotationSearch($id, $page);

        return response()->json($annotations);
    }

    /**
     * Contract Search Text
     *
     * @param         $id
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function searchText($id, Request $request)
    {
        $q      = $request->input('q');
        $result = $this->api->getFullTextSearch($id, $q);

        return response()->json($result);
    }

}
