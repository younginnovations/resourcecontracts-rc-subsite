<?php namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function home()
    {
    	return view('RC.home');
    }

    public function viewContract()
    {
    	return view('RC.contractview');
    }

    public function annotation()
    {
    	return view('RC.annotation');
    }
}
