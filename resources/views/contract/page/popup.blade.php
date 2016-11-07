<?php
$favicon = site()->getImageUrl('favicon', 'ico');
$siteName = site()->meta('name');
if (!site()->isRC()) {
	$siteName .= '<span class="beta">Beta</span>';
}
$siteName .= '<span>Contracts</span>';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title> {{ meta('')->title }}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="{{$favicon}}">
	<link href="{{url('css/style.css')}}" rel="stylesheet"/>
	<link href="{{url('css/contract.css')}}" rel="stylesheet"/>
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	<script>
		const APP_URL = '{{ url()}}';
		const LANG = {!! json_encode(trans('annotation')) !!};
		const SITE_NAME = '{!! $siteName !!}';
		const Annotation = {!!json_encode($annotation)!!};
		const lang_category = {!! json_encode(trans('codelist/annotation.categories')) !!};
		const AWS_URL = "https://rc-stage.s3-us-west-2.amazonaws.com";
		const CONTACT_EMAIL = '{{site()->contactEmail()}}';
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
<script src="{{url('js/pdfjs/pdf.js')}}" type="text/javascript"></script>
<script src="{{url('js/popup.js')}}" type="text/javascript"></script>
</body>
</html>
