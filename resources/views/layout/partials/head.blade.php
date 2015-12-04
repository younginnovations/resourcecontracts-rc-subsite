<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @if(env("CATEGORY")=="rc")
    <link rel="icon" href="{{url('images/favicon.ico')}}">
    <title>Resource Contracts</title>
    @else
    <link rel="icon" href="{{url('images/olc/favicon.ico')}}">
    <title>OPENLAND Contracts</title>
    @endif
    <link href="{{url('css/main.min.css')}}" rel="stylesheet">
    @if(env("CATEGORY")=="rc")
    <link href="{{url('css/rc-style.css')}}" rel="stylesheet">
    @endif
    @if(env("CATEGORY")=="olc")
    <link href="{{url('css/olc-style.css')}}" rel="stylesheet">
    @endif
    @yield('css')
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <script>
        var app_url = '{{ url()}}';
    </script>
    <![endif]-->
</head>
<body data-spy="scroll">
<div id="wrapper">
    <div id="page-wrapper" class="not-front sidebar-collapse-container">