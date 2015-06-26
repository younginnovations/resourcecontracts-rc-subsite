<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
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
    private $api;
    /**
     * @var Request
     */
    private $request;

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
     * @return \Illuminate\View\View
     */
    public function home()
    {
        $summary   = $this->api->getSummary();
        $contracts = $this->api->getAllContracts();

        return view('site.home', compact('summary', 'contracts'));
    }

    /**
     * @param $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        $summary     = $this->api->getSummary();
        $annotations = $this->api->getAnnotations($id);
        $document    = $this->api->getMetadataDocument($id);
        if (!$document) {
            //return redirect()->back()->with("error", "No contract found.");
        }

        return view('site.contractview', compact('document', 'summary', 'annotations'));
    }

    /**
     * @param $id
     * @param $page_no
     * @return \Illuminate\View\View
     */
    public function page($id, $page_no)
    {
        $data       = $this->api->getTextPage($id, $page_no);
        $annotation = $this->api->getAnnotationPage($id, $page_no);

        return view('site.documentview', compact('data'));
    }

    /**
     * @param $id
     * @return \Illuminate\View\View
     */
    public function pages($id)
    {
        $page_no     = 1;
        $page        = $this->api->getTextPage($id, $page_no);
        $annotations = $this->api->getAnnotationPage($id, $page_no);
        $contract    = $this->api->getMetadataDocument($id);

        return view('site.documentview', compact('page', 'contract', 'annotations'));
    }

    /**
     * @param Request $request
     */
    public function filter(Request $request)
    {
        dd($request->all());
    }
}
