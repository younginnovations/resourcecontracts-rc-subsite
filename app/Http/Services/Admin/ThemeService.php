<?php namespace App\Http\Services\Admin;

use App\Http\Models\Theme\Theme;
use Illuminate\Contracts\Filesystem\Factory as Filesystem;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

Class ThemeService
{
    /**
     * @param Request    $request
     * @param Theme      $theme
     * @param Filesystem $filesystem
     * @internal param Filesystem $filesystem
     */
    public function __construct(Request $request, Theme $theme, Filesystem $filesystem)
    {
        $this->request    = $request;
        $this->theme      = $theme;
        $this->filesystem = $filesystem;
        $this->settings   = $this->initSetting();
    }

    /**
     * Get Data for a particular country from the database.
     * @param string $default
     * @return mixed
     */
    public function getSetting($default = '')
    {
        $settings = $this->settings;

        if (!empty($default)) {
            foreach ($settings as $setting) {
                if ($setting['option_key'] == $default) {
                    return $setting['option_value'];
                }
            }

            return null;
        }

        $arr = [];
        foreach ($settings as $set) {
            $arr[$set['option_key']] = $set['option_value'];
        }

        return $arr;
    }

    /**
     * Returns the image.
     * @param $type
     * @return string
     */
    public function getImage($type)
    {
        $image = $this->getSetting($type);
        $type  = ($type == 'bg') ? 'country' : 'country-sidebar';
        $url   = url(sprintf('/images/%s.jpg', $type));

        if (!empty($image) && $this->filesystem->disk('s3')->exists($image)) {
            $url = $this->filesystem->disk('s3')->getDriver()
                                    ->getAdapter()
                                    ->getClient()
                                    ->getObjectUrl(env('AWS_BUCKET'), $image);
        }

        return $url;
    }

    /**
     * write brief description
     * @return mixed
     */
    private function initSetting()
    {
        return $this->theme->select('option_key', 'option_value')->country()->get()->toArray();
    }


    /**
     * write brief description
     * @param $value
     * @return null|string
     * @throws \Exception
     * @internal param $key
     */
    private function getValue($value)
    {
        if ($value instanceof UploadedFile) {

            $value = $this->uploadImage($value);

            return $value;
        }

        return $value;
    }

    /**
     * write brief description
     * @param $inputs
     * @return array
     */
    public function getData($inputs)
    {
        $data = [];
        foreach ($inputs as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $k => $v) {
                    $v = $this->getValue($v);
                    if (!empty($v)) {
                        $data[] = ['key' => $k, 'value' => $v, 'group' => $key];
                    }

                }
            } else {
                $v = $this->getValue($value);
                if (!empty($v)) {
                    $data[] = ['key' => $key, 'value' => $v, 'group' => 'default'];
                }
            }

        }

        return $data;
    }

    /**
     * write brief description
     * @param $data
     * @return bool
     */
    public function saveData($data)
    {
        foreach ($data as $set) {
            $find    = [
                'option_key' => $set['key'],
                'country'    => env('COUNTRY'),
            ];
            $setting = $this->theme->firstOrNew($find);
            $fill    = [
                'option_value' => $set['value'],
                'group'        => $set['group'],
            ];

            $setting->fill($fill);
            $setting->save();

        }

        return true;
    }

    /**
     * Upload Image
     * @param $type
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function uploadImage($type)
    {
        $fileName = md5(uniqid() . microtime()) . '.jpg';
        if (in_array(strtolower($type->getClientOriginalExtension()), ['jpg', 'jpeg', 'png'])) {

            $this->filesystem->disk('s3')->put($fileName, file_get_contents($type), 'public');

            return $fileName;
        }

        throw new \Exception('Invalid file Format. Only jpeg format supported');
    }

    /**
     * write brief description
     * @param bool $force
     * @return int
     */
    public function generateFile($force = false)
    {
        if ($force) {
            $this->settings = $this->initSetting();
        }

        $properties                     = [];
        $properties['primary-color']    = $this->getSetting('primary-color');
        $properties['secondary-color']  = $this->getSetting('secondary-color');
        $properties['sidebar-color']    = $this->getSetting('sidebar-color');
        $properties['background-image'] = $this->getImage('bg');
        $properties['sidebar-image']    = $this->getImage('sidebar');

        return generateCssFile($properties);

    }

}