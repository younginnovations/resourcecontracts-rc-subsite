<?php namespace App\Http\Controllers\Contract;

use App\Http\Services\AnnotationService;
use App\Http\Services\APIService;
use App\Http\Services\ContractService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $currentPage     = $request->get('page', 1);
        $filter          = [
            'year'    => $request->get('year'),
            'from'    => $currentPage,
            'sort_by' => empty($request->get('sortby')) ? 'year' : $request->get('sortby'),
            'order'   => $request->get('order'),
            'all'     => $request->get('all', 0),
        ];
        $filter['order'] = ($filter['sort_by'] == 'year' && empty($filter['order'])) ? 'desc' : $filter['order'];

        $contracts       = $this->api->allContracts($filter);
        $meta            = [
            'title'       => 'Search Contracts',
            'description' => 'Search '.site()->meta('title').' using different criteria - year signed, company name,
            contract type, annotation category.',
        ];

        return view('contract.index', compact('contracts', 'currentPage', 'meta'));
    }

    /**
     * Show Contract detail
     *
     * @param $contract_id
     *
     * @return \Illuminate\View\View
     */
    public function detail($contract_id)
    {
        redirectIfOldOCID($contract_id);

        $contract = $this->api->contractDetail($contract_id);

        if (!isset($contract->metadata) && empty($contract->metadata)) {
            return abort(404);
        }

        $contract->annotationsCluster = $this->annotation->groupAnnotationsByCluster($contract->annotations);
        $referrer                     = \Request::server('HTTP_REFERER');

        $meta          = [
            'title' => $contract->metadata->name,
        ];
        $hideSearchBar = true;

        return view('contract.detail', compact('contract', 'referrer', 'meta', 'hideSearchBar'));
    }

    /**
     * Get Countries
     *
     * @param Request $request
     *
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
     *
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
        redirectIfOldOCID($contract_id);

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

        $learn_more_url = url('/faqs#link_learn_more');

        $html = "<html>";
        $html .= "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
        $html .= "<body>";
        $html .= sprintf(
            '<h3>NOTICE: The text below was created automatically and may contain errors and differences from the contract\'s original PDF file. Learn more <a href="%s">here</a></h3>',
            $learn_more_url
        );
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
        redirectIfOldOCID($contract_id);

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
        header('Content-Disposition: attachment; filename="'.basename($filename).'.pdf"');
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
     *
     * @return \Illuminate\View\View|void
     */
    public function view($contract_id)
    {
        redirectIfOldOCID($contract_id);

        $referrer              = \Request::server('HTTP_REFERER');
        $back                  = is_null($referrer) ? route('contract.view', ['id' => $contract_id]) : $referrer;
        $contract              = new \stdClass();
        $contract->metadata    = $this->api->metadata($contract_id);
        $contract->annotations = $this->api->getAnnotations($contract_id);
        $hideSearchBar         = true;

        if (empty($contract->metadata)) {
            return abort(404);
        }

        $meta = [
            'title' => $contract->metadata->name,
        ];

        return view('contract.view', compact('contract', 'back', 'meta', 'hideSearchBar'));
    }

    /**
     * Download metadata in csv
     *
     * @param Request $request
     */
    public function downloadMetadataAsCSV(Request $request)
    {
        $filter = [
            'country'  => $request['country'],
            'resource' => $request['resource'],
            'download' => $request['download'],
            'from'     => 1,
        ];
        $this->api->allContracts($filter);
        die;
    }

    /**
     * Annotations Download
     *
     * @param $id
     */
    public function downloadAnnotations($id)
    {
        redirectIfOldOCID($id);

        $url = "contract/".$id."/annotations/download";

        try {
            $this->api->downloadAPI($url, [], "", $id);
            die;
        } catch (\Exception $e) {
            Log::warning($url.": ".$e->getMessage());

            return abort(404);
        }
    }

    /**
     * Display contract popup view
     *
     * @param $contract_id
     * @param $annotation_id
     *
     * @return \Illuminate\View\View
     */
    public function popup($contract_id, $annotation_id)
    {
        redirectIfOldOCID($contract_id);

        $annotation = $this->api->getAnnotationDetail($contract_id, $annotation_id);

        if (empty($annotation)) {
            return abort(404);
        }

        return view('contract.popup', compact('annotation'));
    }
}
