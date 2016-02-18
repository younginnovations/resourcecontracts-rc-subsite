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
        $code = strtolower($code) . '.png';
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
 * @return \Laravel\Lumen\Application|mixed
 */
function auth()
{
    return app('App\Http\Services\AuthService');
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
        return '<i class="fa fa-black   fa-sort-' . $order . '"></i> ';
    }
}

/**
 * Get site Meta
 *
 * @param null $meta
 *
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
 *
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
 * @param string $path
 *
 * @return string
 */
function config_path($path = '')
{
    return app()->basePath() . '/config' . ($path ? '/' . $path : $path);
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
    if (Lang::has($lang . '.' . $key)) {

        return Lang::get($lang . '.' . $key);
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

/**
 * Get Country Detail
 *
 * @param null $key
 *
 * @return array
 */
function get_country($key = null)
{
    $countryCode     = env('COUNTRY');
    $country         = [];
    $country['code'] = strtolower($countryCode);
    $country['name'] = trans('country.' . strtoupper($country['code']));
    $country['flag'] = sprintf(
        "https://raw.githubusercontent.com/younginnovations/country-flags/master/png250px/%s.png",
        $country['code']
    );

    return array_key_exists($key, $country) ? $country[$key] : $country;
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
    $class = isset($path[0]) ? 'page-' . $path[0] : '';

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
        ? \Request::url() . '?' . http_build_query(array_merge(\Request::query(), $query))
        : \Request::fullUrl() . '?' . http_build_query($query);
}

/**
 * Determine if clip is on or not
 * @return bool
 */
function isClipOn()
{
    return (config('clip') == true) ? true : false;
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

/**
 * Get name of current logged in user.
 * @return mixed
 */
function loggedInUser()
{
    $auth = app('App\Http\Services\AuthService');
    if (!$auth->guest()) {
        return $auth->user()->name;
    }

}

/**
 * write brief description
 *
 * @param null $key
 *
 * @return mixed
 */
function getDefaultThemeProperties($key = null)
{
    $themeService = app('App\Http\Services\Admin\ThemeService');

    $theme        = $themeService->getSetting();
    $bgImage      = $themeService->getImage('bg');
    $sidebarImage = $themeService->getImage('sidebar');

    $properties['primary-color']    = (!empty($theme['primary-color'])) ? $theme['primary-color'] : '#0096E0';
    $properties['secondary-color']  = (!empty($theme['secondary-color'])) ? $theme['secondary-color'] : '#00AAFF';
    $properties['sidebar-color']    = (!empty($theme['sidebar-color'])) ? $theme['sidebar-color'] : '#181D11';
    $properties['background-image'] = (!empty($bgImage)) ? $bgImage : '../../images/country.jpg';
    $properties['sidebar-image']    = (!empty($sidebarImage)) ? $sidebarImage : '../../images/country-sidebar.jpg';
    $properties['footer-text']      = (!empty($theme['footer-text'])) ? $theme['footer-text'] : 'This site provides summaries of contracts and their terms to facilitate understanding of important provisions in the documents. These summaries are not interpretations of the documents. Neither the summaries nor the full contracts are complete accounts of all legal obligations related to the projects in question. This site also includes document text that was created automatically; such text may contain errors and differences from the original PDF files. No warranty is made to the accuracy of any content on this website.';

    return array_key_exists($key, $properties) ? $properties[$key] : $properties;
}

/**
 * This function generates the theme-color.css file.
 *
 * @param $properties
 *
 * @return int
 */
function generateCssFile($properties)
{
    $cssTemplateFile = base_path().'/public/css/country-template';
    $outputFile      = base_path().'/public/css/theme-color.css';
    $templateFile    = file_get_contents($cssTemplateFile);

    $updatedContents = str_replace('{primary-color}', $properties['primary-color'], $templateFile);
    $updatedContents = str_replace('{secondary-color}', $properties['secondary-color'], $updatedContents);
    $updatedContents = str_replace('{sidebar-color}', $properties['sidebar-color'], $updatedContents);
    $updatedContents = str_replace('{background-image}', $properties['background-image'], $updatedContents);
    $updatedContents = str_replace('{sidebar-image}', $properties['sidebar-image'], $updatedContents);

    $newFile = file_put_contents($outputFile, $updatedContents);

    return $newFile;

}
