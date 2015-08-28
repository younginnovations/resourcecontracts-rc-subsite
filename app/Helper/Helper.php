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
        $code = $code . '.png';
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

