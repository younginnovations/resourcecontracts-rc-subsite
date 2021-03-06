<?php
$image_main = site()->getImageUrl('bg');
$image_intro = site()->getImageUrl('intro_bg');
$currentLang = app('translator')->getLocale();
?>
@extends('layout.new-app-full')
@section('css')
	<style>
		.hero-image {
			background-image: url({{$image_main}} );
			position: relative;
		}

		.img-intro {
			background-image: url({{$image_intro}});
		}
	</style>
@stop
@section('content')
	<div class="hero-image">
		<div class="hero-wrap">
			<div class="hero-title">
				<span>{{ $text->homepage_new_sub_tag_line_text->$currentLang or ''}} </span>
				<h1>{{ $text->homepage_new_tag_line_text->$currentLang or ''}} </h1>
				<p>{{ $text->homepage_new_tag_line_desc_text->$currentLang or ''}} </p>
				<form action="{{route('search/group')}}" method="GET" class="search-form" role="search">
					<div class="form-group clearfix">
						<input type="text" name="q" class="form-control" id="doc-search-field"
							   placeholder="@lang('global.search') {{$contracts}} {{ $text->homepage_search_placeholder_text->$currentLang or ''}}..."
							   autocomplete="off">
						<button>@lang('global.search')</button>
					</div>
				</form>
				<div class="get-started">
					<h3>
						<a href="{{site()->isOLC()?route('guides'):route('faqs')}}"> {{ $text->homepage_get_started_text->$currentLang or ''}}</a>
					</h3>
				</div>
			</div>
			<div class="hero-right-wrap">
				@if(site()->isOLC())
					<img src="{{url('images/CCSI_logo.png')}}" class="ccsi" alt="CCSI" width="252" height="45">
				@endif
				<div class="annotation-wrapper">
					<span>{{ $text->homepage_annotation_navigation_text->$currentLang or ''}}</span>
					<div class="annotation-wrap">
						@foreach($links as $link)
							<div class="annotation-wrap-title">
								<a href="{{$link['url']}}">{{$link['title']}}</a>
							</div>
						@endforeach
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="content-count-wrap">
		<div class="count-block count-search">
			<a href="{{route('search/group')}}">
				<h2 class="petroleum-list-title">{{$contracts}} @lang('global.documents')</h2>
				<span class="view">@lang('global.view')</span>
			</a>
		</div>

		@if(!site()->isCountrySite())
			<div class="count-block count-countries">
				<a href="{{route('countries')}}">
					<h2 class="petroleum-list-title">{{$countries}} @lang('global.countries')</h2>
					<span class="view">@lang('global.view')</span>
				</a>
			</div>
		@endif

		<div class="count-block count-resources">
			<a href="{{route('resources')}}">
				<h2 class="petroleum-list-title">{{$resources}} @lang('global.resources')</h2>
				<span class="view">@lang('global.view')</span>
			</a>
		</div>
		<div class="count-block count-recent">
			<a href="{{route('search/group', ['recent' => 1])}}">
				<h2 class="petroleum-list-title">{{$recent_contracts}} @lang('global.recent_documents')</h2>
				<span class="view">@lang('global.view')</span>
			</a>
		</div>
	</div>
	<div class="explore-contracts">
		<div class="map-wrapper">
			<h2 class="heading2">{{ $text->homepage_map_card_text->$currentLang or ''}}</h2>
			<div id="map" class="map-wrap"></div>
		</div>
	<!-- <div class="landing_section_logos">
			<div class="partners">
				<h3>@lang('global.partners')</h3>
				<a href="http://www.resourcegovernance.org/" target="_blank" class="nrgi"
				   title="Natural Resource Governance Institute">
					<img src="{{url('images/NRGI_logo.png')}}" alt="NRGI" width="113" height="45">
				</a>
				<a href="http://ccsi.columbia.edu/" target="_blank" title="Columbia Center on Sustainable Investment">
					<img src="{{url('images/CCSI_logo.png')}}" class="ccsi" alt="CCSI" width="252" height="45">
				</a>
				<a href="http://www.worldbank.org/en/topic/governance" target="_blank" title="The World Bank">
					<img src="{{url('images/WORLDBANK_logo.png')}}" alt="World Bank" width="108" height="45">
				</a>

				<a href="http://openoil.net" target="_blank" title="Open Oil">
					<img src="{{url('images/OO_logo.png')}}" alt="Open Oil" width="50" height="45">
				</a>
			</div>
			<div class="donors">
				<h3>@lang('global.donors')</h3>
				<a href="http://www.dfid.gov.uk" target="_blank" title="UKAid">
					<img src="{{url('images/UKAid_logo.png')}}" alt="UKAid" width="134" height="45">
				</a>
				<a href="http://alsf.afdb.org/" target="_blank" title="ALSF">
					<img src="{{url('images/ALSF_logo.png')}}" alt="ALSF" width="113" height="45">
				</a>
			</div>
		</div> -->
	</div>
@stop

@if( !site()->isCountrySite())
@section('js')
	<script>
        var highlightColor = '{!! site()->isRC()?'#FBCE9D':'#27AE60' !!}';
        var landColor = '#fff';
        var selectedCountries = '{!! json_encode($countryList) !!}';
        var standardCountry = {!! json_encode(trans('country')) !!};
        var documentLang = '{{trans('global.document')}}';
        var documentsLang = '{{trans('global.documents')}}';
        var searchLang = '{{trans('global.search')}}';
        var total_docs = '{!! $contracts !!}';
	</script>
	<script src="{{url('js/homepage.js')}}"></script>
	<script>
        $("body").hasClass("lang-ar") ? $(".annotation-wrap").slick({
            dots: !0,
            arrows: !1,
            autoplay: !0,
            autoplaySpeed: 2400,
            rtl: !0
        }) : $(".annotation-wrap").slick({dots: !0, arrows: !1, autoplay: !0, autoplaySpeed: 2400});

        if ($(window).width() < 350) {
            $('#doc-search-field').attr("placeholder", searchLang);
        } else if ($(window).width() > 350 && $(window).width() < 600) {
            let placeholder = searchLang + ' ' + total_docs + ' ' + documentsLang;
            $('#doc-search-field').attr("placeholder", placeholder);
        }
        $(window).resize(function () {
            if ($(window).width() < 350) {
                $('#doc-search-field').attr("placeholder", searchLang);
            } else if ($(window).width() > 350 && $(window).width() < 600) {
                let placeholder = searchLang + ' ' + total_docs + ' ' + documentsLang;
                $('#doc-search-field').attr("placeholder", placeholder);
            } else {
                let placeholder = searchLang + ' ' + total_docs + ' ' + '{!! $text->homepage_search_placeholder_text->$currentLang  or "" !!}...';
                $('#doc-search-field').attr("placeholder", placeholder);
            }
        });
	</script>
@stop
@endif
