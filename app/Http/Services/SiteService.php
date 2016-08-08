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

        return trim(strtoupper($category));
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
            $key = 'country';
        }

        return strtolower($key);
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
            $country      = $this->getCountryDetail();
            $data['code'] = $country['code'];
            $data['name'] = $country['name'];
            $data['tagline'] = str_replace(':name', $country['name'], $data['tagline']);
            $data['logo'] = $country['flag'];
            $data['title'] = $country['name'];
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
     * Can download Word file
     *
     * @return bool
     */
    public function canDownloadWordFile()
    {
        return !$this->isOLC();
    }

    /**
     * Determine whether to annotation link.
     *
     * @return bool
     */
    public function showAnnotationLink()
    {
        return $this->isRC();
    }

    /**
     * Determine to show land matrix
     *
     * @return bool
     */
    public function showLandMatrix()
    {
        return !$this->isOLC();
    }

    /**
     * Determine OLC site
     *
     * @return bool
     */
    public function isOLC()
    {
        return $this->getCategory() == "olc";
    }

    /**
     * Determine RC site.
     *
     * @return bool
     */
    public function isRC()
    {
        return $this->getCategory() == 'rc';
    }

    /**
     * Get Country Detail
     *
     * @return array
     */
    public function getCountryDetail()
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

    /**
     * Contract Email
     *
     * @return string
     */
    public function contactEmail()
    {
        return trim(env('CONTACT_MAIL'));
    }

    /**
     * Admin email.
     *
     * @return string
     */
    public function adminEmail()
    {
        return trim(env('ADMIN_EMAIL'));
    }

    /**
     * From Email.
     *
     * @return string
     */
    public function fromEmail()
    {
        return trim(env('FROM_EMAIL'));
    }

    /**
     * Determine to show Amla url
     *
     * @return bool
     */
    public function showAmlaUrl()
    {
        return $this->isRC();
    }

}
