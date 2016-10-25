<?php namespace App\Http\Services\Admin;

use Aws\CloudFront\Exception\Exception;
use Illuminate\Contracts\Filesystem\Factory as Filesystem;
use Illuminate\Http\Request;

/**
 * Class PartnerService
 * @package App\Http\Services\Admin
 */
class PartnerService
{
    /**
     * @var string
     */
    protected $key = 'partner';
    /**
     * @var OptionService
     */
    private $option;

    /**
     * @param Request    $request
     * @param Filesystem $filesystem
     */
    public function __construct(Request $request, Filesystem $filesystem, OptionService $option)
    {
        $this->request    = $request;
        $this->filesystem = $filesystem;
        $this->option     = $option;
    }

    /**
     * Get all partner
     *
     * @return array|null|string
     */
    public function all()
    {
        $partners = $this->option->get($this->key);

        if (is_null($partners)) {
            $partners = [];
        }

        foreach ($partners as &$partner) {
            $partner->id    = md5($partner->image);
            $partner->image = $this->getImageUrl($partner->image);
        }

        return $partners;
    }

    /**
     * Get S3 Image.
     *
     * @param $filename
     *
     * @return string
     */
    public function getImageUrl($filename)
    {
        $url = '';
        if ($this->filesystem->disk('s3')->exists($filename)) {
            $url = $this->filesystem->disk('s3')->getDriver()
                                    ->getAdapter()
                                    ->getClient()
                                    ->getObjectUrl(env('AWS_BUCKET'), $filename);
        }

        return $url;
    }


    /**
     * Add partner
     *
     * @param $link
     * @param $fileInput
     *
     * @return \App\Http\Models\Option\Option|bool
     * @throws \Exception
     *
     */
    public function add($link, $fileInput)
    {
        $filename = $this->getFileName();
        $filename = $this->uploadToS3($filename, $fileInput);

        if ($filename != '') {
            $partner   = $this->option->get($this->key, true);
            $partner[] = [
                'link'  => $link,
                'image' => $filename,
            ];

            return $this->option->update($this->key, $partner);
        }

        return false;
    }


    /**
     * Get Image File name
     *
     * @return string
     */
    function getFileName()
    {
        return 'partners/'.str_random(5).'.jpg';
    }

    /**
     * Upload Image
     *
     * @param $filename
     * @param $fileInput
     *
     * @return bool
     * @throws \Exception
     */
    function uploadToS3($filename, $fileInput)
    {
        $details = [
            'fileName'  => $filename,
            'minWidth'  => 280,
            'minHeight' => 170,
        ];

        $validExt = ['jpg', 'jpeg', 'png'];
        if ($this->request->hasFile($fileInput) && $this->request->file($fileInput)->isValid()) {
            if (in_array(strtolower($this->request->file($fileInput)->getClientOriginalExtension()), $validExt)) {
                $fileName = $details['fileName'];
                list($width, $height) = getimagesize($this->request->file($fileInput));

                if ($width >= $details['minWidth'] && $height >= $details['minHeight']) {
                    $this->filesystem->disk('s3')->put(
                        $fileName,
                        file_get_contents($this->request->file($fileInput)),
                        'public'
                    );
                } else {
                    throw new \Exception(sprintf('Invalid image size (%sX%s px).', $width, $height));
                }

                return $details['fileName'];
            }

            throw new \Exception('Invalid file Format. Only '.join(', ', $validExt).' format supported');
        }

        throw new \Exception('Please upload image');
    }

    /**
     * Delete partner
     *
     * @param $image
     *
     * @return bool
     */
    public function delete($image)
    {
        $partners = $this->option->get($this->key, true);
        foreach ($partners as $key => $partner) {
            if (md5($partner['image']) == $image) {
                if ($this->removeFromS3($partner['image'])) {
                    unset($partners[$key]);
                    $this->option->update($this->key, $partners);

                    return true;
                }

                return false;

            }
        }

        return false;
    }

    /**
     * Remove Image from s3
     *
     * @param $image
     *
     * @return bool
     */
    protected function removeFromS3($image)
    {
        try {
            return $this->filesystem->disk('s3')->delete($image);
        } catch (\League\Flysystem\FileNotFoundException $e) {
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}