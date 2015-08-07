<?php

/*
|--------------------------------------------------------------------------
| SITE Routes
|--------------------------------------------------------------------------
|
*/
$app->get('/', ['as' => 'home', 'uses' => 'SiteController@home']);
$app->get('/contract/{id}', ['as' => 'contract.detail', 'uses' => 'SiteController@show']);
$app->get('/contract/{id}/page/{page_no}', ['as' => 'contract.page.detail', 'uses' => 'SiteController@getSinglePage']);
$app->get('/contract/{id}/pages', ['as' => 'contract.pages', 'uses' => 'SiteController@getPageList']);
$app->get('contract/{contractId1}/{contractId2}/compare', ['as' => 'contracts.compare', 'uses' => 'SiteController@compare']);
$app->get('/search', ['as' => 'search', 'uses' => 'FilterController@search']);
$app->get('/filter', ['as' => 'filter', 'uses' => 'SiteController@filter']);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/

$app->get('contract/{id}/page', ['as' => 'contract.page.get', 'uses' => 'PageController@getText']);
$app->post('contract/{id}/search', ['as' => 'contract.page.search', 'uses' => 'PageController@search']);
$app->get('annotation/search', ['as' => 'contract.page.annotations.search', 'uses' => 'PageController@annotations']);

