<?php
$image_main = site()->getImageUrl('bg');
$image_intro = site()->getImageUrl('intro_bg');
?>
@extends('layout.new-app-full')
@section('css')
	<style>
		.main-container {
			background-image: url({{$image_main}});
			position: relative;
		}
		.img-intro {
			background-image: url({{$image_intro}});
		}
	</style>
@stop
@section('content')
	<section class="hero-image">
		<div class="petroleum-wrapper">
			<div class="section-wrap">
				<!-- {!! site()->meta('new_tag_line') !!} -->
				<!-- <div>
					<form action="{{route('search')}}" method="GET" class="search-form" role="search">
						<div class="form-group clearfix">
							<input type="text" name="q" class="form-control"
								   placeholder="@lang('global.search') {{$contracts}} @lang('global.contracts') @lang('global.associated_documents')">
							<button type="submit" class="btn btn-default search-button">
								@lang('global.search')
							</button>
						</div>
					</form>
				</div> -->
				<div class="petroleum-title">
					{!! site()->meta('new_tag_line') !!}
				</div>
				<div class="petroleum-content">
					<div class="row petroleum-box-wrapper">
						<div class="col-md-4 col-sm-4 col-xs-4 petroleum-list-each petroleum-box box-search">
							<a href="{{route('search/group')}}">
								<i>search</i>
								<h2 class="petroleum-list-title">{{$contracts}}</h2>
								<small class="petroleum-box-title">{!! site()->meta('search') !!}</small>
							</a>
						</div>
						@if(!site()->isCountrySite())
							<div class="col-md-4 col-sm-4 col-xs-4 petroleum-list-each petroleum-box box-countries">
								<a href="{{route('countries')}}">
									<i>countries</i>
									<h2 class="petroleum-list-title">{{$countries}}</h2>
									<small class="petroleum-box-title">{{trans('global.countries')}}</small>
								</a>
							</div>
						@endif
						<div class="col-md-4 col-sm-4 col-xs-4 petroleum-box box-recent">
							<a href="{{route('search/group', ['recent' => 1])}}">
								<i>recent</i>
								<h2 class="petroleum-list-title">{{$resources}}</h2>
								<small class="petroleum-box-title">{!! site()->meta('recent') !!}</small>
							</a>
						</div>
					</div>

					<div class="get-started">
						<h3><a href="{{route('page.resources')}}">{{ trans('global.get_started') }}</a></h3>
						<p>{{ trans('global.get_started_desc') }}</p>
					</div>
				</div>
				{{--<div class="search-box">
					<form action="{{route('search')}}" method="GET" role="search">
						<input type="text" name="q" placeholder="{{trans('global.search_box_text')}}"/>
					</form>
				</div>--}}
			</div>
			@if(site()->isRC())
			<div class="landing_section_logos">
				<div class="partners">
					<h3>@lang('global.partners')</h3>
					<a href="http://www.resourcegovernance.org/"
					   target="_blank" class="nrgi" title="Natural Resource Governance Institute">
						<img src="{{url('images/NRGI_logo@2x.png')}}" alt="NRGI" width="113" height="45">
					</a>
					<a href="http://ccsi.columbia.edu/"
					   target="_blank" title="Columbia Center on Sustainable Investment">
						<img src="{{url('images/CCSI_logo@2x.png')}}" class="ccsi" alt="CCSI" width="252" height="45">
					</a>
					<a href="http://www.worldbank.org/en/topic/governance"
					   target="_blank" title="The World Bank">
						<img src="{{url('images/WORLDBANK_logo@2x.png')}}" alt="World Bank" width="108" height="45">
					</a>

						<a href="http://openoil.net"
						target="_blank" title="Open Oil">
							<img src="{{url('images/OO_logo@2x.png')}}" alt="Open Oil" width="50" height="45">
						</a>
					</div>
					<div class="donors">
						<h3>@lang('global.donors')</h3>
						<a href="http://www.dfid.gov.uk"
						   target="_blank" title="UKAid">
							<img src="{{url('images/UKAid_logo@2x.png')}}" alt="UKAid" width="134" height="45">
						</a>
						<a href="http://alsf.afdb.org/"
						   target="_blank" title="ALSF">
							<img src="{{url('images/ALSF_logo@2x.png')}}" alt="ALSF" width="113" height="45">
						</a>
					</div>
				</div>
			</div>
			@endif
		</div>
	</section>
@stop

@if( !site()->isCountrySite())
@section('js')
	<script>
        var landColor = '{!! site()->isRC()?'#f1f1f1':'#fff' !!}';
        var highlightColor = '{!! site()->isRC()?'#FCCE99':'#70bf4c' !!}';
        var selectedCountries = '{!! json_encode($countryList) !!}';
        var standardCountry = {!! json_encode(trans('country')) !!};
        var documentLang = '{{trans('global.document')}}';
        var documentsLang = '{{trans('global.documents')}}';

		// $(document).ready(function () {
		// 	$('.box-search').click(function () {
		// 		$('.petroleum-content').hide();
		// 		$('.search-box').show();
		// 	});
		// });
	</script>
	<script src="{{url('js/homepage.js')}}"></script>
@stop
@endif

