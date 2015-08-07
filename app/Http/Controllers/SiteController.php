<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use App\Http\Services\ContractService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class Controller
 * @package App\Http\Controllers
 */
class SiteController extends BaseController
{
    /**
     * @var APIService
     */
    protected $api;
    /**
     * @var Request
     */
    protected $request;
    /**
     * @var ContractService
     */
    protected $contract;

    /**
     * @param APIService      $api
     * @param Request         $request
     * @param ContractService $contract
     */
    public function __construct(APIService $api, Request $request, ContractService $contract)
    {
        $this->api      = $api;
        $this->request  = $request;
        $this->contract = $contract;
    }

    /**
     * @return \Illuminate\View\View
     */
    public function home()
    {
        $contracts = $this->api->getAllContracts();

        if (is_null($contracts)) {
            return "API Error";
        }

        return view('site.home', compact('contracts'));
    }

    /**
     * Show specific Contract detail page
     *
     * @param $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        $contract = $this->api->getContractDetail($id);
        $annotations = $this->api->getAnnotations($id);
        if (is_null($contract->metadata)) {
            return abort(404);
        }

        return view('site.details', compact('contract','annotations'));
    }

    /**
     * Get Single page detail
     *
     * @param $id
     * @param $page_no
     * @return \Illuminate\View\View
     */
    public function getSinglePage($id, $page_no)
    {
        dd('ddd');
        $contract              = new \stdClass();
        $contract->page        = $this->api->getTextPage($id, $page_no);
        $contract->annotations = $this->api->getAnnotationPage($id, $page_no);
        $contract->metadata    = $this->api->getMetadata($id);

        if (is_null($contract->metadata)) {
            return abort(404);
        }

        return view('site.documentview', compact('page', 'contract', 'annotations'));
    }

    /**
     * @param $id
     * @return \Illuminate\View\View
     */
    public function getPageList($id)
    {
        $page_no               = 1;
        $contract              = new \stdClass();
        $contract->page        = $this->api->getTextPage($id, $page_no);
        $contract->metadata    = $this->api->getMetadata($id);
        $contract->annotations = $this->contract->annotations($id);

        if (is_null($contract->metadata)) {
            return abort(404);
        }

        return view('site.contract.pages', compact('page', 'contract', 'annotations'));
    }

    /**
     * @param Request $request
     * @param         $contractId1
     * @param         $contractId2
     * @return \Illuminate\View\View
     */
    public function compare($contractId1, $contractId2)
    {
        $contract1Annotations = $this->contract->annotations($contractId1);
        $contract2Annotations = $this->contract->annotations($contractId2);
        $contract1            = $this->api->getMetadata($contractId1);
        $contract2            = $this->api->getMetadata($contractId2);

        return view(
            'site.contract.compare',
            compact('contract1Annotations', 'contract2Annotations', 'contract1', 'contract2')
        );
    }

    public function filter()
    {
        $filter             = [];
        $filter['country']  = $this->request->get('country');
        $filter['year']     = $this->request->get('year');
        $filter['resource'] = $this->request->get('resource');

        $contracts = $this->api->getAllContracts($filter);
        return view('site.home', compact('contracts'));
    }
}
