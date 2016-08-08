@extends('layout.app-full')
@section('css')
    <link rel="stylesheet" href="{{ url('css/annotation/annotator.css') }}">
    <style>
        .metadata-ocid a span {
            display: inline !important;
        }

        .metadata-info span {
            color: rgba(64, 64, 64, 0.7)
        }

        .loading {
            margin-top: 250px;
            text-align: center
        }
    </style>
@stop

@section('content')
    <?php
    $textDownloadUrl = ($contract->metadata->is_ocr_reviewed && site()->canDownloadWordFile()) ? route('contract.download', ['id' => $contract->metadata->open_contracting_id]) : "";
    $annotationsDownloadUrl = ($contract->annotations->total > 0) ? route('contract.annotations.download', ['id' => $contract->metadata->open_contracting_id]) : "";
    $local = app('App\Http\Services\LocalizationService');
    $languages = json_encode(config('language'));
    $contact_email = site()->contactEmail();
    ?>

    <div id="content">
        <div class="loading"><img src="{{url('images/loading.gif')}}"/>@lang('admin.loading')</div>
    </div>

@endsection
@section('js')
    <script src="{{ url('js/pdfjs/pdf.js') }}"></script>
    <script src="{{ url('js/pdfjs/pdf.worker.js') }}"></script>
    <script>
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

        var _lc = function(key, fallback){
            return typeof lang_category[key] != 'undefined' ? lang_category[key] : fallback;
        };

        var lang =  {!!  json_encode(trans('annotation')) !!};
        var langResource =  {!!  json_encode(trans('resources')) !!};
        var email = '<?php echo $contact_email; ?>';
        var back_url = '{!!$back!!}';
        var app_url = '{{url()}}';
        var category = '{{site()->meta('name')}}';

        var pdf_download_url = '{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}';
        var text_download_url = '{{$textDownloadUrl}}';
        var annotations_download_url = '{{$annotationsDownloadUrl}}';

        var contract = {!!json_encode($contract)!!};
        var contractTitle = contract.metadata.name;
        var esapi = '{{rtrim(env("ELASTIC_SEARCH_HOST"),'/')}}/';
        var facebook_share = 'https://www.facebook.com/sharer/sharer.php?u=';
        var google_share = 'https://plus.google.com/share?url=';
        var twitter_share = 'https://twitter.com/share?text={{ site()->meta('title')}}';
        var text_version_url = '{{url('/faqs#learn_more')}}';
        var processing_pdf_file_message = "{!!sprintf(trans('annotation.processing_pdf_file'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}";
        var not_published_message = "{!!sprintf(trans('annotation.not_published'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}";
        var pdf_not_shown_message = "{!!sprintf(trans('annotation.pdf_not_shown'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}";
        var languages = '{!! $languages !!}';
        var selectedLang = '{{config('language')[$local->getLanguage()]['name']}}';
        var currentUrl = '{{Request::url()}}';
        var languageImage = '{{getCountryByLang($lang->getCurrentLang())}}';
        var currentLanguage = '{{$lang->getCurrentLang()}}';
        var localisationState =  '{{config('localisation')}}';

		function isSite(type){
			var country_code =  '{{env('COUNTRY','')}}';
			var site ='{{env('CATEGORY')}}';
			if(country_code != ''){
				site = 'country'
			}
			return (site == type);
		}

        function getCountryName(code) {
            var countryList = {!! json_encode(trans('country')) !!};
            return countryList[code.toUpperCase()];
        }
    </script>
    <script src="{{ url('js/contract-view.js') }}"></script>
@stop