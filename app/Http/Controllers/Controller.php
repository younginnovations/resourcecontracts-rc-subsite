<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
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
     * @param Request $request
     */
    public function __construct(APIService $api, Request $request)
    {

        $this->api     = $api;
        $this->request = $request;
    }

    public function home()
    {
        $summary = $this->api->getSummary();
        $result  = [
            ["name" => "contract 1", "id" => 1],
            ["name" => "contract 2", "id" => 2],
            ["name" => "contract 3", "id" => 3]
        ];
        return view('RC.home', compact('summary', 'result'));
    }


    public function viewContract()
    {
        $summary=$this->api->getSummary();
        $annotations = [
            ["no" => 1, "text" => "Type of resource", "quote" => "coal", "tag" => ["local", "company"]],
            ["no" => 2, "text" => "Type of resource", "quote" => "coal", "tag" => ["local", "company"]]
        ];

        $document = [
            "contract_name"         => "JJJJJJJJJJJJJJJJ",
            "contract_identifier"   => "identifier",
            "language"              => "English",
            "country"               => "USA",
            "document_type"         => "contract",
            "government_entity"     => "xxxxxxxx",
            "government_identifier" => "LLLLL",
            "type_of_contract"      => "RC",
            "signature_date"        => "2015-06-23",
            "translation_parent"    => "no",
            "company"               => [
                "name"                          => "ZZZZZZZZZ",
                "jurisdiction_of_incorporation" => "ppppppp",
                "registration_agency"           => "rrrrrrrr",
                "company_address"               => "2014-01-01",
                "company_address"               => "USA",
                "comp_id"                       => 123,
                "parent_company"                => "ccccccccc",
                "open_corporate_id"             => 321
            ]
        ];
        return view('RC.contractview', compact('document', 'summary', 'annotations'));
    }

    public function documentview()
    {
        return view('RC.documentview');
    }


    public function pdfText($id, $page_no)
    {
        $data       = $this->api->getTextPage($id, $page_no);
        $annotation = $this->api->getAnnotationPage($id, $page_no);
        return view('RC.documentview', compact('data'));
    }
}
