<?php
/*
|--------------------------------------------------------------------------
| Home
|--------------------------------------------------------------------------
|
*/
$app->get('/', ['as' => 'home', 'uses' => 'SiteController@home']);
$app->get('/health', function () {
    return 'Healthy';
});

/*
|--------------------------------------------------------------------------
| Country
|--------------------------------------------------------------------------
|
*/
if (!site()->isCountrySite()) {
    $app->get('countries', ['as' => 'countries', 'uses' => 'CountryController@index']);
    $app->get('countries/{key}', ['as' => 'country.detail', 'uses' => 'CountryController@detail']);
}

/*
|--------------------------------------------------------------------------
| Resource
|--------------------------------------------------------------------------
|
*/
$app->get('resources', ['as' => 'resources', 'uses' => 'ResourceController@index']);
$app->get('resource/{key}', ['as' => 'resource.detail', 'uses' => 'ResourceController@detail']);

/*
|--------------------------------------------------------------------------
| Robots.txt
|--------------------------------------------------------------------------
|
*/
$app->get('robots.txt', ['as' => 'robots.txt', 'uses' => 'SiteController@robots']);

/*
|--------------------------------------------------------------------------
| Site Map
|--------------------------------------------------------------------------
|
*/
$app->get('sitemap', ['as' => 'sitemap', 'uses' => 'SiteController@sitemap']);

/*
|--------------------------------------------------------------------------
| Contract Pages
|--------------------------------------------------------------------------
|
*/
$app->group(
    ['namespace' => 'App\Http\Controllers\Contract'],
    function () use ($app) {
        $app->get('contracts', ['as' => 'contracts', 'uses' => 'ContractController@index']);
        $app->get('contract/countries', ['as' => 'contract.countries', 'uses' => 'ContractController@getCountries']);
        $app->get('contract/resources', ['as' => 'contract.resources', 'uses' => 'ContractController@getResources']);
        $app->get('contract/{id}', ['as' => 'contract.view', 'uses' => 'ContractController@detail']);
        $app->get('contract/{id}/pages', ['as' => 'contract.pages', 'uses' => 'ContractController@pageIndex']);
        $app->get(
            'contract/{id}/page/{page_no}',
            ['as' => 'contract.page.detail', 'uses' => 'ContractController@pageDetail']
        );
        $app->get(
            'contract/{id}/download/word',
            ['as' => 'contract.download', 'uses' => 'ContractController@download']
        );
        $app->get(
            'contract/{id}/download/pdf',
            ['as' => 'contract.download.pdf', 'uses' => 'ContractController@downloadPdf']
        );
        $app->get(
            'contracts/download/csv',
            ['as' => 'contract.metadata.download', 'uses' => 'ContractController@downloadMetadataAsCSV']
        );
        $app->get(
            'contract/{id}/download/annotations',
            ['as' => 'contract.annotations.download', 'uses' => 'ContractController@downloadAnnotations']
        );
        $app->get('contract/{id}/view', ['as' => 'contract.detail', 'uses' => 'ContractController@view']);
        $app->get(
            'contract/{contract_id}/popup/{annotation_id}',
            ['as' => 'contract.popup', 'uses' => 'ContractController@popup']
        );
    }
);

$app->get('search', ['as' => 'search', 'uses' => 'FilterController@index']);
$app->get('search/group', ['as' => 'search/group', 'uses' => 'FilterController@gIndex']);
$app->get('search/recent', ['as' => 'search/recent', 'uses' => 'FilterController@recentIndex']);
$app->get(
    'contracts/download/searchresult',
    ['as' => 'contract.csv.download', 'uses' => 'FilterController@downloadSearchResultAsCSV']
);
/*
|--------------------------------------------------------------------------
| Static Pages
|--------------------------------------------------------------------------
|
*/
$app->get('about', ['as' => 'about', 'uses' => 'PageController@about']);
$app->get('contact', ['as' => 'contact', 'uses' => 'PageController@contact']);
$app->get('faqs', ['as' => 'faqs', 'uses' => 'PageController@faqs']);
$app->get('guides', ['as' => 'guides', 'uses' => 'PageController@guides']);
$app->get('page/resources', ['as' => 'page.resources', 'uses' => 'PageController@resources']);
$app->get('glossary', ['as' => 'glossary', 'uses' => 'PageController@glossary']);
$app->get('country-sites', ['as' => 'country-sites', 'uses' => 'PageController@countrySites']);
$app->get('how-to-use', ['as' => 'how-to-use', 'uses' => 'PageController@howToUse']);
$app->get('research-and-analysis', ['as' => 'research-and-analysis', 'uses' => 'PageController@researchAndAnalysis']);


