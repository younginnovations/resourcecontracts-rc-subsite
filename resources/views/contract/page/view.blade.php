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
    <div id="content">
        <div class="loading"><img src="{{url('images/loading.gif')}}"/>@lang('admin.loading')</div>
    </div>
    <?php
    $textDownloadUrl = ($contract->metadata->is_ocr_reviewed && env('CATEGORY') != "olc") ? route('contract.download', ['id' => $contract->metadata->open_contracting_id]) : "";
    $annotationsDownloadUrl = ($contract->annotations->total > 0) ? route('contract.annotations.download', ['id' => $contract->metadata->open_contracting_id]) : "";
    $local = app('App\Http\Services\LocalizationService');
    $languages = json_encode(config('language'));

    ?>
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
        var email = '<?php echo env('CONTACT_MAIL'); ?>';
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
        var learn_more_url = '{{url('/faqs#link_learn_more')}}';
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
    </script>
    <script src="{{ url('js/contract-view.js') }}"></script>
@stop