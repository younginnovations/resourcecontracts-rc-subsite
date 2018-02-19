<?php
if (empty($meta)) {
	$meta = [];
}
$langSelect  = trans('search.select');
$title       = (isset($meta['title'])) ? site()->meta('title').' - '.$meta['title'] : site()->meta('title');
$description = (isset($meta['description'])) ? $meta['description'] : site()->meta('description');
$favicon     = site()->getImageUrl('favicon', 'ico');
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
	<link href="{{url('css/style.css?v=1.07')}}" rel="stylesheet"/>
	@yield('css')
    <!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	<script src="{{url('js/plugins-bundle.js')}}"></script>
	<script>
		var app_url = '{{ url()}}';
		var langSelect = '{{$langSelect}}';
		var langClip =  {!! json_encode(trans('clip')) !!};
	</script>
</head>

<body data-spy="scroll" class="lang-{{$lang->getCurrentLang()}} {{site()->getSiteType()}} {{getPageClass()}}"  dir="{{$lang->getDirection()}}" lang="{{$lang->getCurrentLang()}}">

<div id="wrapper">
	<div id="page-wrapper" class="not-front sidebar-collapse-container">