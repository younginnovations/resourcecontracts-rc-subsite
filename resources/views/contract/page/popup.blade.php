<!DOCTYPE html>
<html lang="en">
<head>
	<title> {{ site()->meta('title')}}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="{{url('images/favicon.ico')}}">
	<link rel="stylesheet" href="{{ url('css/annotation/annotator.css') }}">
	<link href="{{url('css/style.min.css')}}" rel="stylesheet">
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	<script>
		var APP_URL = '{{ url()}}';
		var LANG = {!! json_encode(trans('annotation')) !!};
		var SITE_NAME = '{{site()->meta('name')}} <span class="beta">Beta</span><span>Contracts</span>';
		@if(site()->isCountrySite())
		SITE_NAME = '{{site()->meta('name')}} <span class="beta">Beta</span><span> {{site()->meta('contract')}} Contracts</span>';
		@endif
		var Annotation = {!!json_encode($annotation)!!};
		var lang_category = {!! json_encode(trans('codelist/annotation.categories')) !!};
		var AWS_URL = "https://rc-stage.s3-us-west-2.amazonaws.com";
		var CONTACT_EMAIL = '{{site()->contactEmail()}}';
	</script>
	<style>
		.loading {
			position: absolute;
			top: 0px;
			border: 0px;
			left: 0px;
			right: 0px;
			text-align: center;
		}

		.loading p {
			margin-top: 200px;
		}
	</style>
</head>
<body data-spy="scroll">
<div id="wrapper">
	<div id="page-wrapper" class="not-front sidebar-collapse-container">
		<div id="app" class="main-app">
			<div class="loading"><p><img src="{{url('images/loading.gif')}}"/> Loading ...</p></div>
		</div>
	</div>
</div>
<script src="{{url('js/pdfjs/pdf.js')}}" type="text/javascript"></script>
<script src="{{url('js/popup.js')}}" type="text/javascript"></script>
</body>
</html>
