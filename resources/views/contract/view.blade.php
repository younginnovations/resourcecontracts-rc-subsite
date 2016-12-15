@extends('layout.app-full')

@section('css')
	<link rel="stylesheet" href="{{ url('css/contract.css') }}">
	<style>
		.text-viewer > span {
			min-height: 400px;
		}

		#contract .loader {
			margin-top: 200px;
			margin-bottom: 200px;
			text-align: center;
		}
	</style>
	<script>
		var timeout = setTimeout(function () {
			if (window.location.hash && window.location.hash.indexOf('pdf') > 0) {
				document.location.href = window.location.hash.replace('pdf', 'text');
				document.getElementById('loading-text').innerHTML = '@lang('contract.loading_redirect')';
			}
		}, 15000);
	</script>
@stop
@section('content')
	<div id="contract">
		<div class="loader">
			<img src="{{url('images/loading.gif')}}"/> <span id="loading-text">@lang('contract.loading')</span>
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

		var debug = function () {
			if (config.debug) {
				console.log("---------------------------");
				for (var i = 0; i < arguments.length; i++) {
					console.log(arguments[i]);
				}
			}
		};
	</script>
	<script src="{{url('js/annotator/annotator-full.min.js')}}"></script>
	<script src="{{url('js/annotator/annotator.utils.js')}}"></script>
	<script src="{{url('js/pdfjs/pdf.js')}}"></script>
	<script>
		PDFJS.workerSrc = "{{url('js/pdfjs/pdf.worker.js')}}"
	</script>
	<script src="{{ url('js/contract_view.js') }}"></script>
@stop