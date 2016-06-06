<?php
if (empty($meta)) {
    $meta = null;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
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
    <link href="{{url('css/main.min.css')}}" rel="stylesheet">
    <link href="{{url('css/'.meta()->category.'-style.css')}}" rel="stylesheet">

    @yield('css')
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <script>
        var app_url = '{{ url()}}';
    </script>
    <![endif]-->
</head>
<body data-spy="scroll" class="lang-{{$lang->getCurrentLang()}}" dir="{{$lang->getDirection()}}" lang="{{$lang->getCurrentLang()}}">
<div id="wrapper">
    <div id="page-wrapper" class="not-front sidebar-collapse-container">