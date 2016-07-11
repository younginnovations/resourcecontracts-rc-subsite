@extends('layout.app-blank')
@section('css')
    <link rel="stylesheet" href="{{ url('css/annotation/annotator.css') }}">
    @if(env("CATEGORY")=="rc")
        <link href="{{url('css/rc-contract-view.css')}}" rel="stylesheet">
    @endif
    @if(env("CATEGORY")=="olc")
        <link href="{{url('css/olc-contract-view.css')}}" rel="stylesheet">
    @endif
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
    $textDownloadUrl = ($contract->metadata->is_ocr_reviewed && env('CATEGORY') != "olc") ? route('contract.download', ['id' => $contract->metadata->open_contracting_id]) : "";
    $annotationsDownloadUrl = ($contract->annotations->total > 0) ? route('contract.annotations.download', ['id' => $contract->metadata->open_contracting_id]) : "";
    $local = app('App\Http\Services\LocalizationService');
    $languages = json_encode(config('language'));
    $contact_email = env('CONTACT_MAIL');
    ?>
    <div class="title-wrap">
        <nav class="clearfix navbar">
            <div class="navbar-header">
                <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
                <a class="navbar-brand" href={{url('/')}} >{{env('CATEGORY')=='rc' ? 'Resource' : 'Openland' }}<span class="beta">Beta</span><span>Contracts</span></a>
            </div>

            <div class="col-sm-12 col-md-9 col-lg-10 navbar-right">
                    @include('layout.partials.search')
            </div>

            @if(config('localisation'))
                <div class="dropdown language-selector" >
                    <button class="btn  dropdown-toggle"  data-toggle="dropdown" id="dropdownMenu2" aria-expanded="false">
                        <img style="width: 16px ; height: 16px; margin-right: 6px;" src="{{getCountryByLang(app('translator')->getLocale())}}"/>{{config('language')[app('translator')->getLocale()]['name']}}
                        <span class="caret"></span>
                    </button>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style="min-width: 110px;">

                        @foreach (config('language') as $locale => $language)
                            @if(app('translator')->getLocale()!=$locale)
                                <li>
                                    <a href={{lang_url($locale)}}>
                                        <img style="width: 16px ; height: 16px; margin-right: 6px;" src="{{getCountryByLang($locale)}}"/>
                                        {{$language['name']}}
                                    </a>
                                </li>
                            @endif
                        @endforeach

                    </ul>
                </div>
            @endif
        </nav>
        <div class="col-lg-12 panel-top-wrapper attached-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left clearfix left-top-content">
                    <div class="back back-button">Back</div>
                    <div class="panel-title" id="show-full-title">
                        {{$contract->metadata->name}}
                    </div>
                </div>

                <div class="pull-right action-links">
                    <ul><li>
                            <a  class="view-summary-btn" href={{route('contract.view',['id'=>$contract->metadata->open_contracting_id])}}>@lang('global.view_summary')</a>
                        </li></ul>
                </div>
            </div>
        </div>
    </div>
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
        var langDisclosure =  {!!  json_encode(trans('codelist/disclosure')) !!};
        var langContractType = {!! json_encode(trans('codelist/contract_type')) !!};
        var langResource =  {!!  json_encode(trans('resources')) !!};
        var email = '<?php echo $contact_email; ?>';
        var back_url = '{!!$back!!}';
        var app_url = '{{url()}}';
        var category = '{{env('CATEGORY')=='rc' ? 'Resource' : 'Openland' }}';
        var pdf_download_url = '{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}';
        var text_download_url = '{{$textDownloadUrl}}';
        var annotations_download_url = '{{$annotationsDownloadUrl}}';
        var contract = {!!json_encode($contract)!!};
        var contractTitle = contract.metadata.name;
        var esapi = '{{rtrim(env("ELASTIC_SEARCH_HOST"),'/')}}/';
        var facebook_share = 'https://www.facebook.com/sharer/sharer.php?u=';
        var google_share = 'https://plus.google.com/share?url=';
        var twitter_share = 'https://twitter.com/share?text={{ meta($meta)->title }}';
        var text_version_url = '{{url('/faqs#learn_more')}}';
        var processing_pdf_file_message = "{!!sprintf(trans('annotation.processing_pdf_file'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}";
        var not_published_message = "{!!sprintf(trans('annotation.not_published'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}";
        var pdf_not_shown_message = "{!!sprintf(trans('annotation.pdf_not_shown'),'<a href=\"mailto:'.$contact_email.'\">'.$contact_email.'</a>')!!}";
        var languages = '{!! $languages !!}';
        var selectedLang = '{{config('language')[$local->getLanguage()]['name']}}';
        var currentUrl = '{{Request::url()}}';
        var country = '{{get_country('name')}}';
        var image_source = '{{get_country('flag')}}';
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