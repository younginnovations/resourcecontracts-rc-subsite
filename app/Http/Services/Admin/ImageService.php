<?php namespace App\Http\Services\Admin;

use Illuminate\Contracts\Filesystem\Factory as Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

/**
 * Class ImageService
 * @package App\Http\Services\Admin
 */
class ImageService
{
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
        $this->request    = $request;
        $this->filesystem = $filesystem;
    }


    /**
     * Get Image Name
     * @param $type
     * @return string
     * @internal param $type
     */
    function getName($type)
    {
        $fileName = env('CATEGORY') . '-' . $type . '.jpg';

        return $fileName;
    }


    /**
     * Upload Background Image.
     * @return bool
     * @throws \Exception
     */
    function upload_bg()
    {
        $type                 = 'bg';
        $details              = [];
        $details['fileName']  = $this->getName($type);
        $details['minWidth']  = 960;
        $details['minHeight'] = 500;

        return $this->upload($details);

    }


    /**
     * Upload Sidebar Image.
     * @return bool
     * @throws \Exception
     */
    function upload_sidebar()
    {
        $type                 = 'sidebar';
        $details              = [];
        $details['fileName']  = $this->getName($type);
        $details['minWidth']  = 200;
        $details['minHeight'] = 100;

        return $this->upload($details);

    }


    /**
     * Upload Image
     *
     * @param $details
     * @return bool
     * @throws \Exception
     */
    function upload($details)
    {

        if ($this->request->hasFile('image') && $this->request->file('image')->isValid()) {

            if (in_array(strtolower($this->request->file('image')->getClientOriginalExtension()), ['jpg', 'jpeg', 'png'])) {
                $fileName = $details['fileName'];
                list($width, $height) = getimagesize($this->request->file('image'));

                if ($width >= $details['minWidth'] && $height >= $details['minHeight']) {
                    $this->filesystem->disk('s3')->put($fileName, file_get_contents($this->request->file('image')), 'public');
                } else {
                    throw new \Exception(sprintf('Invalid image size (%sX%s px).', $width, $height));
                }

                return true;
            }

            throw new \Exception('Invalid file Format. Only jpeg format supported');
        }

        throw new \Exception('Please upload image');
    }


    /**
     * Get Homepage Background Image and Sidebar Image.
     * @param $type
     * @return mixed
     */
    public function getImageUrl($type)
    {
        return $this->filesystem->disk('s3')->getDriver()
                                ->getAdapter()
                                ->getClient()
                                ->getObjectUrl(env('AWS_BUCKET'), $this->getName($type));
    }

}
