<?php namespace App\Http\Controllers\Contract;

use App\Http\Services\APIService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class PageController extends BaseController
{
    /**
     * @var APIService
     */
    private $api;
    /**
     * @var Request
     */
    protected $request;

    /**
     * @param APIService $api
     * @param Request    $request
     */
    public function __construct(APIService $api, Request $request)
    {
        $this->api     = $api;
        $this->request = $request;
    }

    /**
     * Get Page Text
     * @param         $contractId
     * @return json
     */
    public function getText($contractId)
    {
        $page = $this->api->getTextPage($contractId, $this->request->input('page'));
        $page = $page->result[0];

        return response()->json(['result' => 'success', 'text' => $page->text, 'pdf_url' => $page->pdf_url]);
    }

    /**
     * Get Search  Text
     * @param         $contractId
     * @return json
     */
    public function search($contractId)
    {
        return response()->json($this->api->getFullTextSearch($contractId, $this->request->input('q')));
    }

    /**
     * Get Annotations
     * @param  $contractId
     * @return json
     */
    public function annotations()
    {
        if ($this->request->has('contract')) {
            $contract_id = $this->request->input('contract');
        } else {
            $contract_id = $this->request->input('id');
        }
        $response         = $this->api->getAnnotationPage($contract_id, $this->request->input('document_page_no'));
        $response['rows'] = $response['result'];

        return response()->json($response);
    }

    /**
     * Get All Page Text
     * @param         $contractId
     * @return json
     */
    public function getAllText($contractId)
    {
        $page = $this->api->getTextPage($contractId, "");

        return response()->json($page);
    }

}
