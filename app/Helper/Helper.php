<?php

use App\Http\Services\Admin\ImageService;
use Illuminate\Support\Facades\Lang;

/**
 * Get formatted file size
 * @param $bytes
 * @return string
 */
function getFileSize($bytes)
{
    switch ($bytes):
        case ($bytes >= 1073741824):
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
            break;
        case ($bytes >= 1048576):
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
            break;
        case ($bytes >= 1024):
            $bytes = number_format($bytes / 1024, 2) . ' KB';
            break;
        case ($bytes > 1):
            $bytes = $bytes . ' bytes';
            break;
        case ($bytes == 1):
            $bytes = $bytes . ' byte';
            break;
    endswitch;

    return $bytes;
}

function getFlagUrl($code = '')
{
    if ($code != '') {
        $code = strtolower($code) . '.png';
    }

    return sprintf("https://raw.githubusercontent.com/younginnovations/country-flags/master/png250px/%s", $code);
}


function _e($arrayOrObject, $key, $default = null, $echo = false)
{
    $return = $default;
    if (is_array($arrayOrObject) && array_key_exists($arrayOrObject, $key)) {
        $return = $arrayOrObject[$key];
    }

    if (is_object($arrayOrObject) && property_exists($arrayOrObject, $key)) {
        $return = $arrayOrObject->$key;
    }
    if (empty($return)) {
        $return = $default;
    }

    if ($echo) {
        echo $return;
    } else {
        return $return;
    }

}

function auth()
{
    return app('App\Http\Services\AuthService');
}

function searchInArray($arrays, $field, $value)
{
    foreach ($arrays as $key => $array) {
        $array = (array) $array;
        if ($array[$field] === $value) {
            return $array;
        }
    }

    return null;
}

/**
 * Append sortby and order in url
 *
 * @param $url
 * @param $sortby
 * @param $order
 * @return string
 */
function appendInUrl($route, $url, $sortby, $order)
{
    if (isset($url['sortby']) && $url['sortby'] == $sortby && isset($url['order']) && $url['order'] == "asc") {
        $url['order'] = "desc";
    } else {
        $url["order"] = "asc";
    }
    $url["sortby"] = $sortby;


    return route($route, $url);

}

function show_arrow($order, $show = false)
{
    if ($show) {
        return '<i class="fa fa-black   fa-sort-' . $order . '"></i> ';
    }
}

/**
 * write brief description
 * @param null $meta
 * @return object
 */
function meta($meta = null)
{
    $category            = env('CATEGORY');
    $data                = trans("meta/$category");
    $title               = (isset($meta['title']) && $meta['title'] != '') ? ' - ' . $meta['title'] : '';
    $description         = (isset($meta['description']) && $meta['description'] != '') ? $meta['description'] : $data['description'];
    $data['title']       = $data['title'] . $title;
    $data['description'] = $description;
    $data['category']    = $category;
    $images              = app(ImageService::class);
    $data['image']       = $images->getHomePageImageUrl();

    return (object) $data;


}

/**
 * @param $key
 * @return array
 */
function getInformation($key = null)
{
    $information[] = [];
    $site          = env('CATEGORY');

    $information['categoryTitle']        = $site == 'olc' ? ' OpenLandContracts.org ' : ' ResourceContracts.org ';
    $information['countriesDescription'] = trans(sprintf('meta/%s.countries_description', $site));
    $information['countryDescription']   = trans(sprintf('meta/%s.country_description', $site));
    $information['resourcesDescription'] = trans(sprintf('meta/%s.resources_description', $site));
    $information['resourceDescription']  = trans(sprintf('meta/%s.resource_description', $site));


    return array_key_exists($key, $information) ? $information[$key] : $information;
}


if (!function_exists('config_path')) {
    /**
     * write brief description
     * @param string $path
     * @return string
     */
    function config_path($path = '')
    {
        return app()->basePath() . '/config' . ($path ? '/' . $path : $path);
    }


    function getCountryByLang($lang)
    {
        $languages = config('language');
        foreach ($languages as $key => $value) {
            if ($lang == $key) {
                return getFlagUrl($value['country_code']);
            }
        }

        return getFlagUrl('us');
    }

    function get_country($key = null)
    {
        $countryCode     = env('COUNTRY');
        $country         = [];
        $country['code'] = strtolower($countryCode);
        $country['name'] = trans('country.' . strtoupper($country['code']));
        $country['flag'] = sprintf("https://raw.githubusercontent.com/younginnovations/country-flags/master/png250px/%s.png", $country['code']);

        return array_key_exists($key, $country) ? $country[$key] : $country;
    }


    /**
     * get language
     *
     * @param $key
     * @return array
     */
    function _l($lang,$key)
    {
        if (Lang::has($lang.'.'.$key)) {

            return Lang::get($lang.'.'.$key);
        }


        return $key;
    }


    /**
     * Trans Array List
     *
     * @param array $codeList
     * @param       $path
     *
     * @return array
     */
    function trans_array(array $codeList, $path)
    {
        foreach ($codeList as $key => $code) {
            $codeList[$key] = _l($path . '.' . $code);
        }

        return $codeList;
    }

    function showSearchQuery($requestParams, $filter)
    {
        $intersect = array_intersect_key($requestParams, $filter);
        $q         = isset($intersect['q']) ? $intersect['q'] : '';
        if (count($intersect) <= 1 && $q == '') {
            return true;
        }

        return false;
    }

}

/**
 * Get Page Class Name
 *
 * @return string
 */
function getPageClass()
{
    $path = (explode('/', trim(app('request')->getPathInfo(), '/')));
    $class = isset($path[0]) ? 'page-'.$path[0] : '';

    return $class;
}

