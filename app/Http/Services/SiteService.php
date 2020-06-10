<?php namespace App\Http\Services;

use App\Http\Services\Admin\ImageService;

/**
 * Class SiteService
 * @package App\Http\Services\SiteService
 */
class SiteService
{
    /**
     * @var ImageService
     */
    protected $image;

    /**
     * SiteService constructor.
     *
     * @param ImageService $image
     */
    public function __construct(ImageService $image)
    {
        $this->image = $image;
    }

    /**
     * Get Category
     *
     * @return string
     */
    public function getCategory()
    {
        $category = $this->getEnv('CATEGORY');

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
            return strtolower($this->getCategory());
        }
    }

    /**
     * Determine if site has category
     *
     * @param $category
     *
     * @return bool
     */
    public function isCategory($category)
    {
        return (strtolower($category) == strtolower($this->getCategory()));
    }

    /**
     * Get Country Code
     *
     * @return string
     */
    public function getCountryCode()
    {
        $code = $this->getEnv('COUNTRY');

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
     * Check for OLC site
     *
     * @return bool
     */
    public function isOLC()
    {
        return ($this->getSiteType() == 'olc');
    }

    /**
     * Check for RC site
     *
     * @return bool
     */
    public function isRC()
    {
        return ($this->getSiteType() == 'rc');
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
        $key = $this->getSiteType();

        if ($this->isCountrySite() && $this->hasConfigFile($this->getCountryCode())) {
            $key = $this->getCountryCode();
        }

        $data = $this->getConfig($key);

        if ($this->isCountrySite()) {
            $country       = $this->getCountryDetail();
            $data['title'] = $data['name'] = isset($data['name']) ? $data['name'] : $country['name'];
            $data['logo']  = $country['flag'];
            $data['about'] = str_replace(':name', $data['name'], $data['about']);
            $data['type']  = 'Open Land';

            if ($this->isCategory('rc')) {
                $data['type']    = 'Resource';
                $data['tagline'] = str_replace(':name', $data['name'], $data['tag_line_rc']);
            } elseif ($this->isCategory('olc')) {
                $data['tagline'] = str_replace(':name', $data['name'], $data['tag_line_olc']);
            }
        }

        // dd($data);
        if (is_null($property)) {
            return (object) $data;
        }

        if (array_key_exists($property, $data)) {
            return $data[$property];
        }

        return null;
    }

    /**
     * Returns new meta tag
     *
     * @param null $property
     *
     * @return mixed|object|null
     */
    public function newMeta($property = null)
    {
        $data = $this->getConfig($this->getSiteType());

        if ($this->isCategory('rc')) {
            $data['new_tag_line'] = str_replace(':name', $data['name'], $data['tag_line_rc']);
            $data['new_tag_line'] = str_replace(':name', $data['name'], $data['tag_line_rc']);
        } elseif ($this->isCategory('olc')) {
            $data['new_tag_line'] = str_replace(':name', $data['name'], $data['tag_line_olc']);
            $data['new_tag_line'] = str_replace(':name', $data['name'], $data['tag_line_olc']);
        }

        if (is_null($property)) {
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
        return trans(sprintf("meta/%s", strtolower($key)));
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
     * Determine site has tracking code.
     *
     * @return bool
     */
    public function hasTracking()
    {
        return ($this->getTrackingCode() != '') ? true : false;
    }

    /**
     * Get Tracking code
     *
     * @return string|null
     */
    public function getTrackingCode()
    {
        return $this->getEnv('TRACKING_ID');
    }

    /**
     * Get Env value;
     *
     * @param $env
     *
     * @return null|string
     *
     */
    public function getEnv($env)
    {
        return trim(env($env, null));
    }

    /**
     * Get Elastic Search Url.
     *
     * @return null|string
     */
    public function esUrl()
    {
        return $this->getEnv('ELASTIC_SEARCH_HOST');
    }

    /**
     * Get Contact Email
     *
     * @return null|string
     */
    public function contactEmail()
    {
        return $this->getEnv('CONTACT_MAIL');
    }

    /**
     * Get Site image.
     *
     * @param        $type
     * @param string $ext
     *
     * @return string
     */
    public function getImageUrl($type, $ext = 'jpg')
    {
        return $this->image->getImageUrl($type, $ext);
    }

    /**
     * Get Admin Api Url.
     *
     * @return string
     */
    public function adminApiUrl()
    {
        return trim($this->getEnv('ADMIN_API_URL'), '/');
    }

    /**
     * Get route for form action
     *
     * @param [string] $path
     * @return {route}
     */
    public function getCurrentPath($path)
    {
        switch($path){
			case 'search/group':
				$url = url('search/group');
			break;
			case 'search/recent':
				$url = url('search/recent');
            break;
            case 'search':
				$url = url('search');
			break;
			default:
				$url = url('search/group');
        }
        
        return $url;
    }

    /**
     * Get array of links for group and recent page with queries
     *
     * @param [string] $path
     * @param [string] $fullUrl
     * @return array
     */
    public function createAllAndRecentDocsLink($path, $fullUrl)
    {
        $queries = '';

        if (($pos = strpos($fullUrl, "?")) !== FALSE) { 
            $queries = substr($fullUrl, $pos+1); 
        }

        if($path == 'search/group'){
            $link['group'] = $fullUrl;
            $recent = 'search/recent?'.$queries;
            $link['recent'] = url($recent);

            return $link;
        }

        $link['recent'] = $fullUrl;
        $group = 'search/group?'.$queries;
        $link['group'] = url($group);

        return $link;
    }

    /**
     * Determine if clip is on or not
     *
     * @return bool
     */
    function isClipEnabled()
    {
        return (config('clip') == true);
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

    /**
     * Determine if config file is exist or not
     *
     * @param $key
     *
     * @return bool
     */
    protected function hasConfigFile($key)
    {
        $config = $this->getConfig($key);

        return is_string($config) ? false : true;
    }
}
