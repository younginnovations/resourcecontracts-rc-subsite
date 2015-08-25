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
$app->get('/contract/{id}', ['as' => 'contract.detail', 'uses' => 'ContractController@detail']);
$app->get('/contract/{id}/pages', ['as' => 'contract.pages', 'uses' => 'ContractController@pageIndex']);
$app->get('/contract/{id}/page/{page_no}', ['as' => 'contract.page.detail', 'uses' => 'ContractController@pageDetail']);
$app->get('contract/{contractId1}/{contractId2}/compare', ['as' => 'contracts.compare', 'uses' => 'ContractController@PageCompare']);

/*
|--------------------------------------------------------------------------
| Static Pages
|--------------------------------------------------------------------------
|
*/
$app->get('about', ['as' => 'about', 'uses' => 'PageController@about']);
$app->get('contact', ['as' => 'contact', 'uses' => 'PageController@contact']);
$app->get('faqs', ['as' => 'faqs', 'uses' => 'PageController@faqs']);



$app->get('/search', ['as' => 'search', 'uses' => 'FilterController@index']);
$app->get('/filter', ['as' => 'filter', 'uses' => 'SiteController@filter']);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/
$app->get('contract/{id}/page', ['as' => 'contract.page.get', 'uses' => 'Contract\PageController@getText']);
$app->post('contract/{id}/search', ['as' => 'contract.page.search', 'uses' => 'Contract\PageController@search']);
$app->get('annotation/search', ['as' => 'contract.page.annotations.search', 'uses' => 'Contract\PageController@annotations']);

