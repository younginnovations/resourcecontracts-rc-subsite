<?php namespace App\Http\Controllers;

use App\Http\Services\Admin\ImageService;
use App\Http\Services\ClippingService;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;

/**
 * Class ClippingController
 * @package App\Http\Controllers
 */
class ClippingController extends BaseController
{
    /**
     * @var ClippingService
     */
    public $clip;
    /**
     * @var ImageService
     */
    public $image;

    /**
     * @param ClippingService $clip
     * @param ImageService    $image
     */
    public function __construct(ClippingService $clip, ImageService $image)
    {
        $this->clip  = $clip;
        $this->image = $image;
    }

    /**
     * Display Clips
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('clip.index');
    }

    /**
     * Get Annotations
     *
     * @param Request $request
     *
     * @return string
     */
    public function getAllAnnotations(Request $request)
    {
        $data = $request->all();
        $data = isset($data['data']) ? explode(',', $data['data']) : [];

        return $this->clip->formatAnnotations($data);
    }

    /**
     * Download annotations xls
     *
     * @param Request $request
     *
     * @return string
     */
    public function downloadAnnotations(Request $request)
    {
        $data = $request->all();
        $data = isset($data['data']) ? explode(',', $data['data']) : [];

        return $this->clip->downloadAnnotations($data);
    }

    /**
     * Save Clip
     *
     * @param Request $request
     *
     * @return string
     */
    public function saveClip(Request $request)
    {
        $data         = $request->all();
        $annotationID = isset($data['data']) ? explode(',', $data['data']) : [];
        $key          = isset($data['key']) ? $data['key'] : '';

        return json_encode($this->clip->saveClip($annotationID, $key));
    }

    /**
     * Clip View
     *
     * @param $key
     *
     * @return \Illuminate\View\View
     */
    public function clipView($key)
    {
        return view('clip.view', compact('key'));
    }

    /**
     * Get Clipped data
     *
     * @param Request $request
     *
     * @return string
     */
    public function getClippedData(Request $request)
    {
        $key = $request->get('key', '');

        return $this->clip->getClippedAnnotations($key);
    }


    /**
     * Email Clip
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function emailClip(Request $request)
    {
        $formData = $request->all();

        if ($this->clip->sendMail($formData)) {
            return response()->json(['status' => true, 'message' => "Email Sent."]);
        }

        return response()->json(['status' => false, 'message' => "Something went wrong."]);
    }

    /**
     * Get Zip file
     *
     * @param Request $request
     *
     * @return bool|string
     */
    public function getZipFile(Request $request)
    {
        $data = $request->get('id', '');

        return $this->clip->getZipFile($data);
    }

}