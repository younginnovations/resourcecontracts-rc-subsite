@extends('layout.app-full')

@section('css')
	<link rel="stylesheet" href="{{ url('css/contract.css?v=1.03') }}">
	<script>
		var slowConnection = false;
		var timeout = setTimeout(function () {
			if (window.location.hash.indexOf('text') < 0) {
				if (window.location.hash.indexOf('pdf') > 0) {
					document.location.href = window.location.hash.replace('pdf', 'text');
				} else {
					document.location.href = window.location.pathname + '#/text';
				}
				slowConnection = true;
				document.getElementById('loader').innerHTML = '<img src="{{generate_url('images/loading.gif')}}"> @lang('contract.loading_redirect')';
			}
		}, 25000);
	</script>
@stop
@section('content')
	<div id="contract">
		<div id="loader" class="loader">
			<img src="{{secure_asset('images/loading.gif')}}"/> @lang('contract.loading')
		</div>
	</div>
@stop
@section('js')
	<?php
	$textDownloadUrl = ($contract->metadata->is_ocr_reviewed && site()->canDownloadWordFile()) ? route(
			'contract.download',
			['id' => $contract->metadata->open_contracting_id]
	) : "";
	$annotationsDownloadUrl = ($contract->annotations->total > 0) ? route(
			'contract.annotations.download',
			['id' => $contract->metadata->open_contracting_id]
	) : "";
	$contact_email = site()->contactEmail();
	?>
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
		config.download = {
			'pdf': '{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}',
			'text': '{{$textDownloadUrl}}',
			'annotation': '{{$annotationsDownloadUrl}}'
		};
		config.message = {
			text_not_published: "{!!sprintf(trans('annotation.processing_pdf_file'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}",
			pdf_not_loading: "{!!sprintf(trans('annotation.pdf_not_shown'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}",
			text_disclaimer: "{!!trans('annotation.text_created_automatically').' <a target=\"_blank\" href=\"'.url('/faqs#learn_more').'\">'.trans('annotation.learn_more').'</a>'!!}"
		};
		config.isClipOn = '{{site()->isClipEnabled()}}';
		var LANG = {!! json_encode(trans('annotation')) !!};
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
	<script src="{{generate_asset_url('js/annotator/annotator-full.min.js')}}"></script>
	<script src="{{generate_asset_url('js/annotator/annotator.utils.js')}}"></script>
	<script src="{{generate_asset_url('js/pdfjs/pdf.js')}}"></script>
	<script>
		PDFJS.workerSrc = "{{generate_asset_url('js/pdfjs/pdf.worker.js')}}"
	</script>
	<script src="{{ generate_asset_url('js/contract_view.js') }}"></script>
@stop