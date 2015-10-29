<?php
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
 * @return string
 */
function appendInUrl($route, $url, $sortby)
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
 * get full url
 *
 * @return string
 */
function current_url()
{
    $current_url = \Illuminate\Support\Facades\Input::url();
    $queries     = \Illuminate\Support\Facades\Input::get();
    $current_url .= "?";
    $current_url .= (http_build_query($queries) == '') ? '' : http_build_query($queries);

    return $current_url;
}

/**
 * get contract csv download url
 *
 * @return string
 */
function download_url()
{
    $url     = route('contract.metadata.download');
    $queries = \Illuminate\Support\Facades\Input::get();
    $url .= "?";
    $url .= (http_build_query($queries) == '') ? '' : http_build_query($queries);

    return $url;
}