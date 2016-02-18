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
        $homePageImage = $this->image->getImageUrl('bg');
        $sidebarImage  = $this->image->getImageUrl('sidebar');

        return view('admin.image.index', compact('homePageImage', 'sidebarImage'));
    }

    /**
     * Upload Image
     * @param $type
     * @return \Illuminate\Http\RedirectResponse
     */
    public function upload($type)
    {
        $method = 'upload_' . $type;

        if (!method_exists($this->image, $method)) {
            return redirect()->back()->with('error', 'Invalid request.');
        }

        try {
            $this->image->$method();

            return redirect()->back()->with('success', 'Image successfully updated.');
        } catch (\Exception $e) {

            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
