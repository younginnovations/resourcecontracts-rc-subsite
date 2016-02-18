@extends('layout.app-blank')
@section('css')
    <link rel="stylesheet" href="{{ url('css/annotation/annotator.css') }}">
    <style>

        .note-wrapper {
            background: #f9f9f9;
            margin: 20px 14px 10px;
            padding: 12px;
            display: block;
            overflow: hidden;
        }

        .metadata-note {
            padding: 0 4px 3px 0!important;
            font-family: "open-sans-bold";
            color: #666;
        }

        .note {
            display: block;
            margin-top: 0;
        }

        .note-inner-wrapper+a {
            float: right;
        }

        .note-inner-wrapper+a:focus {
            text-decoration: none;
        }
        .note-wrapper:empty {
            display: none;
        }


        .social-share li {
            list-style: none;
            float: left;
            margin-right: 6px;
        }

        .pdf-zoom-options > .btn-default  a {
            line-height: 20px;
            display: block;
        }
        .pdf-zoom-options > span {
            font-size: 12px;
            float: left;
        }

        .pdf-zoom-options p {
            display: inline-block;
        }

        .pdf-zoom-options {
            padding: 4px 0;
            border-left: 1px solid #DCDFE2  ;
            float: left;
            margin: 0;
        }

        .pdf-zoom-options > span {
            font-size: 14px;
            margin-left: 11px;
            margin-top: 6px;
        }

        .pdf-zoom-options > .btn-default  {
            width: 24px;
            height: 22px;
            background: #fff;
            border: 1px solid #ccc;
            text-align: center;
            margin: 5px 10px;
            padding: 0;
        }

        .parent-contract {
            display: flex!important;
            align-items: center;
            font-weight: bold;
        }

        .parent-contract > span:last-of-type {
            font-size: 11px;
            margin-left: 4px;
            color: #888;
        }
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
    <div class="title-wrap clearfix">
        <nav class="clearfix navbar">
            <div class="navbar-header">
                <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
                <a class="navbar-brand" href="{{url()}}">
                    <span class="country-flag">
                        <img src="{{get_country('flag')}}"/>
                    </span>
                    {{ get_country('name') }}
                    <span>Resource Contracts</span>
                </a>
            </div>

            <div class="right-header-section navbar-right hidden">
                    @include('layout.partials.search')
            </div>
            <div class="floated-top-div">
                @if(isClipOn())

                    <div class="clip-head">
                        <a href="{{route('clip.index')}}" id="annotation-count" style="display: none"></a>
                        <a class="" id="hide-annotation" style="display: none">@lang('clip.hide')</a>
                    </div>
                @endif
            </div>

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
        var langResource =  {!!  json_encode(trans('resources')) !!};
        var langClip = {!! json_encode(trans('clip'))  !!};
        var clipUrl= '{{route('clip.index')}}';
        var email = '<?php echo env('CONTACT_MAIL'); ?>';
        var back_url = '{!!$back!!}';
        var app_url = '{{url()}}';
        var category = '{{env('CATEGORY')=='rc' ? 'Resource' : 'Openland' }}';
        var pdf_download_url = '{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}';
        var text_download_url = '{{$textDownloadUrl}}';
        var annotations_download_url = '{{$annotationsDownloadUrl}}';
        var contract = {!!json_encode($contract)!!};
        var contractTitle = contract.metadata.name;
        var esapi = '{{url('api')}}/';
        var facebook_share = 'https://www.facebook.com/sharer/sharer.php?u=';
        var google_share = 'https://plus.google.com/share?url=';
        var twitter_share = 'https://twitter.com/share?text={{ meta($meta)->title }}';
        var text_version_url = '{{url('/faqs#learn_more')}}';

        var processing_pdf_file_message = '{{sprintf(trans('annotation.processing_pdf_file'),env('CONTACT_MAIL'))}}';
        var not_published_message = '{{sprintf(trans('annotation.not_published'),env('CONTACT_MAIL'))}}';
        var pdf_not_shown_message = '{{sprintf(trans('annotation.pdf_not_shown'),env('CONTACT_MAIL'))}}';

        var languages = '{!! $languages !!}';
        var selectedLang = '{{config('language')[$local->getLanguage()]['name']}}';
        var currentUrl = '{{Request::url()}}';
        var country = '{{get_country('name')}}';

        var image_source = '{{get_country('flag')}}';
        var languageImage = '{{getCountryByLang($lang->getCurrentLang())}}';
        var currentLanguage = '{{$lang->getCurrentLang()}}';
        var localisationState =  '{{config('localisation')}}';
        var isClipOn = '{{isClipOn()}}';

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