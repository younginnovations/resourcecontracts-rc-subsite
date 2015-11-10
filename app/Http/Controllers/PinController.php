<?php namespace App\Http\Controllers;

use App\Http\Services\APIService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class PinController
 * @package App\Http\Controllers
 */
class PinController extends BaseController
{
    protected $request;

    /**
     * @param Request    $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * pinning page
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('pins.index');
    }

}
