<?php namespace App\Http\Controllers;

use App\Http\Services\ClippingService;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class ClippingController extends BaseController
{
    /**
     * @var ClippingService
     */
    public $clip;

    /**
     * @param ClippingService $clip
     */
    public function __construct(ClippingService $clip)
    {

        $this->clip = $clip;
    }

    public function index()
    {
        return view('clip.view');
    }

    /**
     * write brief description
     * @param Request $request
     */
    public function getAllAnnotations(Request $request)
    {
        $data = $request->all();
        $data = isset($data['data']) ? explode(',', $data['data']) : [];
        return $this->clip->getAllAnnotations($data);
    }


}