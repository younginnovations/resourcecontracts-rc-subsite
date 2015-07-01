<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
$app->get('/', ['as' => 'home', 'uses' => 'SiteController@home']);
$app->get('/contract/{id}', ['as' => 'contract.detail', 'uses' => 'SiteController@show']);
$app->get('/contract/{id}/page/{page_no}', ['as' => 'contract.page.detail', 'uses' => 'SiteController@page']);
$app->get('/contract/{id}/pages', ['as' => 'contract.pages', 'uses' => 'SiteController@pages']);
$app->get('/filter', ['as' => 'filter', 'uses' => 'SiteController@filter']);
$app->get('/search', ['as' => 'search', 'uses' => 'SiteController@search']);
$app->get('contract/{id}/page', ['as' => 'contract.page.get', 'uses' => 'Page\PageController@getText']);
$app->post('contract/{id}/search', ['as' => 'contract.page.search', 'uses' => 'Page\PageController@search']);
$app->get('api/search', ['as' => 'contract.page.annotations.search', 'uses' => 'Page\PageController@annotations']);
$app->get('contract/{contractId1}/{contractId2}/compare', ['as' => 'contracts.compare', 'uses' => 'SiteController@compare']);

