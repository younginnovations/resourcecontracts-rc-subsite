<!DOCTYPE html>
<html lang="en">
<head>
	<title> {{ meta('')->title }}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	@if(env("CATEGORY")=="rc")
		<link rel="icon" href="{{url('images/favicon.ico')}}">
	@else
		<link rel="icon" href="{{url('images/olc/favicon.ico')}}">
	@endif

	<link rel="stylesheet" href="{{ url('css/annotation/annotator.css') }}">
	<link href="{{url('css/'.meta()->category.'-contract-view.css')}}" rel="stylesheet">

	<link href="{{url('css/style.min.css')}}" rel="stylesheet"/>
	<link href="{{url('css/'.meta()->category.'-style.css')}}" rel="stylesheet">

	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
	<script>
		const APP_URL = '{{ url()}}';
		const LANG = {!! json_encode(trans('annotation')) !!};
		const SITE_NAME = '{{meta()->name}}';
		const Annotation = {!!json_encode($annotation)!!};
		const lang_category = {!! json_encode(trans('codelist/annotation.categories')) !!};
		const AWS_URL = "https://rc-stage.s3-us-west-2.amazonaws.com";
		const CONTACT_EMAIL = '{{env('CONTACT_MAIL')}}';
	</script>

	<style>
		.loading {
			position: absolute;
			top: 30%;
			border: 0px;
			left: 0px;
			right: 0px;
			text-align: center;
			width: auto;
			background: none;
		}

		.loading p {
			text-indent: 0;
		}

		@media (max-width: 600px){
			.loading {
				top: 45%;
			}
		}
	</style>
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
