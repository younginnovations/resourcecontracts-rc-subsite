<?php
if (empty($meta)) {
    $meta = null;
}
$langSelect = trans('search.select');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{{ meta($meta)->description }}"/>
    <meta name="robots" content="noodp"/>
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="{{ meta($meta)->title }}"/>
    <meta property="og:image" content="{{ meta($meta)->image }}" />
    <meta property="og:description" content="{{ meta($meta)->description }}"/>
    <meta property="og:url" content="{{ \Illuminate\Support\Facades\Request::url() }}"/>
    <meta name="twitter:title" content="{{ meta($meta)->title }}"/>
    <meta name="twitter:image" content="{{ meta($meta)->image }}"/>

    @if(env("CATEGORY")=="rc")
        <link rel="icon" href="{{url('images/favicon.ico')}}">
    @else
        <link rel="icon" href="{{url('images/olc/favicon.ico')}}">
    @endif


    <title> {{ meta($meta)->title }}</title>
    <link href="{{url('css/homepage.min.css')}}" rel="stylesheet">

    <link href="{{url('css/style.min.css')}}" rel="stylesheet">
    {{--<link rel="stylesheet" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css">--}}

    @yield('css')
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>

    <![endif]-->
    <script>
        var langSelect = '{{$langSelect}}';
        var app_url = '{{ url()}}';
    </script>
</head>

<body data-spy="scroll" class="lang-{{$lang->getCurrentLang()}} {{getPageClass()}}" dir="{{$lang->getDirection()}}" lang="{{$lang->getCurrentLang()}}">
<div id="wrapper">
    <div id="page-wrapper" class="not-front sidebar-collapse-container">