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
$app->get('/', 'Controller@home');
$app->get('/contract', 'Controller@viewContract');
$app->get('/contract/{id}/metadata', 'Controller@documentview');
$app->get('/pdf-text/{id}/page/{page_no}', 'Controller@pdfText');

