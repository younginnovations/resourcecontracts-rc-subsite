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
        if ($contracts === false) {
            return "error";
        }

        return view('site.home', compact('contracts'));
    }

    /**
     * @param $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        $annotations = $this->api->getAnnotations($id);
        $document    = $this->api->getMetadataDocument($id);
        if ($document === false) {
            return "error";
        }

        return view('site.details', compact('document', 'annotations'));
    }

    /**
     * @param $id
     * @param $page_no
     * @return \Illuminate\View\View
     */
    public function page($id, $page_no)
    {
        $page        = $this->api->getTextPage($id, $page_no);
        $annotations = $this->api->getAnnotationPage($id, $page_no);
        $contract    = $this->api->getMetadataDocument($id);
        if ($contract === false) {
            return "error";
        }

        return view('site.documentview', compact('page', 'contract', 'annotations'));
    }

    /**
     * @param $id
     * @return \Illuminate\View\View
     */
    public function pages($id)
    {
        $page_no     = 1;
        $page        = $this->api->getTextPage($id, $page_no);
        $contract    = $this->api->getMetadataDocument($id);
        $annotations = $this->contract->annotations($id);

        if ($contract === false) {
            return "error";
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
        $contract1    = $this->api->getMetadataDocument($contractId1);
        $contract2   = $this->api->getMetadataDocument($contractId2);

        return view(
            'site.contract.compare',
            compact('contract1Annotations','contract2Annotations','contract1','contract2')
        );
    }
}
