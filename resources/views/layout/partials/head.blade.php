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
            filter: brightness(0) invert(1);
        }

        .not-front .trigger:before {
            filter: none;
        }

        .navbar-header {
            display: flex;
        }

        .navbar-static-top {
            z-index: 1000;
            border-width: 0 0 1px
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

        .front-row-top-wrap {
            border-bottom: 1px solid rgba(242, 242, 242, 0.3);
            box-shadow: none;
            margin-top: -1px;
            position: relative;
            z-index: 1;
        }

        .olc .front-row-top-wrap {
            background: #fff;
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
            color: #fff;
            font-size: 19px;
            font-family: Open-Sans-Bold;
            text-transform: uppercase;
            height: auto;
            position: relative;
            padding: 0!important;
            margin: 21px 0 21px 15px!important;
        }

        @media all and (min-width: 500px) {
            .navbar-brand,
            .navbar-brand:hover {
                margin: 20px 15px!important;
                padding: 0 20px 0 0!important;
            }
        }


        .navbar-brand span {
            color: rgba(255,255,255,0.7);
            display: block;
        }

        .guide-link {
            padding: 0 12px 8px;
            text-align: right;
            white-space: nowrap;
        }

        .guide-link a {
            color: #404040;
            font-size: 14px;
            text-transform: uppercase;
        }

        .navbar-right {
            border: 0!important;
            padding-left: 0!important;
            /* padding-right: 15px; */
            align-items: center;
        }

        .not-front .navbar-right {
            border-left: 1px solid #e7e9eb!important;
            padding-left: 30px!important;
        }

        .navbar-right ul {
            align-items: center;
            display: flex;
            float: right;
            justify-content: space-between;
            margin-bottom: 0;
            margin-right: 10px;
            max-width: 90px;
        }

        .navbar-right ul li {
            list-style: none;
            margin-right: 4px;
        }

        .navbar-right ul li a {
            color: rgba(255,255,255,0.7);
            cursor: pointer;
            font-size: 14px;
            padding: 2px 6px;
            text-transform: uppercase;
        }

        .navbar-right ul li a:hover {
            color: #fff;
            text-decoration: none;
        }

        .navbar-right ul li a.active {
            border-radius: 4px;
            color: #fff;
            /* font-family: Open-Sans-Semibold; */
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

        .hero-image {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: left 7%;
            /* padding-bottom: 50px; */
            position: relative;
        }

        .olc .hero-image {
            margin-top: 0;
        }

        .hero-image {
            margin-top: -82px;
        }

        @media all and (min-width: 420px) {
            .hero-image:before {
                padding-bottom: 70px;
            }
        }

        .hero-wrap {
            justify-content: space-between;
            padding: 60px 20px 50px;
            position: relative;
        }

        @media all and (min-width: 768px) {
            .hero-wrap {
                align-items: center;
                display: flex;
                padding-right: 0;
                padding-bottom: 50px;
            }
        }

        .hero-title {
            color: #fff;
            max-width: 630px;
        }

        @media all and (min-width: 768px) {
            .hero-title {
                padding-right: 20px;
            }
        }

        @media all and (min-width: 769px) and (max-width: 1023px) {
            .hero-title {
                padding-right: 40px;
            }
        }

        @media all and (min-width: 1024px) {
            .hero-title {
                margin-left: 40px;
                padding-right: 0;
            }
        }

        @media all and (min-width: 1200px) {
            .hero-title {
                margin-left: 60px;
            }
        }

        .hero-title span {
            font-size: 24px;
            font-family: Open-Sans-Light;
        }

        .hero-title h1 {
            font-size: 40px;
            font-family: Open-Sans-Bold;
            font-weight: normal;
            line-height: 54px;
            margin-top: 16px;
            max-width: 430px;
        }

        @media all and (min-width: 600px){
            .hero-title h1 {
                font-size: 48px;
                line-height: 58px;
            }
        }
            

        .search-form .form-group {
            align-items: center;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            height: 62px;
            transition: transform 0.3s ease-in-out;
        }

        .not-front .search-form .form-group {
            background: transparent!important;
            height: 82px;
        }

        .hero-image .search-form {
            font-size: 16px;
            padding: 0;
            margin-top: 38px;            
            max-width: 630px !important;
        }

        .hero-image .search-form button {
            border: 0;
            height: 100%;
            text-transform: uppercase;
            width: 125px;
        }
/* 
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
        } */
/* 
        .hero-image .search-form .form-group input:-webkit-autofill {
            -webkit-appearance: none!important
        } */

        .hero-image .search-form .form-group input:-webkit-autofill,
        .hero-image .search-form .form-group input:-webkit-autofill:hover,
        .hero-image .search-form .form-group input:-webkit-autofill:focus,
        .hero-image .search-form .form-group input:-webkit-autofill:active { 
            -webkit-background-clip: text;
        }

        .hero-image .search-form .form-group:focus {
            transform: none;
        }

        .hero-image .search-form .form-group:before {
            background: url(../../images/ic_sprite.svg) no-repeat -36px 0;
            content: '';
            height: 22px;
            margin: 0 14px;
            width: 32px;
        }

        @media all and (min-width: 500px) {
            .hero-image .search-form .form-group:before  {
                width: 22px;
            }
        }

        @media all and (min-width: 600px) {
            .search-form .form-group {
                height: 65px;
            }

            .search-form .form-group:before {
                margin: 0 20px 0 26px;
            }
        }

        @media all and (min-width: 900px) {
            .search-form .form-group:before {
                margin: 0 20px 0 26px;
            }
        }

        .hero-image .search-form .form-group .form-control{
                background: transparent !important;
                border: 0;
                color: #fff;
                font-size: 16px !important;
                margin: 0 !important;
                padding: 0 15px 0 0 !important;
                height: 100%;
                width: calc(100% - 175px);
        }

        .search-form .form-group .form-control::-webkit-input-placeholder {
            color: #fff;
            font-size: 16px;
        }

        .search-form .form-group .form-control::-moz-placeholder {
            color: #fff;
            font-size: 16px;
        }

        @media all and (min-width: 900px) {
            .search-form .form-group .form-control {
                font-size: 18px !important;
            }

            .search-form .form-group .form-control::-webkit-input-placeholder {
                font-size: 18px;
            }

            .search-form .form-group .form-control::-moz-placeholder {
                font-size: 18px;
            }
        }

        .hero-image .search-form .search-button {
            max-width: 126px;
            float: left;
            border: 0;
            -webkit-border-radius: 0 4px 4px 0;
            border-radius: 0 4px 4px 0;
            padding: 17px 20px;
            color: #fff;
            -webkit-box-shadow: inset 0 2px 5px 0 rgba(255, 255, 255, 0.2);
            box-shadow: inset 0 2px 5px 0 rgba(255, 255, 255, 0.2);
        }

        .olc .hero-wrap {
            align-items: flex-start;
        }

        .olc .hero-right-wrap {
            margin-top: 80px;
        }

        .olc .hero-title h1 {            
            max-width: 550px;
        }

        .olc .search-form .form-group {
            background: rgba(0, 0, 0, 0.5);
        }

        .olc .hero-image {
            background-position: left center;
        }

        .olc .count-countries {
            background-color: #393336;
        }

        .olc .count-resources {
            background-color: #526c9b;
        }

        .olc .count-resources a:before, .olc .count-resources a:after {
            background-position: -202px -31px;
            width: 82px;
        }

        .olc .count-resources a:before {
            left: 10px;
            top: -20px;
            transform: rotate(180deg);
        }

        .olc .count-resources a:after {
            left: auto;
            right: 10px;
        }

        .olc .count-recent {
            background-color: #335640;
        }

    .olc .explore-contracts {
        background-color: #154a85!important;
    }

    .hero-right-wrap .ccsi {
        display: block;
        margin: 0 auto 32px;
    }

    .annotation-wrapper {
        background: rgba(58, 49, 49, 0.8);
        border-radius: 16px;
        max-height: 320px;
        padding: 40px 36px;
        position: relative;
    }

    @media all and (min-width: 600px) and (max-width: 767px) {
        .annotation-wrapper {
            padding: 45px 42px;
        }
    }

    @media all and (min-width: 768px) {
        .annotation-wrapper {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            max-width: 310px;
            padding-bottom: 40px;
        }
    }

    /* @media all and (min-width: 900px) {
        .annotation-wrapper {
            padding: 50px 56px 60px;
        }
    } */

    .annotation-wrapper >span {
        color: rgba(255,255,255, 0.5);
        display: block;
        font-size: 12px;
        font-family: Open-Sans-Semibold;
        margin-bottom: 24px;
        white-space: nowrap;
    }

    @media all and (min-width: 600px) and (max-width: 767px) {
        .annotation-wrapper span {
            font-size: 13px;
        }
    }

    @media all and (min-width: 900px) {
        .annotation-wrapper span {
            font-size: 14px;
        }
    }

    .view {
        bottom: 70px;
        transition: all 0.3s ease-in-out;
    }

    /* @media all and (min-width: 600px) and (max-width: 767px) {
        .view {
            bottom: 90px;
        }
    } */

    .view:hover {
        text-decoration: none;
    }

    .view-more {
        bottom: 80px;
        color: #fff;
        position: absolute;
    }

    .view-more:after {
            background: url(../../images/ic_sprite.svg) no-repeat -74px 0;
            display: inline-block;
            content: '';
            height: 14px;
            // margin-left: 16px;
            opacity: 0.5;
            width: 43px;
            transition: opacity 0.3s ease-in-out;
        }

    .view-more:hover {
            text-decoration: none;
    }

    .view-more:hover .view-more:after {
        // margin-left: 22px;
        opacity: 1;
    }

    .annotation-wrap .slick-dots {
            display: flex!important;
            margin: 30px 0 0;
    }

    .annotation-wrap .slick-dots li {
            list-style: none;
            margin-right: 4px;
            height: 2px;
            width: 24px;
    }

    .annotation-wrap .slick-dots button {
            background: rgba(196, 196, 196, 0.5);
            border: 0;
            border-radius: 2px;
            height: 2px;
            text-indent: -9999px;
            width: 24px;
    }

    .annotation-wrap .slick-dots button:hover {
            background: rgba(196, 196, 196, 0.75);
    }

    .annotation-wrap-title {
        margin-bottom: 30px;
    }

    .annotation-wrap-title a {
            color: #fff;
            font-size: 20px;
            font-family: Open-Sans-Semibold;
            line-height: 30px;
            text-decoration: underline;
    }

    .annotation-wrap-title a:hover {
        color: #fff;
    }
    .get-started {
        margin: 40px 0;
    }

    @media all and (min-width: 768px) {
        .get-started {
            margin-bottom: 0;
        }
    }

    .get-started h3 {
        color: #fff;
        display: inline-block;
        font-size: 16px;
        font-family: Open-Sans-Semibold;
        margin: 0;
    }

    .get-started h3 a {
        color: #fff;
        position: relative;
    }

    .get-started h3 a:after {
        background: url(../../images/ic_sprite.svg) no-repeat -74px 0;
        display: inline-block;
        content: '';
        height: 14px;
        margin-left: 9px;
        width: 43px;
        transition: margin-left 0.3s ease-in-out;
        transform: scale(0.75);
    }

    .get-started h3 a:hover {
        text-decoration: none;
    }

    @media all and (min-width: 600px) {
        .get-started h3 {
            font-size: 20px;
        }

        .get-started h3 a:after {
            margin-left: 16px;
            transform: scale(1);
        }
    }


    @media all and (min-width: 900px) {
        .get-started h3 {
            font-size: 24px;
        }
    }
      
    .hero-title p {
        font-size: 16px;
        font-family: Open-Sans-Semibold;
        line-height: 28px;
        margin-top: 28px;
        padding-right: 70px;
    }

    @media all and (min-width: 480px) {
        .hero-title p {
            font-size: 17px;
        }
    }


    @media all and (min-width: 600px) {
        .hero-title p {
            font-size: 18px;
            line-height: 30px;
        }
    }


    /* @media all and (min-width: 900px) {
        .hero-title p {
            font-size: 20px;
            line-height: 28px;
        }
    }

    @media all and (min-width: 1024px) {
        .hero-title p {
            font-size: 24px;
            line-height: 36px;
        }
    } */
    
    .count-block {
	 border: 0;
	 cursor: pointer;
	 height: 356px;
	 padding: 0;
	 transition: all 0.3s ease-in-out;
	 z-index: 1;
}
 .count-block:hover {
	 transform: scale(1.05);
	 z-index: 2;
}
 .count-block:hover .view {
	 color: #fff;
}
 .count-block:hover .view:after {
	 border-left-color: #fff;
}
 .count-block a {
	 display: block;
	 padding: 130px 40px 90px;
	 position: relative;
	 width: 100%;
	 height: 100%;
}
 .count-block a:hover {
	 text-decoration: none;
}
 .count-block a:before, .count-block a:after {
	 background-image: url(../../images/ic_sprite.svg);
	 background-position: no-repeat;
	 content: '';
	 position: absolute;
}
 .count-block a:before {
	 left: 0;
	 top: 0;
}
 .count-block a:after {
	 right: 12px;
	 bottom: -10px;
}
 .count-block h2 {
	 color: #fff;
	 font-size: 32px;
	 font-family: Open-Sans-Regular;
	 max-width: 260px;
	 position: relative;
	 text-transform: capitalize;
}
 .count-search a:before, .count-search a:after {
	 background-position: 0 -31px;
	 height: 110px;
	 opacity: 0.1;
	 width: 72px;
}
 .count-countries {
	 background-color: #385363;
}
 .count-countries a:before {
	 background: url(../../images/ic-map.svg) no-repeat 0 0;
	 height: 240px;
	 max-width: 438px;
	 top: 58px;
	 left: -38px;
	 width: 100%;
}
 .count-resources {
	 background-color: #372f2f;
}
 .count-resources a:before, .count-resources a:after {
	 background-position: -81px -31px;
	 height: 132px;
	 width: 110px;
}
 .count-resources a:before {
	 left: auto;
	 right: 60px;
	 top: -42px;
}
 .count-resources a:after {
	 bottom: -17px;
	 left: 10px;
}
 .count-recent {
	 background-color: #01665e;
}
 .count-recent a:before, .count-recent a:after {
	 background-position: 0 -31px;
	 filter: brightness(0) invert(1);
	 height: 110px;
	 opacity: 0.4;
	 width: 72px;
}

.hero-image:before {
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.9;
    position: absolute;
    width: 100%;
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

        footer p {
            color: rgba(255,255,255,0.36);
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
            background: transparent;
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
            margin-top: 20px;
            margin-bottom: 40px;
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

            footer .partner-description {
                margin-top: 0;
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

        .language-selector {
            position: relative!important;
            right: auto!important;
            top: auto!important;
        }
	</style>

	<link rel="stylesheet" href="{{url('css/style.css?v=1.07')}}" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="{{url('css/new.css?v=1.0')}}" media="print" onload="this.media='all'">
    @if(site()->isRC())
        <link rel="stylesheet" href="{{url('css/new-rc.css?v=1.0')}}" media="print" onload="this.media='all'"/>
    @elseif(site()->isOLC())
        <link rel="stylesheet" href="{{url('css/new-olc.css?v=1.0')}}" media="print" onload="this.media='all'"/>
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
