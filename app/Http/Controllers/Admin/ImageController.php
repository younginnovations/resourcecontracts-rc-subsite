<?php namespace App\Http\Controllers\Admin;

use App\Http\Services\Admin\ImageService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * Class ImageController
 * @package App\Http\Controllers\Admin
 */
class ImageController extends BaseController
{
    /**
     * @var ImageService
     */
    protected $image;

    /**
     * @param ImageService $image
     */
    public function __construct(ImageService $image)
    {
        $this->middleware('user');
        $this->image = $image;
    }

    /**
     * Image Manage Page
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $image = $this->image->getHomePageImageUrl();

        return view('admin.image.index', compact('image'));
    }

    /**
     * Upload Image
     *
     */
    public function upload()
    {
        try {
            $this->image->upload();

            return redirect()->back()->with('success', 'Image successfully updated.');
        } catch (\Exception $e) {

            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
