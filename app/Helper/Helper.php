<?php
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
    $title               = (isset($meta['title']) && $meta['title'] != '') ? ' - '.$meta['title'] : '';
    $description         = (isset($meta['description']) && $meta['description'] != '') ? $meta['description'] : $data['description'];
    $data['title']       = $data['title'].$title;
    $data['description'] = $description;
    $data['category']    = $category;
    //$images              = app(ImageService::class);
    //$data['image']       = $images->getHomePageImageUrl();

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
    $country['name'] = trans('country.'.strtoupper($country['code']));
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
    $seg  = \Request::segments();
    $page = count($seg) > 0 ? $seg[0] : 'home';

    return sprintf('page-%s', $page);
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

/**
 * Determine active menu
 *
 * @param string $url
 *
 * @return bool
 *
 */
function isActiveMenu($url = '')
{
    $seg = \Request::segments();

    if ($url == '' && count($seg) == 0) {
        return true;
    }

    return in_array($url, $seg);
}

/**
 * Get option
 *
 * @param $key
 *
 * @return string|object
 */
function getOption($key)
{
    $option = app()->make('App\Http\Services\Admin\OptionService');

    return $option->get($key);
}

/**
 * Get Text Option
 *
 * @param $key
 *
 * @return string
 */
function getOptionText($key)
{
    $currentLang = app('translator')->getLocale();
    $option      = getOption($key);

    return isset($option->$currentLang) ? $option->$currentLang : '';
}

/**
 * Determine if given string is old OCID
 *
 * @param $ocid
 *
 */
function redirectIfOldOCID($old)
{
    $string = file_get_contents(base_path('public/ocid_mapping.json'));
    $arr    = json_decode($string, true);
    $new    = isset($arr[$old]) ? $arr[$old] : null;

    if ($new) {
        $url = str_replace($old, $new, \Request::fullUrl());
        header("HTTP/1.1 301 Moved Permanently");
        header(sprintf("Location: %s", $url));
        die;
    }
}

/**
 * Checks for modified annotation category
 *
 * @param $old
 */
function redirectIfOldAnnotationCategory($old)
{
    $oldCategories    = explode('|', $old);
    $newCategories    = [];
    $searchCategories = [];
    $string           = file_get_contents(base_path('public/annotation_category_mapping.json'));
    $arr              = json_decode($string, true);

    foreach ($oldCategories as $oldCategory) {
        if (isset($arr[$oldCategory])) {
            $searchCategories[] = $oldCategory;
            $newCategories[]    = $arr[$oldCategory];
        }
    }

    if (!empty($newCategories)) {
        $url = urldecode(\Request::fullUrl());
        $url = str_replace($searchCategories, $newCategories, $url);
        header("HTTP/1.1 301 Moved Permanently");
        header(sprintf("Location: %s", urldecode($url)));
        die;
    }
}

/**
 * Get resource data such as category
 *
 * @return array
 */
