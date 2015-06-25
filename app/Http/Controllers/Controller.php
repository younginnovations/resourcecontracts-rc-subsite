<?php namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function home()
    {
        $summary=[
            "country_summary"=>["NP"=>2,"AL"=>10],
            "year_summary"=>["2015"=>6,"2014"=>6],
            "resource_summary"=>["cobalt"=>4,"copper"=>8]
        ];
        $result=[
            ["name"=>"contract 1","id"=>1],
            ["name"=>"contract 2","id"=>2],
            ["name"=>"contract 3","id"=>3]
        ];
    	return view('RC.home',compact('summary','result'));
    }


    public function viewContract()
    {
        $summary=[
            "country_summary"=>["NP"=>2,"AL"=>10],
            "year_summary"=>["2015"=>6,"2014"=>6],
            "resource_summary"=>["cobalt"=>4,"copper"=>8]
        ];
        $annotations=[
            ["no"=>1,"text"=>"Type of resource","quote"=>"coal","tag"=>["local","company"]],
            ["no"=>2,"text"=>"Type of resource","quote"=>"coal","tag"=>["local","company"]]
        ];

        $document=[
            "contract_name"=>"JJJJJJJJJJJJJJJJ",
            "contract_identifier"=>"identifier",
            "language"=>"English",
            "country"=>"USA",
            "document_type"=>"contract",
            "government_entity"=>"xxxxxxxx",
            "government_identifier"=>"LLLLL",
            "type_of_contract"=>"RC",
            "signature_date"=>"2015-06-23",
            "translation_parent"=>"no",
            "company"=>[
                "name"=>"ZZZZZZZZZ",
                "jurisdiction_of_incorporation"=>"ppppppp",
                "registration_agency"=>"rrrrrrrr",
                "company_address"=>"2014-01-01",
                "company_address"=>"USA",
                "comp_id"=>123,
                "parent_company"=>"ccccccccc",
                "open_corporate_id"=>321
            ]
        ];
    	return view('RC.contractview',compact('document','summary','annotations'));
    }

    public function annotation()
    {
    	return view('RC.annotation');
    }
}
