<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Resource Contracts</title>
    <?php
    $css = [
            'bootstrap.min.css',
            'metisMenu.min.css',
            'timeline.css',
            'sb-admin-2.css',
            'style_old.css',
            'style.css',
            'morris.css',
            'font-awesome.min.css'
    ];
    ?>
    @foreach($css as $link)
        <link href="{{url(sprintf('css/%s',$link))}}" rel="stylesheet">
    @endforeach

    @yield('css')

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div id="wrapper">
    <div id="page-wrapper" class="not-front sidebar-collapse-container">