/*
|--------------------------------------------------------------------------
| Download Pages
|--------------------------------------------------------------------------
|
*/
$app->get('guides/download', ['as' => 'guides.download', 'uses' => 'PageController@guidesDownload']);





/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
|
*/
$app->group(
    ['namespace' => 'App\Http\Controllers\Admin'],
    function () use ($app) {
        $app->get('login', ['as' => 'login', 'uses' => 'AuthController@login']);
        $app->post('login', ['as' => 'login.post', 'uses' => 'AuthController@loginPost']);
        $app->get('logout', ['as' => 'logout', 'uses' => 'AuthController@logout']);
        $app->post('page/save', ['as' => 'page', 'uses' => 'PageController@update']);
    }
);

/*
|--------------------------------------------------------------------------
| Log
|--------------------------------------------------------------------------
|
*/
$app->group(
    ['namespace' => '\Rap2hpoutre\LaravelLogViewer', 'middleware' => 'user'],
    function () use ($app) {
        $app->get('admin/logs', 'LogViewerController@index');
    }
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
|
*/
$app->group(
    ['namespace' => 'App\Http\Controllers\Admin', 'prefix' => 'admin'],
    function () use ($app) {
        $app->get('/', ['as' => 'admin.dashboard', 'uses' => 'PageController@index']);
        $app->get('image', ['as' => 'admin.image', 'uses' => 'ImageController@index']);
        $app->post('image/upload/{type}', ['as' => 'admin.image.upload', 'uses' => 'ImageController@upload']);

        $app->get('link', ['as' => 'admin.link', 'uses' => 'LinkController@index']);
        $app->post('link', ['as' => 'admin.link.update', 'uses' => 'LinkController@update']);

        $app->get('text', ['as' => 'admin.text', 'uses' => 'TextController@index']);
        $app->post('text', ['as' => 'admin.text.update', 'uses' => 'TextController@update']);

        $app->get('partner', ['as' => 'admin.partner', 'uses' => 'PartnerController@index']);
        $app->get('partner/create', ['as' => 'admin.partner.create', 'uses' => 'PartnerController@create']);
        $app->post('partner', ['as' => 'admin.partner.store', 'uses' => 'PartnerController@store']);
        $app->delete('partner', ['as' => 'admin.partner.delete', 'uses' => 'PartnerController@delete']);

        $app->get('language', ['as' => 'admin.language', 'uses' => 'LanguageController@index']);
        $app->post('language', ['as' => 'admin.language.update', 'uses' => 'LanguageController@update']);

        $app->get('page', ['as' => 'admin.page', 'uses' => 'PageController@index']);
        $app->get('page/create', ['as' => 'admin.page.create', 'uses' => 'PageController@create']);
        $app->post('page/store', ['as' => 'admin.page.store', 'uses' => 'PageController@store']);
        $app->get('page/{id}', ['as' => 'admin.page.edit', 'uses' => 'PageController@edit']);
        $app->post('page/{id}', ['as' => 'admin.page.update', 'uses' => 'PageController@update']);
        $app->delete('page/{id}', ['as' => 'admin.page.delete', 'uses' => 'PageController@delete']);
        $app->post('version/{id}', ['as' => 'admin.version.edit', 'uses' => 'PageController@versionUpdate']);
        $app->delete('page/{id}/version/{version}', ['as' => 'admin.page.version.delete', 'uses' => 'PageController@deleteVersion']);
        $app->get('/cache-clear', ['as' => 'cache.clear', 'uses' => 'PageController@cacheClear']);

        $app->get('research-and-analysis/background-image/edit', ['as' => 'admin.research-and-analysis.edit-background-image', 'uses' => 'ResearchAndAnalysisController@editBackgroundImage']);
        $app->post('research-and-analysis/background-image', ['as' => 'admin.research-and-analysis.store-background-image', 'uses' => 'ResearchAndAnalysisController@storeBackgroundImage']);
        $app->get('research-and-analysis', ['as' => 'admin.research-and-analysis.index', 'uses' => 'ResearchAndAnalysisController@index']);
        $app->get('research-and-analysis/create', ['as' => 'admin.research-and-analysis.create', 'uses' => 'ResearchAndAnalysisController@create']);
        $app->post('research-and-analysis', ['as' => 'admin.research-and-analysis.store', 'uses' => 'ResearchAndAnalysisController@store']);
        $app->get('research-and-analysis/{id}/edit', ['as' => 'admin.research-and-analysis.edit', 'uses' => 'ResearchAndAnalysisController@edit']);
        $app->put('research-and-analysis/{id}', ['as' => 'admin.research-and-analysis.update', 'uses' => 'ResearchAndAnalysisController@update']);
        $app->delete('research-and-analysis/{id}', ['as' => 'admin.research-and-analysis.delete', 'uses' => 'ResearchAndAnalysisController@delete']);
        $app->get('research-and-analysis/featured', ['as' => 'admin.research-and-analysis.get-featured', 'uses' => 'ResearchAndAnalysisController@getFeatured']);
        $app->post('research-and-analysis/featured', ['as' => 'admin.research-and-analysis.update-featured', 'uses' => 'ResearchAndAnalysisController@updateFeatured']);
        $app->post('research-and-analysis/configuration', ['as' => 'admin.research-and-analysis.text-configuration', 'uses' => 'ResearchAndAnalysisController@updateHeadingText']);
        $app->get('research-and-analysis/configuration', ['as' => 'admin.research-and-analysis.text-configuration', 'uses' => 'ResearchAndAnalysisController@editHeadingText']);
    }
);

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/
$app->group(
    ['namespace' => 'App\Http\Controllers\Contract', 'prefix' => 'api'],
    function () use ($app) {
        $app->get('contract/{id}/text', 'ApiController@text');
        $app->get('contract/{id}/searchtext', 'ApiController@searchText');
        $app->get('contract/{id}/annotations/search', 'ApiController@annotationSearch');
    }
);
/*
 * ----------------------------------------------------------------------------------
 * Clipping
 * ----------------------------------------------------------------------------------
*/
if (site()->isClipEnabled()) {
    $app->group(
        ['prefix' => 'clip', 'namespace' => 'App\Http\Controllers'],
        function () use ($app) {
            $app->get('/', ['as' => 'clip.index', 'uses' => 'ClippingController@index']);
            $app->get('annotations', ['as' => 'api.annotation', 'uses' => 'ClippingController@getAllAnnotations']);
            $app->get('download', ['as' => 'clip.download', 'uses' => 'ClippingController@downloadAnnotations']);
            $app->get(
                'xls-download',
                [
                    'as'   => 'clip.download-xls',
                    'uses' =>
                        'ClippingController@downloadXls',
                ]
            );
            $app->get('api', ['as' => 'clip.api', 'uses' => 'ClippingController@getClippedData']);
            $app->get('{key}', ['as' => 'clip.view', 'uses' => 'ClippingController@clipView']);
            $app->post('save', ['as' => 'clip.save', 'uses' => 'ClippingController@saveClip']);
            $app->post('zip', ['as' => 'clip.zip', 'uses' => 'ClippingController@getZipFile']);
        }
    );
}

$app->post('clip/email', ['as' => 'clip.email', 'uses' => 'ClippingController@emailClip']);
