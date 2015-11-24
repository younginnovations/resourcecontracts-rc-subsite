<?php namespace App\Http\Services\Admin;

use Illuminate\Contracts\Filesystem\Factory as Filesystem;
use Illuminate\Http\Request;

/**
 * Class ImageService
 * @package App\Http\Services\Admin
 */
class ImageService
{
    protected $minWidth = 960;
    protected $minHeight = 500;
    /**
     * @var Request
     */
    protected $request;
    /**
     * @var Filesystem
     */
    protected $filesystem;

    /**
     * @param Request    $request
     * @param Filesystem $filesystem
     */
    public function __construct(Request $request, Filesystem $filesystem)
    {
        $this->request = $request;
        $this->filesystem = $filesystem;
    }

    /**
     * Get Bg Image Name
     *
     * @return string
     */
    function getName()
    {
        $fileName = env('CATEGORY') . '-bg.jpg';

        return $fileName;
    }

    /**
     * Upload Image
     *
     * @return bool
     * @throws \Exception
     */
    function upload()
    {
        if ($this->request->hasFile('image') && $this->request->file('image')->isValid()) {
            if (in_array(strtolower($this->request->file('image')->getClientOriginalExtension()) , ['jpg','jpeg'])) {
                $fileName = $this->getName();
                list($width, $height) = getimagesize($this->request->file('image'));

                if ($width >= $this->minWidth && $height >= $this->minHeight) {
                    $this->filesystem->disk('s3')->put($fileName, file_get_contents($this->request->file('image')), 'public');
                }else{
                    throw new \Exception(sprintf('Invalid image size (%sX%s px).',$width, $height));
                }

               return true;
            }

            throw new \Exception('Invalid file Format. Only jpeg format supported');
        }

        throw new \Exception('Please upload image');
    }

    /**
     * Get Home Page Background Image Url
     *
     * @return string
     */
    public function getHomePageImageUrl()
    {
        return $this->filesystem->disk('s3')->getDriver()
                                ->getAdapter()
                                ->getClient()
                                ->getObjectUrl(env('AWS_BUCKET'), $this->getName());
    }
}
