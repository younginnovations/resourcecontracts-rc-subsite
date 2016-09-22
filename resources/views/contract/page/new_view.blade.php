@extends('layout.app-full')
@section('css')
	<link href="{{url('css/rc-contract-view.css')}}" rel="stylesheet">
	<link href="{{url('css/annotation/annotator.css')}}" rel="stylesheet">
	<style>
		.pdf-annotator, .text-annotator{
			padding-right: 5px;
		}
	</style>
@stop
@section('content')
	<div id="contract">
		<div class="loading"><img src="{{url('images/loading.gif')}}"/>@lang('admin.loading')</div>
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
		config.debug = true;
		config.ES_URL = '{{ url('api') }}/';
		config.APP_URL = '{{ url() }}';
		config.contract = {!!json_encode($contract)!!};
		config.countryList = {!! json_encode(trans('country')) !!};
		config.siteKey = '{{site()->getSiteKey()}}';
		config.lang_categories = {!! json_encode(trans('codelist/annotation.categories')) !!};
		config.share = {
			facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
			google: 'https://plus.google.com/share?url=',
			twitter: 'https://twitter.com/share?text={{ site()->meta('title')}}'
		};
		config.download = {
			'pdf': '{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}',
			'text': '{{$textDownloadUrl}}',
			'annotation': '{{$annotationsDownloadUrl}}'
		};
		config.message = {
			text_not_published: "{!!sprintf(trans('annotation.processing_pdf_file'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}",
			pdf_not_loading: "{!!sprintf(trans('annotation.pdf_not_shown'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}"
		};

		LANG = {!! json_encode(trans('annotation')) !!};
		LANG.resourceLang = {!! json_encode(trans('resources')) !!};

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
	<script src="{{url('js/annotator/annotator.plugin.event.js')}}"></script>
	<script src="{{url('js/annotator/annotator.plugin.viewer.js')}}"></script>
	<script src="{{url('js/annotator/pdf-annotator.js')}}"></script>
	<script src="{{url('js/pdfjs/pdf.js')}}"></script>
	<script>
		PDFJS.workerSrc = "{{url('js/pdfjs/pdf.worker.js')}}"
	</script>
	<script src="{{ url('js/contract_view.js') }}"></script>
@stop