<?php
if (empty($meta)) {
	$meta = [];
}
$langSelect  = trans('search.select');
$title       = (isset($meta['title'])) ? site()->meta('title').' - '.$meta['title'] : site()->meta('title');
$description = (isset($meta['description'])) ? $meta['description'] : site()->meta('description');
$favicon     = site()->getImageUrl('favicon', 'ico');
$gtmID      =  site()->getEnv("GTM_ID");
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>{{$title}}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="{{ $description }}"/>
	<meta name="robots" content="noodp"/>
	<meta property="og:type" content="website"/>
	<meta property="og:title" content="{{ $title }}"/>
	<meta property="og:image" content="{{ site()->getImageUrl('bg')}}"/>
	<meta property="og:description" content="{{ $description}}"/>
	<meta property="og:url" content="{{ Request::url() }}"/>
	<meta name="twitter:title" content="{{ $title }}"/>
	<meta name="twitter:image" content="{{ site()->getImageUrl('bg')}}"/>
	<link rel="icon" href="{{$favicon}}">

	<style>
        @font-face {
            font-family: Open-Sans-Regular;
            font-style: normal;
            font-weight: normal;
            src: url("../../fonts/opensans-regular-webfont.eot?#iefix") format("embedded-opentype"), url("../../fonts/opensans-regular-webfont.woff2") format("woff2"), url("../../fonts/opensans-regular-webfont.woff") format("woff"), url("../../fonts/opensans-regular-webfont.svg#Open-Sans-Regular") format("svg")
        }

        @font-face {
            font-family: Open-Sans-Semibold;
            font-style: normal;
            font-weight: normal;
            src: url("../../fonts/opensans-semibold-webfont.eot?#iefix") format("embedded-opentype"), url("../../fonts/opensans-semibold-webfont.woff2") format("woff2"), url("../../fonts/opensans-semibold-webfont.woff") format("woff"), url("../../fonts/opensans-semibold-webfont.svg#Open-Sans-Semibold") format("svg")
        }

        @font-face {
            font-family: Open-Sans-Bold;
            font-style: normal;
            font-weight: normal;
            src: url("../../fonts/opensans-bold-webfont.eot?#iefix") format("embedded-opentype"), url("../../fonts/opensans-bold-webfont.woff2") format("woff2"), url("../../fonts/opensans-bold-webfont.woff") format("woff"), url("../../fonts/opensans-bold-webfont.svg#Open-Sans-Bold") format("svg")
        }

        @font-face {
            font-family: Open-Sans-Light;
            font-style: normal;
            font-weight: normal;
            src: url("../../fonts/opensans-light-webfont.eot?#iefix") format("embedded-opentype"), url("../../fonts/opensans-light-webfont.woff2") format("woff2"), url("../../fonts/opensans-light-webfont.woff") format("woff"), url("../../fonts/opensans-light-webfont.svg#Open-Sans-Light") format("svg")
        }

        @font-face {
            font-family: Open-Sans-Italic;
            font-style: normal;
            font-weight: normal;
            src: url("../../fonts/opensans-italic.eot?#iefix") format("embedded-opentype"), url("../../fonts/opensans-italic.woff2") format("woff2"), url("../../fonts/opensans-italic.woff") format("woff"), url("../../fonts/opensans-italic.svg#Open-Sans-Italic") format("svg")
        }

        * {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-padding-start: 0;
            margin: 0;
            padding: 0
        }

        *:before,
        *:after {
            -webkit-box-sizing: border-box;
            box-sizing: border-box
        }

        html {
            height: 100%
        }

        body {
            height: 100%;
            font: 1.42857143 14px 'Open-Sans-Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
            color: #404040;
            background: #fff;
            position: relative;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
        }


        a {
            text-decoration: none;
        }

        a:hover,
        a:focus {
            text-decoration: underline;
        }

        p {
            font-size: 12px;
            line-height: 22px
        }

        .pull-left {
            float: left !important
        }


        .trigger {
            background: transparent !important;
            padding: 33px 17px !important;
            border-right: 1px solid rgba(216, 216, 216, 0.5) !important;
            cursor: pointer;
        }

        @media all and (min-width: 480px) {
            .trigger {
                padding: 33px 20px !important;
            }
        }

        .trigger:before {
            background: url(../../images/ic_sprite.svg) no-repeat 0 0;
            content: "";
            display: block;
            height: 16px;
            width: 26px;
        }

        .navbar-header {
            display: flex;
        }

        .navbar-static-top {
            z-index: 1000;
            border-width: 0 0 1px
        }

        .navbar-brand,
        .navbar-brand:hover {
            color: #404040;
            float: left;
            height: 50px;
            padding: 15px 15px;
            font-size: 18px;
            line-height: 20px
        }

        .navbar-brand i {
            font-style: normal;
        }

        nav.navbar {
            -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 0;
            margin-bottom: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            position: relative;
            min-height: 50px;
            margin-bottom: 20px;
            align-items: center;
        }

        .front-row-top-wrap nav.navbar {
            border-bottom: 0 !important;
            -webkit-box-shadow: none;
            box-shadow: none;
        }

        .navbar:before,
        .navbar:after {
            display: none !important;
        }

        .navbar-brand,
        .navbar-brand:hover {
            color: #404040;
            font-size: 19px;
            font-family: Open-Sans-Bold;
            text-transform: uppercase;
            height: auto;
            position: relative;
            padding: 0 20px 0 0;
            margin: 21px 15px
        }

        .navbar-brand span {
            color: #404040;
            display: block;
        }

        .country .navbar-brand span {
            display: block;
            color: rgba(64, 64, 64, 0.7);
        }

        .guide-link {
            padding: 0 12px 8px;
            text-align: right;
        }

        .guide-link a {
            color: #404040;
            font-size: 14px;
            text-transform: uppercase;
        }

        .navbar-right {
            border: 0!important;
            padding-left: 0!important;
            padding-right: 15px;
            align-items: center;
        }

        .navbar-right ul {
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0;
            margin-right: 10px;
            width: 90px;
        }


        .navbar-right ul li {
            list-style: none;
            margin-right: 4px;
        }

        .navbar-right ul li a {
            color: #404040;
            cursor: pointer;
            font-size: 14px;
            padding: 2px 6px;
            text-transform: uppercase;
        }

        .navbar-right ul li a:hover {
            color: #000;
            text-decoration: none;
        }

        .navbar-right ul li a.active {
            border-radius: 4px;
            color: #fff;
            font-family: Open-Sans-Semibold;
        }

        .not-front .navbar-right {
            border-left: 1px solid #e7e9eb;
            padding-left: 30px;
            padding-right: 0;
        }

        .not-front .navbar-right .form-group {
            margin-bottom: 0;
            width: 100%;
        }

        #wrapper {
            padding-left: 0;
            -webkit-transition: all .5s ease;
            transition: all .5s ease;
            width: 100%;
        }

        #sidebar-wrapper {
            background-image: linear-gradient(-81deg, #291212 1%, #40302c 100%);
            top: 0
        }

        .sidebar-nav {
            position: absolute;
            top: 0;
            width: 280px;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .sidebar-nav li {
            color: #aaa;
            line-height: normal;
            text-indent: inherit;
        }

        .sidebar-nav li a {
            display: block;
            text-decoration: none;
            color: #999;
            padding: 18px 14px 18px 32px;
            color: #fff;
        }

        .sidebar-nav li a span {
            width: 71%;
            display: inline-block;
        }

        .sidebar-nav>.sidebar-brand {
            height: 65px;
            line-height: 20px;
            height: auto;
            overflow-x: hidden;
        }

        .sidebar-nav>.sidebar-brand a span {
            font-weight: normal;
            display: block;
            color: #fff !important;
            color: rgba(255, 255, 255, 0.7);
        }

        .sidebar-brand a {
            color: #fff !important;
            position: relative;
        }

        .side-collapse,
        .sidebar-collapse {
            top: 44px;
            bottom: 0;
            right: 0;
            width: 100%;
            -webkit-transition: width .4s;
            transition: width .4s;
            background: #f9f9f9;
            border-left: 1px solid #bcbcbc;
            position: absolute;
            z-index: 1;
            overflow-y: auto;
            overflow-x: hidden
        }

        .side-collapse-container,
        .sidebar-collapse-container {
            width: 100%;
            position: relative !important;
            right: 0;
            -webkit-transition: width .4s;
            transition: width .4s;
            background: #fff;
            min-height: 520px
        }

        .sidebar-nav>.sidebar-brand a,
        .sidebar-nav>.sidebar-brand a:hover {
            color: #fff;
            text-transform: uppercase;
            font-size: 19px;
            font-family: Open-Sans-Bold;
            padding: 40px 32px;
            width: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            display: block;
            margin: 0
        }

        .sidebar-collapse {
            right: auto;
            left: 0;
            width: 280px;
            position: fixed;
            border-left: 0;
            z-index: 10000
        }

        .sidebar-collapse.in {
            width: 0;
            border: 0
        }

        .sidebar-collapse-container {
            right: auto;
            left: 0;
            -webkit-transition: left .4s;
            transition: left .4s
        }

        .sidebar-nav li:not(.sidebar-brand) {
            border-bottom: solid 1px rgba(255, 255, 255, 0.1)
        }

        .advance-search a,
        footer a {
            color: rgba(255, 255, 255, 0.69)
        }

        /* .section-wrap:after {
            content: "";
            display: block;
            clear: both
        } */

        .petroleum-wrapper {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .petroleum-mineral {
            display: inline-block;
            position: relative
        }

        body.rc .petroleum-mineral {
            min-height: 450px;
            padding-bottom: 75px;
            padding-top: 110px;
        }

        .petroleum-mineral {
            padding: 75px 225px 75px 30px;
            color: #fff;
            background: rgba(0, 0, 0, 0.45);
            width: 747px;
            -webkit-border-radius: 4px;
            border-radius: 4px;
            min-height: 488px;
            margin-bottom: 15px
        }

        .petroleum-mineral .repo-description {
            font-size: 26px;
            line-height: 34px
        }

        .petroleum-mineral .large-title {
            font-family: Open-Sans-Light;
            font-size: 58px;
            line-height: 66px;
        }

        .petroleum-mineral .large-title span {
            display: block;
        }


        .landing_section_logos .partners img {
            margin-bottom: 15px;
        }

        .hero-image .search-form {
            padding: 0;
            margin-top: 38px;
            max-width: 600px
        }

        .hero-image .search-form .form-group input {
            width: -webkit-calc(100% - 126px);
            width: calc(100% - 126px);
            border: 0;
            line-height: 18px;
            background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.45)), to(rgba(255, 255, 255, 0.45)));
            background: linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45));
            float: left;
            padding: 19px;
            color: #fff;
            -webkit-border-radius: 4px 0 0 4px;
            border-radius: 4px 0 0 4px
        }

        .petroleum-mineral input::-webkit-input-placeholder {
            color: rgba(255, 255, 255, 0.8) !important
        }

        .advance-search {
            font-size: 12px;
            line-height: 20px;
            color: rgba(255, 255, 255, 0.69);
            text-decoration: underline;
            margin-top: 6px
        }

        .petroleum-list-each {
            border-right: 2px solid rgba(243, 115, 86, 0.2)
        }

        /* .heading2 {
            margin: 0;
            padding-bottom: 30px;
            color: #ebfeff
        } */

        .landing_section_logos {
            /* text-align: center; */
            padding: 0 15px 24px 15px;
            background: -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, rgba(0, 0, 0, 0.4)), to(rgba(0, 0, 0, 0.5)));
            background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.5) 100%);
        }

        .landing_section_logos .partners {
            text-align: right;
            /* padding-right: 35px; */
            border-right: 1px solid rgba(255, 255, 255, 0.5);
        }

        .landing_section_logos .partners,
        .landing_section_logos .donors {
            display: inline-block;
            text-align: left;
        }

        /* .landing_section_logos .donors {
            padding-left: 35px;
        } */

        .landing_section_logos p {
            font-size: 18px;
            color: #fff;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: .85px;
            line-height: 16px;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.65);
        }

        .landing_section_logos .partners a,
        .landing_section_logos .donors a {
            margin-right: 30px;
        }

        footer .partner-wrapper {
            text-align: left;
        }


        .partner-wrapper ul {
            padding: 0
        }

        .partner-wrapper li {
            list-style: none
        }

        .tooltip {
            position: absolute;
            text-align: center;
            font-size: 11px;
            background: #fff;
            border: solid 1px #aaa;
            -webkit-border-radius: 8px;
            border-radius: 8px;
            pointer-events: none
        }

        .search-form .form-control::-webkit-input-placeholder {
            color: rgba(64, 64, 64, 0.5)
        }

        .search-form .form-control {
            border: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
            width: 90%;
            font-size: 14px;
            line-height: 20px;
            height: auto;
            padding-top: 26px;
            padding-bottom: 26px;
            padding-left: 12px;
            padding-right: 12px;
            background: transparent
        }

        .search-form>.form-group {
            margin: 0
        }

        footer {
            clear: both;
            background: #404040;
            padding-top: 40px;
            padding-bottom: 20px;
        }

        footer ul {
            margin: 0;
            padding: 0
        }

        footer ul li {
            list-style: none;
            display: inline-block;
            vertical-align: middle
        }

        footer ul li a {
            font-size: 13px;
            color: #fff;
            color: rgba(255, 255, 255, 0.7)
        }

        footer .partner-description {
            color: rgba(255, 255, 255, 0.5);
            margin: 40px 0 20px;
            text-align: left;
        }

        .footer__wrap {
            max-width: 1100px;
            margin: 0 auto;
            padding-bottom: 40px;
        }

        .footer-bottom {
            float: right;
            margin-top: 0
        }

        .footer-bottom .footer-description {
            float: left
        }

        .footer-bottom .footer-description img {
            margin-left: 4px
        }


        @media(min-width: 768px) {
            .navbar {
                -webkit-border-radius: 4px;
                border-radius: 4px
            }

            .navbar-header {
                float: left
            }

            .navbar-static-top {
                -webkit-border-radius: 0;
                border-radius: 0
            }
        }

        @media (min-width: 992px) {
            .petroleum-mineral {
                width: -webkit-calc(100% - 186px);
                width: calc(100% - 186px);
                padding: 140px 227px 84px 30px;
            }

            .petroleum-mineral .large-title {
                font-size: 42px;
                line-height: 50px;
            }
        }
	</style>

	<link rel="stylesheet" href="{{url('css/style.css?v=1.07')}}" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="{{url('css/new.css?v=1.0')}}" media="print" onload="this.media='all'">
    @if(site()->isRC())
	    <link rel="stylesheet" href="{{url('css/new-rc.css?v=1.0')}}"/>
	@elseif(site()->isOLC())
	    <link rel="stylesheet" href="{{url('css/new-olc.css?v=1.0')}}"/>
	@endif
	@yield('css')

    @if($gtmID != '')
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','{{$gtmID}}');</script>
        <!-- End Google Tag Manager -->
    @endif
    <!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
    <script src="{{url('js/plugins-bundle.js')}}"></script>
	<script>
		var app_url = '{{ url()}}';
		var langSelect = '{{$langSelect}}';
		var langClip =  {!! json_encode(trans('clip')) !!};
        var lang = {!! json_encode(trans('annotation')) !!};
	</script>
</head>

<body data-spy="scroll" class="lang-{{$lang->getCurrentLang()}} {{site()->getSiteType()}} {{getPageClass()}}"  dir="{{$lang->getDirection()}}" lang="{{$lang->getCurrentLang()}}">
    @if( $gtmID != '')
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{$gtmID}}"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    @endif
<div id="wrapper">
	<div id="page-wrapper" class="sidebar-collapse-container @if(!isset($homePage)) not-front @endif">
