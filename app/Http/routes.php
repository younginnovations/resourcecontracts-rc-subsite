<?php

/*
|--------------------------------------------------------------------------
| SITE Routes
|--------------------------------------------------------------------------
|
*/
$app->get('/', ['as' => 'home', 'uses' => 'SiteController@home']);
if (!site()->isCountrySite()) {
    $app->get('/countries', ['as' => 'countries', 'uses' => 'CountryController@index']);
    $app->get('/countries/{key}', ['as' => 'country.detail', 'uses' => 'CountryController@detail']);
}
$app->get('/resources', ['as' => 'resources', 'uses' => 'ResourceController@index']);
$app->get('/resource/{key}', ['as' => 'resource.detail', 'uses' => 'ResourceController@detail']);
$app->get('/sitemap', ['as' => 'sitemap', 'uses' => 'SiteController@sitemap']);

$app->group(
    ['namespace' => '\Rap2hpoutre\LaravelLogViewer'],
    function () use ($app) {
        $app->get(getUserIP().'/logs', 'LogViewerController@index');
    }
);
/*
|--------------------------------------------------------------------------
| Contract Pages
|--------------------------------------------------------------------------
|
*/

$app->get('/contracts', ['as' => 'contracts', 'uses' => 'ContractController@index']);
$app->get('contract/countries', ['as' => 'contract.countries', 'uses' => 'ContractController@getCountries']);
$app->get('contract/resources', ['as' => 'contract.resources', 'uses' => 'ContractController@getResources']);
$app->get('/contract/{id}', ['as' => 'contract.view', 'uses' => 'ContractController@detail']);
$app->get('/contract/{id}/pages', ['as' => 'contract.pages', 'uses' => 'ContractController@pageIndex']);
$app->get('/contract/{id}/page/{page_no}', ['as' => 'contract.page.detail', 'uses' => 'ContractController@pageDetail']);
$app->get('/contract/{id}/download/word', ['as' => 'contract.download', 'uses' => 'ContractController@download']);
$app->get('/contract/{id}/download/pdf', ['as' => 'contract.download.pdf', 'uses' => 'ContractController@downloadPdf']);
$app->get(
    '/contracts/download/searchresult',
    ['as' => 'contract.csv.download', 'uses' => 'FilterController@downloadSearchResultAsCSV']
);
$app->get(
    '/contracts/download/csv',
    ['as' => 'contract.metadata.download', 'uses' => 'ContractController@downloadMetadataAsCSV']
);
$app->get(
    '/contract/{id}/download/annotations',
    ['as' => 'contract.annotations.download', 'uses' => 'ContractController@downloadAnnotations']
);
$app->get('/contract/{id}/view', ['as' => 'contract.detail', 'uses' => 'ContractController@view']);
$app->get(
    'contract/{contract_id}/popup/{annotation_id}',
    ['as' => 'contract.popup', 'uses' => 'ContractController@popup']
);
$app->get('search', ['as' => 'search', 'uses' => 'FilterController@index']);
$app->get('filter', ['as' => 'filter', 'uses' => 'SiteController@filter']);

/*
|--------------------------------------------------------------------------
| Static Pages
|--------------------------------------------------------------------------
|
*/
$app->get('about', ['as' => 'about', 'uses' => 'PageController@about']);
$app->get('contact', ['as' => 'contact', 'uses' => 'PageController@contact']);
$app->get('faqs', ['as' => 'faqs', 'uses' => 'PageController@faqs']);
$app->get('guides', ['as' => 'page.resources', 'uses' => 'PageController@resources']);
$app->get('page/resources', ['as' => 'page.resources', 'uses' => 'PageController@resources']);
$app->get('glossary', ['as' => 'guides', 'uses' => 'PageController@glossary']);
$app->get('publish-contracts', ['as' => 'publish-contracts', 'uses' => 'PageController@publishContracts']);

/*
|--------------------------------------------------------------------------
| CMS Routes
|--------------------------------------------------------------------------
|
*/
$app->get('login', ['as' => 'login', 'uses' => 'Admin\AuthController@login']);
$app->post('login', ['as' => 'login.post', 'uses' => 'Admin\AuthController@loginPost']);
$app->get('logout', ['as' => 'logout', 'uses' => 'Admin\AuthController@logout']);