function getResourceMeta()
{
    $resources = [
        'Acacia'                           => ['category' => 'NA',],
        'Aggregates'                       => ['category' => 'Minerals',],
        'Agroindustry'                     => ['category' => 'NA',],
        'Alumina'                          => ['category' => 'Minerals',],
        'Aluminous Clay'                   => ['category' => 'Minerals',],
        'Aluminum'                         => ['category' => 'Minerals',],
        'Amethyst'                         => ['category' => 'Minerals',],
        'Ammonium Sulfate'                 => ['category' => 'Minerals',],
        'Ananas comosus (Pineapple plant)' => ['category' => 'NA',],
        'Antimony'                         => ['category' => 'Minerals',],
        'Arsenic'                          => ['category' => 'Minerals',],
        'Asbestos'                         => ['category' => 'Minerals',],
        'Attapulgite'                      => ['category' => 'Minerals',],
        'Bananas'                          => ['category' => 'NA',],
        'Barite'                           => ['category' => 'Minerals',],
        'Base metals'                      => ['category' => 'Minerals',],
        'Bauxite'                          => ['category' => 'Minerals',],
        'Bauxite-Aluminum'                 => ['category' => 'Minerals',],
        'Bentonite'                        => ['category' => 'Minerals',],
        'Beryl'                            => ['category' => 'Minerals',],
        'Beryllium'                        => ['category' => 'Minerals',],
        'Biofuels'                         => ['category' => 'NA',],
        'Bismuth'                          => ['category' => 'Minerals',],
        'Bituminous coal'                  => ['category' => 'Minerals',],
        'Borates'                          => ['category' => '',],
        'Boron'                            => ['category' => '',],
        'Brown coal'                       => ['category' => 'Minerals',],
        'Cadmium'                          => ['category' => 'Minerals',],
        'Caesium'                          => ['category' => 'Minerals',],
        'Calcium Carbonate'                => ['category' => '',],
        'Calcrete'                         => ['category' => '',],
        'Castor oil (Ricinus communis)'    => ['category' => 'NA',],
        'Cereal crops'                     => ['category' => 'NA',],
        'Cerium'                           => ['category' => 'Minerals',],
        'Chromite'                         => ['category' => 'Minerals',],
        'Chromium'                         => ['category' => 'Minerals',],
        'Chrysoprase'                      => ['category' => '',],
        'Citrus'                           => ['category' => 'NA',],
        'Clay'                             => ['category' => 'Minerals',],
        'Coal'                             => ['category' => 'Minerals',],
        'Cobalt'                           => ['category' => 'Minerals',],
        'Coffee'                           => ['category' => 'NA',],
        'Coke'                             => ['category' => '',],
        'Coked coal'                       => ['category' => '',],
        'Concentrated coking Coal'         => ['category' => '',],
        'Copper'                           => ['category' => 'Minerals',],
        'Corundum'                         => ['category' => 'Minerals',],
        'Cotton'                           => ['category' => 'NA',],
        'Coltan'                           => ['category' => 'Minerals',],
        'Diamonds'                         => ['category' => 'Minerals',],
        'Diatomite'                        => ['category' => '',],
        'Dolomite'                         => ['category' => 'Minerals',],
        'Dysprosium'                       => ['category' => '',],
        'Emerald'                          => ['category' => 'Minerals',],
        'Erbium'                           => ['category' => '',],
        'Eucalyptus'                       => ['category' => 'NA',],
        'Europium'                         => ['category' => '',],
        'Felspar'                          => ['category' => 'Minerals',],
        'Ferrochrome'                      => ['category' => 'Minerals',],
        'Ferromanganese'                   => ['category' => 'Minerals',],
        'Ferromolybdenum'                  => ['category' => 'Minerals',],
        'Ferronickel'                      => ['category' => 'Minerals',],
        'Ferroniobium'                     => ['category' => 'Minerals',],
        'Ferrosilicon'                     => ['category' => 'Minerals',],
        'Ferrotitanium'                    => ['category' => 'Minerals',],
        'Ferrotungsten'                    => ['category' => 'Minerals',],
        'Ferrovanadium'                    => ['category' => 'Minerals',],
        'Fluorite (fluorspar)'             => ['category' => 'Minerals',],
        'Fluorspar'                        => ['category' => 'Minerals',],
        'Food crops'                       => ['category' => 'NA',],
        'Fossil coal'                      => ['category' => '',],
        'Frac Sand'                        => ['category' => '',],
        'Gadolinium'                       => ['category' => '',],
        'Gallium'                          => ['category' => '',],
        'Garnet'                           => ['category' => '',],
        'Gas'                              => ['category' => 'Minerals',],
        'Germanium'                        => ['category' => '',],
        'Gold'                             => ['category' => 'Minerals',],
        'Grain legumes (Pulses)'           => ['category' => 'NA',],
        'Granite'                          => ['category' => 'Minerals',],
        'Graphite'                         => ['category' => 'Minerals',],
        'Groundnuts'                       => ['category' => 'NA',],
        'Gypsum'                           => ['category' => 'Minerals',],
        'Hafnium'                          => ['category' => '',],
        'Heavy Mineral Sands'              => ['category' => 'Minerals',],
        'Heavy Rare Earths and Yttrium'    => ['category' => '',],
        'Hematite'                         => ['category' => 'Minerals',],
        'Holmium'                          => ['category' => 'Minerals',],
        'Hydrocarbons'                     => ['category' => 'Hydrocarbons',],
        'Ilmenite'                         => ['category' => 'Minerals',],
        'Indium'                           => ['category' => '',],
        'Iodine'                           => ['category' => '',],
        'Iridium'                          => ['category' => '',],
        'Iron'                             => ['category' => 'Minerals',],
        'Iron Ore'                         => ['category' => 'Minerals',],
        'Iron Sand'                        => ['category' => '',],
        'Jade'                             => ['category' => 'Minerals',],
        'Jatropha curcas'                  => ['category' => 'NA',],
        'Kaolin'                           => ['category' => '',],
        'Lanthanides'                      => ['category' => '',],
        'Lanthanum'                        => ['category' => '',],
        'Lead'                             => ['category' => 'Minerals',],
        'Leucoxene'                        => ['category' => 'Minerals',],
        'Light Rare Earths'                => ['category' => 'Minerals',],
        'Lime'                             => ['category' => 'Minerals',],
        'Lime Sands'                       => ['category' => 'Minerals',],
        'Limestone'                        => ['category' => 'Minerals',],
        'Lithium'                          => ['category' => 'Minerals',],
        'Lutetium'                         => ['category' => '',],
        'Magnesite'                        => ['category' => 'Minerals',],
        'Magnesium'                        => ['category' => 'Minerals',],
        'Magnesium Chloride'               => ['category' => '',],
        'Magnetite'                        => ['category' => 'Minerals',],
        'Maize (Corn)'                     => ['category' => 'NA',],
        'Manganese'                        => ['category' => 'Minerals',],
        'Manganese Ore'                    => ['category' => 'Minerals',],
        'Marble'                           => ['category' => 'Minerals',],
        'Medicinal plants'                 => ['category' => 'NA',],
        'Mercury'                          => ['category' => 'Minerals',],
        'Metallurgical/Coking Coal'        => ['category' => 'Minerals',],
        'Methane'                          => ['category' => 'Minerals',],
        'Mica'                             => ['category' => 'Minerals',],
        'Molybdenum'                       => ['category' => 'Minerals',],
        'Monazite'                         => ['category' => '',],
        'Neodymium'                        => ['category' => '',],
        'Nickel'                           => ['category' => 'Minerals',],
        'Nickel Pig Iron'                  => ['category' => '',],
        'Niobium'                          => ['category' => '',],
        'Not Specified'                    => ['category' => 'Minerals',],
        'Oil'                              => ['category' => '',],
        'Oil crops'                        => ['category' => 'NA',],
        'Oil palm or palm oils'            => ['category' => 'NA',],
        'Oil palm products'                => ['category' => 'NA',],
        'Oilseeds'                         => ['category' => 'NA',],
        'Opal'                             => ['category' => '',],
        'Osmium'                           => ['category' => '',],
        'Other crops'                      => ['category' => 'NA',],
        'Other Minerals'                   => ['category' => 'Minerals',],
        'Palladium'                        => ['category' => 'Minerals',],
        'Palm oil'                         => ['category' => 'NA',],
        'Perlite'                          => ['category' => '',],
        'Phosphate'                        => ['category' => 'Minerals',],
        'Platinum'                         => ['category' => 'Minerals',],
        'Platinum Group Metals'            => ['category' => 'Minerals',],
        'Potash'                           => ['category' => 'Minerals',],
        'Potassium Chloride'               => ['category' => 'Minerals',],
        'Potassium Nitrate'                => ['category' => 'Minerals',],
        'Potassium Oxide'                  => ['category' => 'Minerals',],
        'Potassium Sulfate'                => ['category' => 'Minerals',],
        'Praseodymium'                     => ['category' => '',],
        'Promethium'                       => ['category' => '',],
        'Pyrite'                           => ['category' => '',],
        'Quarried products'                => ['category' => '',],
        'Rare Earth Elements'              => ['category' => 'Minerals',],
        'Rhenium'                          => ['category' => 'Minerals',],
        'Rhodium'                          => ['category' => 'Minerals',],
        'Rice'                             => ['category' => 'NA',],
        'Rice products'                    => ['category' => 'NA',],
        'Rubber'                           => ['category' => 'NA',],
        'Rubber products'                  => ['category' => 'NA',],
        'Rubidium'                         => ['category' => '',],
        'Ruby'                             => ['category' => 'Minerals',],
        'Ruthenium'                        => ['category' => '',],
        'Rutile'                           => ['category' => 'Minerals',],
        'Safflower'                        => ['category' => 'NA',],
        'Salt'                             => ['category' => 'Minerals',],
        'Samarium'                         => ['category' => '',],
        'Sandstone'                        => ['category' => 'Minerals',],
        'Sapphire'                         => ['category' => 'Minerals',],
        'Scandium'                         => ['category' => '',],
        'Scheelite'                        => ['category' => '',],
        'Selenium'                         => ['category' => '',],
        'Semi-coked Coal'                  => ['category' => '',],
        'Sesame'                           => ['category' => 'NA',],
        'Silica'                           => ['category' => 'Minerals',],
        'Silica Sand'                      => ['category' => 'Minerals',],
        'Silicomanganese'                  => ['category' => '',],
        'Silver'                           => ['category' => 'Minerals',],
        'Sodium Bicarbonate'               => ['category' => '',],
        'Sodium Carbonate'                 => ['category' => '',],
        'Sodium Sulfate'                   => ['category' => '',],
        'Sorghum'                          => ['category' => 'NA',],
        'Soy'                              => ['category' => 'NA',],
        'Soybeans (Soya beans)'            => ['category' => 'NA',],
        'Spodumene'                        => ['category' => '',],
        'Steel'                            => ['category' => 'Minerals',],
        'Strontium'                        => ['category' => '',],
        'Sugar'                            => ['category' => 'NA',],
        'Sugarcane'                        => ['category' => 'NA',],
        'Sulfur'                           => ['category' => '',],
        'Sulfuric Acid'                    => ['category' => '',],
        'Synthetic Rutile'                 => ['category' => '',],
        'Talc'                             => ['category' => '',],
        'Tantalum'                         => ['category' => 'Minerals',],
        'Tanzanite'                        => ['category' => 'Minerals',],
        'Tea'                              => ['category' => 'NA',],
        'Teak (Tectona grandis)'           => ['category' => 'NA',],
        'Tellurium'                        => ['category' => '',],
        'Terbium'                          => ['category' => '',],
        'Theobroma cacao (Cocoa plant)'    => ['category' => 'NA',],
        'Thermal Coal'                     => ['category' => 'Minerals',],
        'Thorium'                          => ['category' => '',],
        'Thulium'                          => ['category' => '',],
        'Timber'                           => ['category' => 'NA',],
        'Timber (Wood)'                    => ['category' => 'NA',],
        'Tin'                              => ['category' => 'Minerals',],
        'Titanium'                         => ['category' => 'Minerals',],
        'Titanium Sponge'                  => ['category' => 'Minerals',],
        'Topaz'                            => ['category' => 'Minerals',],
        'Tungsten'                         => ['category' => 'Minerals',],
        'Uranium (U3O8)'                   => ['category' => 'Minerals',],
        'Value-added crops'                => ['category' => 'NA',],
        'Vanadium'                         => ['category' => '',],
        'Vermiculite'                      => ['category' => '',],
        'Wollastonite'                     => ['category' => '',],
        'Ytterbium'                        => ['category' => '',],
        'Yttrium'                          => ['category' => '',],
        'Zeolites'                         => ['category' => '',],
        'Zinc'                             => ['category' => 'Minerals',],
        'Zinc-Lead'                        => ['category' => 'Minerals',],
        'Zircon'                           => ['category' => 'Minerals',],
        'Zirconium'                        => ['category' => '',],
    ];
    foreach ($resources as $key => $data) {
        $resources[strtolower($key)] = $data;
        unset($resources[$key]);
    }
    return $resources;
}