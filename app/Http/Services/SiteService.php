<?php namespace App\Http\Services;

use App\Http\Services\Admin\ImageService;

/**
 * Class SiteService
 * @package App\Http\Services\SiteService
 */
class SiteService
{
    /**
     * Get Category
     *
     * @return string
     */
    public function getCategory()
    {
        $category = env('CATEGORY', null);

        return strtoupper($category);
    }

    /**
     * Get Site Type
     *
     * @return string
     */
    public function getSiteType()
    {
        if ($this->isCountrySite()) {
            return 'country';
        } else {
            return $this->getCategory();
        }
    }

    /**
     * Get Country Code
     *
     * @return string
     */
    public function getCountryCode()
    {
        $code = env('COUNTRY', null);

        return strtoupper($code);
    }

    /**
     * Determine whether site is country site
     *
     * @return bool
     */
    public function isCountrySite()
    {
        $code      = $this->getCountryCode();
        $countries = trans('country');

        if (!is_null($code) && array_key_exists($code, $countries)) {
            return true;
        }

        return false;
    }

    /**
     * Get Site Meta
     *
     * @param null $property
     *
     * @return object
     */
    public function meta($property = null)
    {
        $key    = $this->getSiteKey();
        $data   = $this->getConfig($key);
        $images = app(ImageService::class);
        $images->setKey($key);
        $data['bgImage'] = $images->getHomePageImageUrl();

        if ($this->isCountrySite()) {
            $this->getCountryDetail();
            $data['name'] = $data['title'];
            $data['flag'] = $data['logo'];
        }

        if (is_null($key)) {
            return (object) $data;
        }

        if (array_key_exists($property, $data)) {
            return $data[$property];
        }

        return null;
    }

    /**
     * Get site config
     *
     * @param $key
     *
     * @return array
     */
    public function getConfig($key)
    {
        return trans(sprintf("meta/%s", $key));
    }

    /**
     * Get Image url for the site
     *
     * @param $img
     *
     * @return string
     */
    public function path($img)
    {
        return url(sprintf('%s/%s', $this->getSiteKey(), $img));
    }

    /**
     * Get Site Key
     *
     * @return string
     */
    public function getSiteKey()
    {
        $key = $this->getCategory();

        if ($this->isCountrySite()) {
            $key = $this->getCountryCode();
        }

        return strtolower($key);
    }

    /**
     * Can download Word file
     *
     * @return bool
     */
    public function canDownloadWordFile()
    {
        return $this->getCategory() != 'olc';
    }

    /**
     * Get Country Detail
     *
     * @return array
     */
    protected function getCountryDetail()
    {
        if (!$this->isCountrySite()) {
            return [];
        }

        $code    = $this->getCountryCode();
        $country = trans('country');

        return [
            'code' => $code,
            'name' => $country[$code],
            'flag' => getFlagUrl($code),
        ];
    }
}
