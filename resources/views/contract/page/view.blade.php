@extends('layout.app-full')

@section('css')
	<link rel="stylesheet" href="{{ url('css/contract.css') }}">
@stop

@section('content')
	<?php
	$textDownloadUrl = ($contract->metadata->is_ocr_reviewed && !site()->isOLC()) ? route('contract.download',['id' => $contract->metadata->open_contracting_id]) : "";
	$annotationsDownloadUrl = ($contract->annotations->total > 0) ? route('contract.annotations.download',['id' =>$contract->metadata->open_contracting_id]) : "";
	$local = app('App\Http\Services\LocalizationService');
	$languages = json_encode(config('language'));
	$contact_email = site()->contactEmail();
	?>
	<div class="row">
		<div class="col-lg-12 panel-top-wrapper attached-top-wrapper">
			<div class="panel-top-content">
				<div class="pull-left clearfix left-top-content">
					<div class="back back-button">Back</div>
					<div class="panel-title" id="show-full-title">
						{{$contract->metadata->name}}
					</div>
				</div>
				<div class="pull-right action-links">
					<ul>
						<li>
							<a class="view-summary-btn"
							   href={{route('contract.view',['id'=>$contract->metadata->open_contracting_id])}}>@lang('global.view_summary')</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div id="content">
		<div class="loading"><img src="{{url('images/loading.gif')}}"/>@lang('admin.loading')</div>
	</div>
@stop

@section('js')
	<script src="{{ url('js/pdfjs/pdf.js') }}"></script>
	<script>
		PDFJS.workerSrc = '{{url('js/pdfjs/pdf.worker.js')}}';
		var debug = function () {
			var DEBUG = false;
			if (DEBUG) {
				console.log("-----");
				for (var i = 0; i < arguments.length; i++) {
					console.log(arguments[i]);
				}
			}
		};
		var lang_category = {!! json_encode(trans('codelist/annotation.categories')) !!};

		var _lc = function (key, fallback) {
			return typeof lang_category[key] != 'undefined' ? lang_category[key] : fallback;
		};

		var lang =  {!!  json_encode(trans('annotation')) !!};
		var langResource =  {!!  json_encode(trans('resources')) !!};
		var langContractType =  {!!  json_encode(trans('codelist/contract_type')) !!};
		var langDisclosure = {!!  json_encode(trans('codelist/disclosure')) !!};
		var contractLang = {!!  json_encode(trans('codelist/contract')) !!};
		var langClip = {!! json_encode(trans('clip'))  !!};
		var clipUrl = '{{url('clip')}}';
		var email = '{{site()->contactEmail()}}';
		var back_url = '{!!$back!!}';
		var app_url = '{{url()}}';
		var category = '{{site()->getSiteType()}}';
		var pdf_download_url = '{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}';
		var text_download_url = '{{$textDownloadUrl}}';
		var annotations_download_url = '{{$annotationsDownloadUrl}}';
		var contract = {!!json_encode($contract)!!};
		var contractTitle = contract.metadata.name;
		var esapi = '{{rtrim(site()->esUrl(),'/')}}/';
		var facebook_share = 'https://www.facebook.com/sharer/sharer.php?u=';
		var google_share = 'https://plus.google.com/share?url=';
		var twitter_share = 'https://twitter.com/share?text=' + document.title;
		var text_version_url = '{{url('/faqs#learn_more')}}';

		var processing_pdf_file_message = '{{sprintf(trans('annotation.processing_pdf_file'),env('CONTACT_MAIL'))}}';
		var not_published_message = '{{sprintf(trans('annotation.not_published'),env('CONTACT_MAIL'))}}';
		var pdf_not_shown_message = '{{sprintf(trans('annotation.pdf_not_shown'),env('CONTACT_MAIL'))}}';

		var languages = '{!! $languages !!}';
		var selectedLang = '{{config('language')[$local->getLanguage()]['name']}}';
		var currentUrl = '{{Request::url()}}';
		var languageImage = '{{getCountryByLang($lang->getCurrentLang())}}';
		var currentLanguage = '{{$lang->getCurrentLang()}}';
		var localisationState = '{{config('localisation')}}';
		var isClipOn = '{{site()->isClipEnabled()}}';

		function isSite(type) {
			var site = '{{site()->getSiteType()}}';
			return (site == type);
		}

		function getCountryName(code) {
			var countryList = {!! json_encode(trans('country')) !!};
			return countryList[code.toUpperCase()];
		}
	</script>
	<script src="{{ url('js/contract-view.min.js') }}"></script>
@stop