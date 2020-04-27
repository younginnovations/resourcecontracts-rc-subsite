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
	<!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet"> -->

	<style>
		@font-face{font-family:Open-Sans-Regular;font-style:normal;font-weight:normal;src:url("../../fonts/opensans-regular-webfont.eot?#iefix") format("embedded-opentype"),url("../../fonts/opensans-regular-webfont.woff2") format("woff2"),url("../../fonts/opensans-regular-webfont.woff") format("woff"),url("../../fonts/opensans-regular-webfont.svg#Open-Sans-Regular") format("svg")}@font-face{font-family:Open-Sans-Bold;font-style:normal;font-weight:normal;src:url("../../fonts/opensans-bold-webfont.eot?#iefix") format("embedded-opentype"),url("../../fonts/opensans-bold-webfont.woff2") format("woff2"),url("../../fonts/opensans-bold-webfont.woff") format("woff"),url("../../fonts/opensans-bold-webfont.svg#Open-Sans-Bold") format("svg")}@font-face{font-family:Open-Sans-Light;font-style:normal;font-weight:normal;src:url("../../fonts/opensans-light-webfont.eot?#iefix") format("embedded-opentype"),url("../../fonts/opensans-light-webfont.woff2") format("woff2"),url("../../fonts/opensans-light-webfont.woff") format("woff"),url("../../fonts/opensans-light-webfont.svg#Open-Sans-Light") format("svg")}@font-face{font-family:Open-Sans-Italic;font-style:normal;font-weight:normal;src:url("../../fonts/opensans-italic.eot?#iefix") format("embedded-opentype"),url("../../fonts/opensans-italic.woff2") format("woff2"),url("../../fonts/opensans-italic.woff") format("woff"),url("../../fonts/opensans-italic.svg#Open-Sans-Italic") format("svg")}

	* {
		-webkit-box-sizing: border-box;
		box-sizing: border-box
	}

	*:before,*:after {
		-webkit-box-sizing: border-box;
		box-sizing: border-box
	}

	html {
		font-size: 10px;
		-webkit-tap-highlight-color: transparent;
		-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%
	}

	body {
		font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
		font-size: 14px;
		line-height: 1.42857143;
		color: #333;
		background-color: #fff;
		margin: 0;
	}

	input,button,select,textarea {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit
	}

	a {
		color: #337ab7;
		background-color: transparent;
		text-decoration: none;
	}

	a:hover,a:focus {
		color: #23527c;
		text-decoration: underline;
		outline: 0;
	}
		

		article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary {
			display: block;
		}

		b,strong {
			font-weight: bold;
		}

		small {
			font-size: 80%
		}

		img {
    border: 0;
}

svg:not(:root) {
    overflow: hidden;
}

button,input,optgroup,select,textarea {
    margin: 0;
    font: inherit;
    color: inherit;
}

button {
    overflow: visible;
}

button,select {
    text-transform: none;
}

button,html input[type="button"],input[type="reset"],input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer;
}

input {
    line-height: normal;
}

img {
    vertical-align: middle
}

h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6 {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit
}

h1,.h1,h2,.h2,h3,.h3 {
    margin-top: 20px;
    margin-bottom: 10px;
}

p {
    margin: 0 0 10px;
}

small,.small {
    font-size: 85%;
}

.text-center {
    text-align: center;
}

ul,ol {
    margin-top: 0;
}


.row {
    margin-right: -15px;
    margin-left: -15px
}

.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1,.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2,.col-xs-3,.col-sm-3,.col-md-3,.col-lg-3,.col-xs-4,.col-sm-4,.col-md-4,.col-lg-4,.col-xs-5,.col-sm-5,.col-md-5,.col-lg-5,.col-xs-6,.col-sm-6,.col-md-6,.col-lg-6,.col-xs-7,.col-sm-7,.col-md-7,.col-lg-7,.col-xs-8,.col-sm-8,.col-md-8,.col-lg-8,.col-xs-9,.col-sm-9,.col-md-9,.col-lg-9,.col-xs-10,.col-sm-10,.col-md-10,.col-lg-10,.col-xs-11,.col-sm-11,.col-md-11,.col-lg-11,.col-xs-12,.col-sm-12,.col-md-12,.col-lg-12 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px
}

.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12 {
    float: left
}

.col-xs-12 {
    width: 100%
}

.col-xs-4 {
    width: 33.33333333%
}

