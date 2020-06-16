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
	<link href="{{url('css/style.css')}}" rel="stylesheet"/>
	<link href="{{url('css/contract.css')}}" rel="stylesheet"/>
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
		// const AWS_URL = "https://resourcecontracts-nrgi.s3-us-west-2.amazonaws.com"; // TODO uncomment this for production url
		const AWS_URL = "https://resourcecontracts-admin-demo.s3-us-west-2.amazonaws.com";
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
<script>
	var config = {};
	config.debug = false;
	config.ES_URL = '{{ url('api') }}/';
	config.APP_URL = '{{ url() }}';
	config.contract = {!!json_encode($contract)!!};
	config.countryList = {!! json_encode(trans('country')) !!};
	config.siteKey = '{{site()->getSiteKey()}}';
	config.lang_categories = {!! json_encode(trans('codelist/annotation.categories')) !!};
	config.share = {
		facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
		google: 'https://plus.google.com/share?url=',
		twitter: 'https://twitter.com/share?text=' + document.title
	};
	LANG.resourceLang = {!! json_encode(trans('resources')) !!};
	LANG.disclosure = {!! json_encode(trans('codelist/disclosure')) !!};
	LANG.contract = {!! json_encode(trans('contract')) !!};
	LANG.contract_type = {!! json_encode(trans('codelist/contract_type')) !!};
	LANG.current = '{!! app('translator')->getLocale() !!}';
	var debug = function () {
		if (config.debug) {
			console.log("---------------------------");
			for (var i = 0; i < arguments.length; i++) {
				console.log(arguments[i]);
			}
		}
	};
</script>

<script src="{{url('js/plugins-bundle.js')}}"></script>
<script src="{{url('js/annotator/annotator-full.min.js')}}"></script>
<script src="{{url('js/annotator/annotator.utils.js')}}"></script>
<script src="{{url('js/pdfjs/pdf.js')}}"></script>
<script>
	PDFJS.workerSrc = "{{url('js/pdfjs/pdf.worker.js')}}"
</script>
<script src="{{url('js/popup.js')}}" type="text/javascript"></script>
</body>
</html>
