<?php
use App\Http\Services\Admin\ImageService;
use Illuminate\Support\Facades\Lang;

/**
 * Get formatted file size
 *
 * @param $bytes
 *
 * @return string
 */
function getFileSize($bytes)
{
    switch ($bytes):
        case ($bytes >= 1073741824):
            $bytes = number_format($bytes / 1073741824, 2).' GB';
            break;
        case ($bytes >= 1048576):
            $bytes = number_format($bytes / 1048576, 2).' MB';
            break;
        case ($bytes >= 1024):
            $bytes = number_format($bytes / 1024, 2).' KB';
            break;
        case ($bytes > 1):
            $bytes = $bytes.' bytes';
            break;
        case ($bytes == 1):
            $bytes = $bytes.' byte';
            break;
    endswitch;

    return $bytes;
}

/**
 * Get Country Flag url
 *
 * @param string $code
 *
 * @return string
 */
function getFlagUrl($code = '')
{
    if ($code != '') {
        $code = strtolower($code).'.png';
    }

    return sprintf("https://raw.githubusercontent.com/younginnovations/country-flags/master/png250px/%s", $code);
}


/**
 * echo array or object key
 *
 * @param      $arrayOrObject
 * @param      $key
 * @param null $default
 * @param bool $echo
 *
 * @return null
 */
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

/**
 * Get Auth class
 *
 * @return App\Http\Services\AuthService
 */
function auth()
{
    return app('App\Http\Services\AuthService');
}

/**
 * Get Site Config
 *
 * @return App\Http\Services\SiteService
 */
function site()
{
    return app('App\Http\Services\SiteService');
}

/**
 * Search in array
 *
 * @param $arrays
 * @param $field
 * @param $value
 *
 * @return array|null
 */
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
 *
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

/**
 * Show array icon
 *
 * @param      $order
 * @param bool $show
 *
 * @return string
 */
function show_arrow($order, $show = false)
{
    if ($show) {
        return '<i class="fa fa-black   fa-sort-'.$order.'"></i> ';
    }
}

/**
 * @param string $path
 *
 * @return string
 */
function config_path($path = '')
{
    return app()->basePath().'/config'.($path ? '/'.$path : $path);
}

/**
 * Get Country by lang code
 *
 * @param $lang
 *
 * @return string
 */
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

/**
 * get language
 *
 * @param $key
 *
 * @return array
 */
function _l($lang, $key)
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
        $codeList[$key] = _l($path.'.'.$code);
    }

    return $codeList;
}

/**
 * Show search query
 *
 * @param $requestParams
 * @param $filter
 *
 * @return bool
 */
function showSearchQuery($requestParams, $filter)
{
    $intersect = array_intersect_key($requestParams, $filter);
    $q         = isset($intersect['q']) ? $intersect['q'] : '';
    if (count($intersect) <= 1 && $q == '') {
        return true;
    }

    return false;
}

/**
 * Get Page Class Name
 *
 * @return string
 */
function getPageClass()
{
    $path  = (explode('/', trim(app('request')->getPathInfo(), '/')));
    $class = isset($path[0]) ? 'page-'.$path[0] : '';

    return $class;
}

/**
 * Get Language Url
 *
 * @param $code
 *
 * @return string
 */
function lang_url($code)
{
    $query = ['lang' => $code];

    return count(\Request::query()) > 0
        ? \Request::url().'?'.http_build_query(array_merge(\Request::query(), $query))
        : \Request::fullUrl().'?'.http_build_query($query);
}
