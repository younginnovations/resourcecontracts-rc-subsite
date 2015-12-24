<?php namespace App\Http\Controllers;

use App\Http\Services\AnnotationService;
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
     * @var AnnotationService
     */
    protected $annotation;

    /**
     * @param APIService        $api
     * @param ContractService   $contract
     * @param AnnotationService $annotation
     */
    public function __construct(
        APIService $api,
        ContractService $contract,
        AnnotationService $annotation
    ) {
        $this->api        = $api;
        $this->contract   = $contract;
        $this->annotation = $annotation;
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
        $filter      = [
            'year'    => $request->get('year'),
            'from'    => $currentPage,
            'sort_by' => $request->get('sortby'),
            'order'   => $request->get('order')
        ];
        $contracts   = $this->api->allContracts($filter);

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
        $contract                     = $this->api->contractDetail($contract_id);
        $contract->annotationsCluster = $this->annotation->groupAnnotationsByCluster($contract->annotations);
        $referrer                     = \Request::server('HTTP_REFERER');

        if (empty($contract->metadata)) {
            return abort(404);
        }

        return view('contract.detail', compact('contract', 'referrer'));
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

        if (empty($contract->metadata)) {
            return abort(404);
        }

        return view('contract.page.index', compact('page', 'contract', 'annotations'));
    }

    /**
     * Compare Contract Document
     *
     * @param $contractId1
     * @param $contractId2
     * @return \Illuminate\View\View
     */
    public function compare($contractId1, $contractId2)
    {
        $contractId1 = $this->api->getRealContractId($contractId1);
        $contractId2 = $this->api->getRealContractId($contractId2);

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

    /**
     * Download Word File
     *
     * @param $contract_id
     */
    public function download($contract_id)
    {
        $contract = $this->api->contractDetail($contract_id);
        if (empty($contract->metadata)) {
            abort(404);
        }

        $text = $this->contract->getTextFromS3($contract->metadata->file[1]->url);

        if (empty($text)) {
            abort(404);
        }

        $filename = sprintf(
            '%s-%s',
            $contract->metadata->id,
            str_limit(str_slug($contract->metadata->name), 70)
        );

        header("Content-type: application/vnd.ms-wordx");
        header("Content-Disposition: attachment;Filename=$filename.doc");

        $html = "<html>";
        $html .= "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
        $html .= "<body>";
        $html .= "<h3>NOTICE: The text below was created automatically and may contain errors and differences from the contract's original PDF file. Learn more <a href=\"http://alpha.resourcecontracts.org/faqs\">here</a></h3>";
        $html .= $text;
        $html .= "</body>";
        $html .= "</html>";
        echo $html;
        exit;
    }

    /**
     * Download Pdf File
     *
     * @param $contract_id
     */
    public function downloadPdf($contract_id)
    {
        $contract = $this->api->metadata($contract_id);
        if (empty($contract) || !isset($contract->file[0]->url)) {
            abort(404);
        }

        $filename = sprintf(
            '%s-%s',
            $contract->id,
            str_limit(str_slug($contract->name), 70)
        );
        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="' . basename($filename) . '.pdf"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        readfile($contract->file[0]->url);
        exit;
    }

    /**
     * Contract View page
     *
     * @param         $contract_id
     * @param Request $request
     * @return \Illuminate\View\View|void
     */
    public function view($contract_id)
    {
        $referrer           = \Request::server('HTTP_REFERER');
        $back               = is_null($referrer) ? route('contract.view', ['id' => $contract_id]) : $referrer;
        $contract           = new \stdClass();
        $contract->metadata = $this->api->metadata($contract_id);

        if (empty($contract->metadata)) {
            return abort(404);
        }

        return view('contract.page.view', compact('contract', 'back'));
    }

    /**
     * Download metadata in csv
     * @param Request $request
     */
    public function downloadMetadataAsCSV(Request $request)
    {
        $filter = [
            'country'  => $request['country'],
            'resource' => $request['resource'],
            'download' => $request['download'],
            'from'     => 1
        ];
        $this->api->allContracts($filter);
        die;
    }

}
