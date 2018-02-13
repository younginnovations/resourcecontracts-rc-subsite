<?php
$favicon  = site()->getImageUrl('favicon', 'ico');
$siteName = site()->meta('name');
if (!site()->isRC()) {
	$siteName .= '<span class="beta">Beta</span>';
}
$siteName .= '<span>Contracts</span>';
$contact_email = site()->contactEmail();
?>
		<!DOCTYPE html>
<html lang="en">
<head>
	<title> {{ meta('')->title }}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="{{$favicon}}">
	<link href="{{generate_asset_url('css/style.css')}}" rel="stylesheet"/>
	<link href="{{generate_asset_url('css/contract.css')}}" rel="stylesheet"/>
	<style>
		#progress-bar-info {
			border-bottom: 2px solid #1757d5;
			width: 0%;
		}
	</style>
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	<script>
		const APP_URL = '{{ url()}}';
		const LANG = {!! json_encode(trans('annotation')) !!};
		const SITE_NAME = '{!! $siteName !!}';
		const Annotation = {!!json_encode($annotation)!!};
		const loading_page = {!! json_encode(trans('annotation.loading_page')) !!};
		const lang_category = {!! json_encode(trans('codelist/annotation.categories')) !!};
		const AWS_URL = "https://resourcecontracts-nrgi.s3-us-west-2.amazonaws.com";
		const pdf_not_loading = "{!!sprintf(trans('annotation.pdf_not_shown'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}";
	</script>
</head>
<body data-spy="scroll">
<div id="wrapper">
	<div id="page-wrapper" class="not-front sidebar-collapse-container">
		<div id="app" class="main-app">
			<div class="loading"><p>@lang('annotation.loading')</p></div>
		</div>
	</div>
</div>
<script src="{{generate_asset_url('js/pdfjs/pdf.js')}}" type="text/javascript"></script>
<script src="{{generate_asset_url('js/popup.js')}}" type="text/javascript"></script>
</body>
</html>
