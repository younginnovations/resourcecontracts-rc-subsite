<?php


/*
|--------------------------------------------------------------------------
| SITE Routes
|--------------------------------------------------------------------------
|
*/
$app->get('/', ['as' => 'home', 'uses' => 'SiteController@home']);
$app->get('/countries', ['as' => 'countries', 'uses' => 'CountryController@index']);
$app->get('/countries/{key}', ['as' => 'country.detail', 'uses' => 'CountryController@detail']);
$app->get('/resources', ['as' => 'resources', 'uses' => 'ResourceController@index']);
$app->get('/resource/{key}', ['as' => 'resource.detail', 'uses' => 'ResourceController@detail']);

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
$app->get('/contract/{contractId1}/{contractId2}/oldcompare', ['as' => 'contracts.oldcompare', 'uses' => 'ContractController@oldcompare']);
$app->get('/contract/{contractId1}/{contractId2}/compare', ['as' => 'contracts.compare', 'uses' => 'ContractController@compare']);
$app->get('/contract/{id}/download', ['as' => 'contract.download', 'uses' => 'ContractController@download']);
$app->get('/contract/{id}/downloadpdf', ['as' => 'contract.download.pdf', 'uses' => 'ContractController@downloadPdf']);
$app->get('/contracts/download/searchresult', ['as' => 'contract.csv.download', 'uses' => 'FilterController@downloadSearchResultAsCSV']);
$app->get('/contracts/download/csv', ['as' => 'contract.metadata.download', 'uses' => 'ContractController@downloadMetadataAsCSV']);
$app->get('/contract/{id}/view', ['as' => 'contract.detail', 'uses' => 'ContractController@view']);

/*
|--------------------------------------------------------------------------
| Static Pages
|--------------------------------------------------------------------------
|
*/
$app->get('about', ['as' => 'about', 'uses' => 'PageController@about']);
$app->get('contact', ['as' => 'contact', 'uses' => 'PageController@contact']);
$app->get('faqs', ['as' => 'faqs', 'uses' => 'PageController@faqs']);
$app->get('page/resources', ['as' => 'page.resources', 'uses' => 'PageController@resources']);
$app->get('glossary', ['as' => 'guides', 'uses' => 'PageController@glossary']);
$app->get('publish-contracts', ['as' => 'publish-contracts', 'uses' => 'PageController@publishContracts']);
$app->get('/search', ['as' => 'search', 'uses' => 'FilterController@index']);
$app->get('/filter', ['as' => 'filter', 'uses' => 'SiteController@filter']);


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
$app->post('admin/image/upload', ['as' => 'admin.image.upload', 'uses' => 'Admin\ImageController@upload']);



$app->get('admin/page', ['as' => 'admin.page', 'uses' => 'Admin\PageController@index']);
$app->get('admin/page/create', ['as' => 'admin.page.create', 'uses' => 'Admin\PageController@create']);
$app->post('admin/page/store', ['as' => 'admin.page.store', 'uses' => 'Admin\PageController@store']);
$app->get('admin/page/{id}', ['as' => 'admin.page.edit', 'uses' => 'Admin\PageController@edit']);
$app->post('admin/page/{id}', ['as' => 'admin.page.update', 'uses' => 'Admin\PageController@update']);
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/
$app->get('contract/{id}/page', ['as' => 'contract.page.get', 'uses' => 'Contract\PageController@getText']);
$app->get('contract/{id}/allpage', ['as' => 'contract.allpage.get', 'uses' => 'Contract\PageController@getAllText']);
$app->post('contract/{id}/search', ['as' => 'contract.page.search', 'uses' => 'Contract\PageController@search']);
$app->get('annotation/search', ['as' => 'contract.page.annotations.search', 'uses' => 'Contract\PageController@annotations']);
$app->get('api/search', ['as' => 'api.search', 'uses' => 'Contract\PageController@annotations']);
