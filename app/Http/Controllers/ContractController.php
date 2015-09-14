<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use App\Http\Services\ContractService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class ContractController
 * @package App\Http\Controllers
 */
class ContractController extends BaseController
{
    /**
     * @var APIService
     */
    protected $api;
    /**
     * @var ContractService
     */
    protected $contract;

    /**
     * @param APIService      $api
     * @param ContractService $contract
     */
    public function __construct(APIService $api, ContractService $contract)
    {
        $this->api      = $api;
        $this->contract = $contract;
    }

    /**
     * All Contracts
     *
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('page', 1);
        $filter      = ['year' => $request->get('year'), 'from' => $currentPage];

        $contracts = $this->api->allContracts($filter);

        return view('contract.index', compact('contracts', 'currentPage'));
    }

    /**
     * Show Contract detail
     *
     * @param $contract_id
     * @return \Illuminate\View\View
     */
    public function detail($contract_id)
    {
        $contract = $this->api->contractDetail($contract_id);
        if (is_null($contract->metadata)) {
            return abort(404);
        }

        return view('contract.detail', compact('contract'));
    }

    /**
     * Get Single page detail
     *
     * @param $id
     * @param $page_no
     * @return \Illuminate\View\View
     */
    public function pageDetail($id, $page_no)
    {
        $contract              = new \stdClass();
        $contract->page        = $this->api->getTextPage($id, $page_no);
        $contract->annotations = $this->api->getAnnotationPage($id, $page_no);
        $contract->metadata    = $this->api->getMetadata($id);

        if (is_null($contract->metadata)) {
            return abort(404);
        }

        return view('contract.page.detail', compact('page', 'contract', 'annotations'));
    }

    /**
     * Get Page list
     *
     * @param $id
     * @return \Illuminate\View\View
     */
    public function pageIndex($id, Request $request)
    {
        $page                  = $request->get('page');
        $page_no               = !empty($page) ? $page : 1;
        $contract              = new \stdClass();
        $contract->page        = $this->api->getTextPage($id, $page_no);
        $contract->metadata    = $this->api->metadata($id);
        $contract->annotations = $this->contract->annotations($id);

        if (is_null($contract->metadata)) {
            return abort(404);
        }

        return view('contract.page.index', compact('page', 'contract', 'annotations'));
    }

    /**
     * Compare Contracts
     *
     * @param         $contractId1
     * @param         $contractId2
     * @return \Illuminate\View\View
     */
    public function oldcompare($contractId1, $contractId2)
    {
        $contract1Annotations = $this->contract->annotations($contractId1);
        $contract2Annotations = $this->contract->annotations($contractId2);
        $contract1            = $this->api->metadata($contractId1);
        $contract2            = $this->api->metadata($contractId2);

        return view(
            'contract.page.oldcompare',
            compact('contract1Annotations', 'contract2Annotations', 'contract1', 'contract2')
        );
    }

    public function compare($contractId1, $contractId2)
    {
        $contract1            = new \stdClass();
        $contract2            = new \stdClass();
        $contract1Annotations = $this->contract->annotations($contractId1);
        $contract2Annotations = $this->contract->annotations($contractId2);
        $contract1->metadata  = $this->api->metadata($contractId1);
        $contract2->metadata  = $this->api->metadata($contractId2);
        return view(
            'contract.page.compare',
            compact('contract1Annotations', 'contract2Annotations', 'contract1', 'contract2')
        );
    }

    /**
     * Get Countries
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getCountries(Request $request)
    {
        $filter    = ['resource' => $request->get('resource')];
        $countries = $this->api->getCountryByResource($filter);

        foreach ($countries as &$country) {
            $country->name = trans('country')[strtoupper($country->code)];
        }

        return response()->json($countries);
    }

    /**
     * Get Resources
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getResources(Request $request)
    {
        $filter    = ['country' => $request->get('country')];
        $resources = $this->api->getResourceByCountry($filter);

        return response()->json($resources);
    }

    public function textIndex($id, Request $request)
    {
        $page                  = $request->get('page');
        $page_no               = !empty($page) ? $page : 1;
        $contract              = new \stdClass();
        $contract->page        = $this->api->getTextPage($id, $page_no);
        $contract->metadata    = $this->api->metadata($id);
        $contract->annotations = $this->contract->annotations($id);

        if (is_null($contract->metadata)) {
            return abort(404);
        }

        return view('contract.page.text', compact('page', 'contract', 'annotations'));
    }

    /**
     * Download Word File
     *
     * @param $contract_id
     */
    public function download($contract_id)
    {
        $contract = $this->api->contractDetail($contract_id);
        if (is_null($contract->metadata)) {
            return abort(404);
        }

        $text = $this->contract->getTextFromS3($contract->metadata->word_file);

        if (empty($text)) {
            abort(404);
        }

        $filename = sprintf('%s-%s', $contract->metadata->contract_id, str_limit(str_slug($contract->metadata->contract_name), 70));

        header("Content-type: application/vnd.ms-wordx");
        header("Content-Disposition: attachment;Filename=$filename.doc");

        $html = "<html>";
        $html .= "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
        $html .= "<body>";
        $html .= $text;
        $html .= "</body>";
        $html .= "</html>";
        echo $html;
        exit;
    }

    public function view($contract_id) 
    {
        $contract              = new \stdClass();
        $contract->metadata    = $this->api->metadata($contract_id);
        if (is_null($contract->metadata)) {
            return abort(404);
        }

        return view('contract.page.view', compact('contract'));
    }


}