@media(min-width: 768px) {
    .col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12 {
        float:left
    }

    .col-sm-12 {
        width: 100%
	}

	 .col-sm-4 {
        width: 33.33333333%
    }
}

@media(min-width: 992px) {
    .col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12 {
        float:left
    }

    .col-md-12 {
        width: 100%
	}
	
	   .col-md-4 {
        width: 33.33333333%
	}
}

label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: bold
}

.form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s
}

.form-control::-webkit-input-placeholder {
    color: #999
}

.form-group {
    margin-bottom: 15px
}

.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    -webkit-border-radius: 4px;
    border-radius: 4px
}

.btn-default {
    color: #333;
    background-color: #fff;
    border-color: #ccc
}

.fade {
    opacity: 0;
    -webkit-transition: opacity .15s linear;
    transition: opacity .15s linear
}
.navbar {
    position: relative;
    min-height: 50px;
    margin-bottom: 20px;
    border: 1px solid transparent
}

@media(min-width: 768px) {
    .navbar {
        -webkit-border-radius:4px;
        border-radius: 4px
    }
}

@media(min-width: 768px) {
    .navbar-header {
        float:left
    }
}

.navbar-static-top {
    z-index: 1000;
    border-width: 0 0 1px
}

@media(min-width: 768px) {
    .navbar-static-top {
        -webkit-border-radius:0;
        border-radius: 0
    }
}

.navbar-brand {
    float: left;
    height: 50px;
    padding: 15px 15px;
    font-size: 18px;
    line-height: 20px
}

.navbar-brand i {
    font-style: normal !important;
}

.list-group {
    padding-left: 0;
    margin-bottom: 20px
}

.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    display: none;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0
}

.tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;
    white-space: normal;
    filter: alpha(opacity=0);
    opacity: 0;
    line-break: auto
}

.clearfix:before,.clearfix:after,.dl-horizontal dd:before,.dl-horizontal dd:after,.container:before,.container:after,.container-fluid:before,.container-fluid:after,.row:before,.row:after,.form-horizontal .form-group:before,.form-horizontal .form-group:after,.btn-toolbar:before,.btn-toolbar:after,.btn-group-vertical>.btn-group:before,.btn-group-vertical>.btn-group:after,.nav:before,.nav:after,.navbar:before,.navbar:after,.navbar-header:before,.navbar-header:after,.navbar-collapse:before,.navbar-collapse:after,.pager:before,.pager:after,.panel-body:before,.panel-body:after,.modal-header:before,.modal-header:after,.modal-footer:before,.modal-footer:after {
    display: table;
    content: " "
}

.clearfix:after,.dl-horizontal dd:after,.container:after,.container-fluid:after,.row:after,.form-horizontal .form-group:after,.btn-toolbar:after,.btn-group-vertical>.btn-group:after,.nav:after,.navbar:after,.navbar-header:after,.navbar-collapse:after,.pager:after,.panel-body:after,.modal-header:after,.modal-footer:after {
    clear: both
}

.pull-left {
    float: left !important
}

body {
    background-color: #f8f8f8;
}

#wrapper {
    width: 100%;
}

#page-wrapper {
    padding: 0 15px;
    min-height: 568px;
    background-color: #fff;
}

body.rc .petroleum-wrapper {
    background-position: top;
}

@media all and (min-width: 768px) {
    #page-wrapper {
        position:inherit;
        margin: 0 0 0 250px;
        padding: 0 30px;
        border-left: 1px solid #e7e7e7;
    }
}


.select2-container {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    margin: 0;
    position: relative;
    vertical-align: middle
}

.select2-container .select2-selection--single {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 28px;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-select: none
}

