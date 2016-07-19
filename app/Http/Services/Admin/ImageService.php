<?php namespace App\Http\Services\Admin;

use Illuminate\Contracts\Filesystem\Factory as Filesystem;
use Illuminate\Http\Request;

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
     *
     * @param        $type
     * @param string $ext
     *
     * @return string
     * @internal param $type
     */
    function getName($type, $ext = 'jpg')
    {
        $fileName = site()->getSiteKey().'/'.$type.'.'.$ext;

        return $fileName;
    }

    /**
     * Upload Background Image.
     * @return bool
     * @throws \Exception
     */
    function upload_favicon()
    {
        $type                 = 'favicon';
        $details              = [];
        $details['fileName']  = $this->getName($type, 'ico');
        $details['minWidth']  = 9;
        $details['minHeight'] = 5;

        return $this->upload($details);
    }

    /**
     * Upload Main Background Image.
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
     * Upload Intro Section Background Image.
     * @return bool
     * @throws \Exception
     */
    function upload_intro_bg()
    {
        $type                 = 'intro_bg';
        $details              = [];
        $details['fileName']  = $this->getName($type);
        $details['minWidth']  = 1024;
        $details['minHeight'] = 200;

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
     *
     * @return bool
     * @throws \Exception
     */
    function upload($details)
    {
        if ($this->request->hasFile('image') && $this->request->file('image')->isValid()) {
            if (in_array(
                strtolower($this->request->file('image')->getClientOriginalExtension()),
                ['jpg', 'jpeg', 'png', 'gif', 'ico']
            )) {
                $fileName = $details['fileName'];
                list($width, $height) = getimagesize($this->request->file('image'));

                if ($width >= $details['minWidth'] && $height >= $details['minHeight']) {
                    return $this->filesystem->disk('s3')->put(
                        $fileName,
                        file_get_contents($this->request->file('image')),
                        'public'
                    );
                } else {
                    throw new \Exception(sprintf('Invalid image size (%sX%s px).', $width, $height));
                }
            }

            throw new \Exception('Invalid file Format. Only jpeg format supported');
        }

        throw new \Exception('Please upload image');
    }

    /**
     * Get Image URL.
     *
     * @param        $type
     * @param string $ext
     *
     * @return mixed
     */
    public function getImageUrl($type, $ext = 'jpg')
    {
        $url = '';
        if ($this->filesystem->disk('s3')->exists($this->getName($type, $ext))) {
            $url = $this->filesystem->disk('s3')->getDriver()
                                    ->getAdapter()
                                    ->getClient()
                                    ->getObjectUrl(env('AWS_BUCKET'), $this->getName($type, $ext));
        }

        return $url;
    }
}