$app->post('page/save', ['as' => 'page', 'uses' => 'Admin\PageController@update']);
$app->get('admin', ['as' => 'admin.dashboard', 'uses' => 'Admin\PageController@index']);

$app->get('admin/image', ['as' => 'admin.image', 'uses' => 'Admin\ImageController@index']);
$app->post('admin/image/upload/{type}', ['as' => 'admin.image.upload', 'uses' => 'Admin\ImageController@upload']);

$app->get('admin/link', ['as' => 'admin.link', 'uses' => 'Admin\LinkController@index']);
$app->post('admin/link', ['as' => 'admin.link.update', 'uses' => 'Admin\LinkController@update']);

$app->get('admin/text', ['as' => 'admin.text', 'uses' => 'Admin\TextController@index']);
$app->post('admin/text', ['as' => 'admin.text.update', 'uses' => 'Admin\TextController@update']);

$app->get('admin/partner', ['as' => 'admin.partner', 'uses' => 'Admin\PartnerController@index']);
$app->get('admin/partner/create', ['as' => 'admin.partner.create', 'uses' => 'Admin\PartnerController@create']);
$app->post('admin/partner', ['as' => 'admin.partner.store', 'uses' => 'Admin\PartnerController@store']);
$app->delete('admin/partner', ['as' => 'admin.partner.delete', 'uses' => 'Admin\PartnerController@delete']);

$app->get('admin/page', ['as' => 'admin.page', 'uses' => 'Admin\PageController@index']);
$app->get('admin/page/create', ['as' => 'admin.page.create', 'uses' => 'Admin\PageController@create']);
$app->post('admin/page/store', ['as' => 'admin.page.store', 'uses' => 'Admin\PageController@store']);
$app->get('admin/page/{id}', ['as' => 'admin.page.edit', 'uses' => 'Admin\PageController@edit']);
$app->post('admin/page/{id}', ['as' => 'admin.page.update', 'uses' => 'Admin\PageController@update']);
$app->delete('admin/page/{id}', ['as' => 'admin.page.delete', 'uses' => 'Admin\PageController@delete']);
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/
$app->get('contract/{id}/page', ['as' => 'contract.page.get', 'uses' => 'Contract\PageController@getText']);
$app->get('contract/{id}/allpage', ['as' => 'contract.allpage.get', 'uses' => 'Contract\PageController@getAllText']);
$app->post('contract/{id}/search', ['as' => 'contract.page.search', 'uses' => 'Contract\PageController@search']);
$app->get(
    'annotation/search',
    ['as' => 'contract.page.annotations.search', 'uses' => 'Contract\PageController@annotations']
);
$app->get('api/search', ['as' => 'api.search', 'uses' => 'Contract\PageController@annotations']);

$app->get('api/contract/{id}/metadata', 'Contract\ApiController@metadata');
$app->get('api/contract/{id}/text', 'Contract\ApiController@text');
$app->get('api/contract/{id}/annotations', 'Contract\ApiController@annotations');
$app->get('api/contract/{id}/searchtext', 'Contract\ApiController@searchText');
$app->get('api/contract/{id}/annotations/search', 'Contract\ApiController@annotationSearch');

/*
 * ----------------------------------------------------------------------------------
 * Clipping Routes
 * ----------------------------------------------------------------------------------
*/
if (site()->isClipEnabled()) {
    $app->get('clip', ['as' => 'clip.index', 'uses' => 'ClippingController@index']);
    $app->get('/clip/annotations', ['as' => 'api.annotation', 'uses' => 'ClippingController@getAllAnnotations']);
    $app->get('/clip/download', ['as' => 'clip.download', 'uses' => 'ClippingController@downloadAnnotations']);
    $app->get('clip/api', ['as' => 'clip.api', 'uses' => 'ClippingController@getClippedData']);
    $app->get('clip/{key}', ['as' => 'clip.view', 'uses' => 'ClippingController@clipView']);
    $app->post('clip/email', ['as' => 'clip.email', 'uses' => 'ClippingController@emailClip']);
    $app->post('/clip/save', ['as' => 'clip.save', 'uses' => 'ClippingController@saveClip']);
    $app->post('clip/zip', ['as' => 'clip.zip', 'uses' => 'ClippingController@getZipFile']);
}