.select2-container .select2-selection--single .select2-selection__rendered {
    display: block;
    padding-left: 8px;
    padding-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

.select2-container .select2-selection--single .select2-selection__clear {
    position: relative
}


.select2-hidden-accessible {
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important
}

.select2-container--classic .select2-selection--single {
    background-color: #f7f7f7;
    border: 1px solid #aaa;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    outline: 0;
    background-image: -webkit-gradient(linear,left top,left bottom,color-stop(50%,white),to(#eee));
    background-image: linear-gradient(to bottom,white 50%,#eee 100%);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFFFF',endColorstr='#FFEEEEEE',GradientType=0)
}

.select2-container--classic .select2-selection--single .select2-selection__rendered {
    color: #444;
    line-height: 28px
}

.select2-container--classic .select2-selection--single .select2-selection__clear {
    cursor: pointer;
    float: right;
    font-weight: bold;
    margin-right: 10px
}

.select2-container--classic .select2-selection--single .select2-selection__arrow {
    background-color: #ddd;
    border: 0;
    border-left: 1px solid #aaa;
    -webkit-border-top-right-radius: 4px;
    border-top-right-radius: 4px;
    -webkit-border-bottom-right-radius: 4px;
    border-bottom-right-radius: 4px;
    height: 26px;
    position: absolute;
    top: 1px;
    right: 1px;
    width: 20px;
    background-image: -webkit-gradient(linear,left top,left bottom,color-stop(50%,#eee),to(#ccc));
    background-image: linear-gradient(to bottom,#eee 50%,#ccc 100%);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFEEEEEE',endColorstr='#FFCCCCCC',GradientType=0)
}

.select2-container--classic .select2-selection--single .select2-selection__arrow b {
    border-color: #888 transparent transparent transparent;
    border-style: solid;
    border-width: 5px 4px 0 4px;
    height: 0;
    left: 50%;
    margin-left: -4px;
    margin-top: -2px;
    position: absolute;
    top: 50%;
    width: 0
}

html {
    height: 100%
}

body {
    height: 100%;
    font-family: Open-Sans-Regular;
    color: #404040;
    background: #fff;
    position: relative;
    overflow-x: hidden;
    margin: 0
}

* {
    -webkit-padding-start: 0;
    margin: 0;
    padding: 0
}

.trigger {
    background: url(../../images/ic-menu.png) no-repeat center;
    text-indent: -9999px;
    padding: 40px 28px;
    border-right: 1px solid rgba(216,216,216,0.5);
    cursor: pointer
}

body.page-home .trigger {
    background: url(../../images/ic-menu-white.png) no-repeat center;
    border-right: 1px solid rgba(242,242,242,0.2);
    padding: 40px 28px
}

.navbar-brand,.navbar-brand:hover {
    font-size: 19px;
    font-family: Open-Sans-Bold;
    color: #f37356;
    text-transform: uppercase;
    height: auto;
    position: relative;
    padding: 0 20px 0 0;
    margin: 20px 15px
}

.navbar-brand span {
    display: block;
    color: rgba(64,64,64,0.7)
}

.rc .navbar-brand,.rc .navbar-brand:hover {
    padding: 0
}

body.page-home .navbar-brand {
    color: #fff
}

body.page-home .navbar-brand span {
    display: block;
    color: rgba(255,255,255,0.7)
}

nav.navbar {
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 0;
    margin-bottom: 0;
    z-index: 1000
}

.navbar-brand span {
    display: block;
    color: rgba(64,64,64,0.7)
}

.language-selector {
    float: left;
    margin-top: 5px;
    z-index: 9999
}

.language-selector ul {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

.language-selector ul li {
    display: inline-block;
    list-style: none
}

.language-selector ul li a {
    padding: 1px 4px;
    text-transform: uppercase;
    display: block;
    font-size: 13px;
    line-height: 21px
}

.language-selector ul li a.active {
    background: #f37356;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    padding: 2px 6px;
    color: #fff
}

.page-home .language-selector {
    position: absolute;
    top: 25px;
    right: 15px
}

body.page-home .language-selector ul li a,body.page-home .clip-head #hide-annotation {
    color: #eee
}


#page-wrapper {
    margin: 0;
    padding: 0;
    border: 0
}

#wrapper {
    padding-left: 0;
    -webkit-transition: all .5s ease;
    transition: all .5s ease
}

.sidebar-nav {
    position: absolute;
    top: 0;
    width: 280px;
    margin: 0;
    padding: 0;
    list-style: none
}

.sidebar-nav li {
    color: #aaa;
    line-height: normal;
    text-indent: inherit
}

.sidebar-nav li a {
    display: block;
    text-decoration: none;
    color: #999;
    padding: 18px 14px 18px 32px;
    color: #fff
}

.sidebar-nav li a.active {
    background: #f37356;
    color: #fff
}

.sidebar-nav li a span {
    width: 71%;
    display: inline-block
}

.sidebar-nav>.sidebar-brand {
    height: 65px;
    line-height: 20px;
    height: auto;
    overflow-x: hidden
}

.sidebar-nav>.sidebar-brand a span {
    font-weight: normal;
    display: block;
    color: #fff;
    color: rgba(255,255,255,0.7)
}

#sidebar-wrapper {
    background-image: linear-gradient(-81deg,#291212 1%,#40302c 100%);
    top: 0
}

.sidebar-brand a {
    position: relative
}

.side-collapse,.sidebar-collapse {
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

.side-collapse-container,.sidebar-collapse-container {
    width: 100%;
    position: relative !important;
    right: 0;
    -webkit-transition: width .4s;
    transition: width .4s;
    background: #fff;
    min-height: 520px
}

.sidebar-nav>.sidebar-brand a,.sidebar-nav>.sidebar-brand a:hover {
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
    border-bottom: solid 1px rgba(255,255,255,0.1)
}

footer {
    clear: both;
    background: #404040;
    padding: 40px 0 20px
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
    color: rgba(255,255,255,0.7)
}

.front-row-top-wrap nav.navbar {
    border-bottom: 1px solid rgba(242,242,242,0.3);
    -webkit-box-shadow: none;
    box-shadow: none
}

.advance-search a,footer a {
    color: rgba(255,255,255,0.69)
}

.petroleum-list a {
    color: #484848
}

.petroleum-list a:focus,.petroleum-list a:hover,.petroleum-list a:active {
    color: #484848;
    text-decoration: none
}

.petroleum-list a:hover small {
    border-bottom: solid 1px #333
}

body.rc .section-wrap {
    padding-top: 110px;
    min-height: 540px;
    padding-bottom: 10px;
}

.section-wrap:after {
    content: "";
    display: block;
    clear: both
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

.hero-image {
    position: relative;
    margin-top: -82px
}

.petroleum-wrapper {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover
}

.section-wrap {
    position: relative;
    padding: 133px 0 20px 0;
    margin: 0 60px
}

@media all and (min-width: 992px) {
    .section-wrap {
		min-height:610px;
		margin: 0 auto;
		padding: 133px 20px 20px 20px;
    }
}

@media (min-width: 1200px) {
	.section-wrap {
		position: relative;
		max-width: 1200px;
	}
}

.petroleum-mineral {
    padding: 75px 225px 75px 30px;
    color: #fff;
    background: rgba(0,0,0,0.45);
    width: 747px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    min-height: 488px;
    margin-bottom: 15px
}

@media (min-width: 992px) {
	.petroleum-mineral {
		width: -webkit-calc(100% - 186px);
		width: calc(100% - 186px);
		padding: 140px 227px 84px 30px;
	}
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

@media (min-width: 992px) {
.petroleum-mineral .large-title {
    font-size: 42px;
    line-height: 50px;
}
}

body.rc .landing_section_logos .partners img {
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
    background: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.45)),to(rgba(255,255,255,0.45)));
    background: linear-gradient(rgba(255,255,255,0.45),rgba(255,255,255,0.45));
    float: left;
    padding: 19px;
    color: #fff;
    -webkit-border-radius: 4px 0 0 4px;
    border-radius: 4px 0 0 4px
}

.hero-image .search-form .search-button {
    width: 126px;
    float: left;
    border: 0;
    background: #f37356;
    -webkit-border-radius: 0 4px 4px 0;
    border-radius: 0 4px 4px 0;
    padding: 17px 20px;
    color: #fff;
    -webkit-box-shadow: inset 0 2px 5px 0 rgba(255,255,255,0.2);
    box-shadow: inset 0 2px 5px 0 rgba(255,255,255,0.2);
    border: solid 1px #f37356
}

.petroleum-mineral input::-webkit-input-placeholder {
    color: rgba(255,255,255,0.8) !important
}

.advance-search {
    font-size: 12px;
    line-height: 20px;
    color: rgba(255,255,255,0.69);
    text-decoration: underline;
    margin-top: 6px
}

.petroleum-list {
    position: absolute;
    z-index: 999;
    width: 387px;
    top: -webkit-calc(50% - 145px);
    top: calc(50% - 145px);
    left: 610px;
    -webkit-border-radius: 4px;
    border-radius: 4px
}

@media (min-width: 992px) {
.petroleum-list {
    left: auto;
    right: 15px;
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%);
    top: 47px;
}
}

.petroleum-list .petroleum-list-inner {
    padding: 20px 25px;
    color: #484848;
    background-color: #fff;
    -webkit-border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0 0
}

.petroleum-list .petroleum-list-inner .col-md-4 {
    padding-left: 0;
    padding-right: 0
}

.petroleum-list .petroleum-list-inner .petroleum-list-title {
    margin-bottom: 0;
    font-size: 40px;
    font-weight: bold;
    margin-top: 10px
}

.petroleum-list .petroleum-list-inner small {
    font-size: 14px;
    font-weight: bold
}

.petroleum-list .clear {
    clear: both
}

.list-item-wrap {
    padding: 20px;
    background-image: radial-gradient(circle at 50% 38%,#c2614c,#9b4f3d);
    -webkit-border-radius: 0 0 4px 4px;
    border-radius: 0 0 4px 4px
}

.list-item-wrap .inner-list-item {
    background: #7d3f31;
    padding: 30px 20px 35px
}

.list-item-wrap .inner-list-item .group-item-title {
    font-size: 18px;
    line-height: 24px;
    font-weight: normal;
    color: rgba(255,255,255,0.69)
}

.list-item-wrap .inner-list-item .list-group {
    margin-bottom: 0 !important
}

.petroleum-list-each {
    border-right: 2px solid rgba(243,115,86,0.2)
}

/* .explore-contracts {
    text-align: center;
    background-color: #288d94
} */

/* .explore-contracts .map-wrapper {
    position: relative;
    padding: 40px 0 28px 0
} */

.heading2 {
    margin: 0;
    padding-bottom: 30px;
    color: #ebfeff
}

/* .map-wrapper .heading2 {
    padding-bottom: 10px;
    color: #fff;
    text-shadow: 1px 2px 3px rgba(0,0,0,0.3)
} */

body.rc .landing_section_logos {
    text-align: center;
    padding: 0 15px 24px 15px;
    background: -webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(60%,rgba(0,0,0,0.4)),to(rgba(0,0,0,0.5)));
    background: linear-gradient(transparent 0,rgba(0,0,0,0.4) 60%,rgba(0,0,0,0.5) 100%);
}

body.rc .landing_section_logos .partners {
    text-align: right;
    padding-right: 35px;
    border-right: 1px solid rgba(255,255,255,0.5);
}

body.rc .landing_section_logos .partners, body.rc .landing_section_logos .donors {
    display: inline-block;
    text-align: left;
}

body.rc .landing_section_logos .donors {
    padding-left: 35px;
}

body.rc .landing_section_logos p {
    font-size: 18px;
    color: #fff;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: .85px;
    line-height: 16px;
    text-shadow: 1px 1px 5px rgba(0,0,0,0.65);
}

body.rc .landing_section_logos .partners a, body.rc .landing_section_logos .donors a {
    margin-right: 30px;
}

p {
    font-size: 12px;
    line-height: 22px
}

.partner-wrapper {
    margin-top: 20px
}

.partner-wrapper ul {
    padding: 0
}

.partner-wrapper li {
    list-style: none
}

.menu-list .menu-list-each a {
    color: rgba(255,255,255,0.7)
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

.menu-list-each {
    float: right
}

.menu-list-each li {
    display: inline-block;
    float: left;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 0;
    position: relative
}

.menu-list-each li:after {
    position: absolute;
    content: " ";
    height: 15px;
    width: 1px;
    background: rgba(255,255,255,0.7);
    top: 3px;
    right: -1px
}

.menu-list-each li:last-child {
    margin-right: 0;
    padding-right: 0;
    border-right: 0
}

.menu-list-each li:last-child:after {
    content: none;
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
    color: rgba(64,64,64,0.5)
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

.select2-container {
    width: 100% !important
}

#page-wrapper {
    margin: 0;
    padding: 0;
    border: 0
}

nav.navbar {
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: 0;
    margin-bottom: 0;
    z-index: 1000
}

@media (min-width: 992px) {
.show-in-small-screen {
    display: none;
}
}

	</style>

	@if(site()->isRC())
	<!-- <link rel="stylesheet" href="{{url('css/new-rc.css?v=1.0')}}"/> -->
	<style>
		.other-document {
			background: rgba(243,116, 86,0.05);
		}
	</style>
	@elseif(site()->isOLC())
	<!-- <link rel="stylesheet" href="{{url('css/new-olc.css?v=1.0')}}"/> -->
	<style>
		.other-document {
			background: rgba(0,184, 148,0.05);
		}
	</style>
	@endif
	<!-- <link href="{{url('css/style.css?v=1.07')}}" rel="stylesheet"/>
	<link rel="stylesheet" href="{{url('css/new.css?v=1.0')}}"/> -->
	<link rel="stylesheet" href="{{url('css/style.css?v=1.07')}}" media="print" onload="this.media='all'">
	<link rel="stylesheet" href="{{url('css/new.css?v=1.0')}}" media="print" onload="this.media='all'">
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
