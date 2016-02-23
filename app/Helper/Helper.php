<?php

use App\Http\Services\Admin\ImageService;

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
    $data['image']       = $images->getImageUrl('bg');

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


/**
 * Check if the logged in user is super admin.
 * @return bool
 */
function isAdmin()
{
    $auth = app('App\Http\Services\AuthService');
    if (!$auth->guest() AND $auth->user()->email == 'admin@nrgi.app') {
        return true;
    }

    return false;
}