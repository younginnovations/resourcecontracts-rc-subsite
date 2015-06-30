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
        $annotations = $this->api->getAnnotations($id);
        $contract    = $this->api->getMetadataDocument($id);
        if ($contract === false) {
            return "error";
        }

        return view('site.contract.pages', compact('page', 'contract', 'annotations'));
    }

    /**
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function filter(Request $request)
    {
        $contracts = $this->api->filter($request->all());
        $filters   = $request->all();

        if ($contracts === false) {
            return "error";
        }

        return view('site.filter', compact('contracts', 'filters'));
    }
}
