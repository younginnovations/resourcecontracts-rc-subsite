<?php
$image_main = site()->getImageUrl('bg');
$image_intro = site()->getImageUrl('intro_bg');
?>
@extends('layout.app-full')
@section('css')
	<style>
		.petroleum-wrapper {
			background-image: url({{$image_main}});
			position: relative;
		}

		.img-intro {
			background-image: url({{$image_intro}});
		}
	</style>
@stop
@section('content')
	<div class="front-row-top-wrap">
		<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
			<div class="navbar-header">
				<span data-toggle="collapse-sidebar" data-target=".sidebar-collapse"
					  data-target-2=".sidebar-collapse-container"
					  class="pull-left trigger">
				</span>
				@include('layout.partials.logo')
			</div>
			<div class="clearfix" style="margin-right: 15px;">
				@include('layout.partials.language')
			</div>
		</nav>
	</div>
	<section class="hero-image">
		<div class="petroleum-wrapper">
			<div class="section-wrap">
				<div class="petroleum-mineral">
					{!! site()->meta('tagline') !!}
					<div class="clearfix">
						<form action="{{route('search/group')}}" method="GET" class="search-form" role="search">
							<div class="form-group clearfix">
								<input type="text" name="q" class="form-control"
									   placeholder="@lang('global.search') {{$contracts}} @lang('global.contracts') @lang('global.associated_documents')">
								<button type="submit" class="btn btn-default search-button">
									@lang('global.search')
								</button>
							</div>
						</form>
						<div class="advance-search">
							<a href="{{url('search/group')}}">@lang('global.advanced_search')</a>
						</div>
					</div>

					<div class="petroleum-list show-in-bigger-screen">
						<div class="col-md-12 col-sm-12 col-xs-12 text-center petroleum-list-inner">
							<div class="row">
								<div class="col-md-4 col-sm-4 col-xs-4 petroleum-list-each">
									<a href="{{route('contracts')}}">
										<h2 class="petroleum-list-title">{{$contracts}}</h2>
										<small>{{trans('global.documents')}}</small>
									</a>
								</div>
								@if(!site()->isCountrySite())
									<div class="col-md-4 col-sm-4 col-xs-4 petroleum-list-each">
										<a href="{{route('countries')}}">
											<h2 class="petroleum-list-title">{{$countries}}</h2>
											<small>{{trans('global.countries')}}</small>
										</a>
									</div>
								@endif
								<div class="col-md-4 col-sm-4 col-xs-4">
									<a href="{{route('resources')}}">
										<h2 class="petroleum-list-title">{{$resources}}</h2>
										<small>{{trans('global.resources')}}</small>
									</a>
								</div>
							</div>
						</div>
						<div class="clear"></div>
						<div class="list-item-wrap">
							<div class="inner-list-item">
								<label class="group-item-title">{{trans('global.explore_contract_terms')}}:</label>
								<ul class="list-group">
									@foreach($links as $link)
										<li class="list-group-item">
											<a href="{{$link['url']}}">{{$link['title']}}</a>
										</li>
									@endforeach
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			@if(site()->isRC())
				<div class="landing_section_logos">
					<div class="partners">
						<p>@lang('global.partners')</p>
						<a href="http://www.resourcegovernance.org/"
						   target="_blank" class="nrgi">
							<img src="{{url('images/NRGI_logo.png')}}" alt="NRGI" width="114" height="45" loading="lazy">
						</a>
						<a href="http://ccsi.columbia.edu/"
						   target="_blank">
							<img src="{{url('images/CCSI_logo.png')}}" class="ccsi" alt="CCSI" width="224" height="40" loading="lazy">
						</a>
						<a href="http://www.worldbank.org/en/topic/governance"
						   target="_blank">
							<img src="{{url('images/WORLDBANK_logo.png')}}" alt="World Bank" width="109" height="45" loading="lazy">
						</a>

						<a href="http://openoil.net"
						   target="_blank">
							<img src="{{url('images/OO_logo.png')}}" alt="Open Oil" width="50" height="45" loading="lazy">
						</a>
					</div>
					<div class="donors">
						<p>@lang('global.donors')</p>
						<a href="http://www.dfid.gov.uk"
						   target="_blank">
							<img src="{{url('images/UKAid_logo.png')}}" alt="UKAid" width="134" height="45" loading="lazy">
						</a>
						<a href="http://alsf.afdb.org/"
						   target="_blank">
							<img src="{{url('images/ALSF_logo.png')}}" alt="ALSF" width="113" height="45" loading="lazy">
						</a>
					</div>
				</div>
			@endif
		</div>
		<div class="petroleum-list show-in-small-screen">
			<div class="col-md-12 col-sm-12 col-xs-12 text-center petroleum-list-inner">
				<div class="row">
					<div class="col-md-4 col-sm-4 col-xs-4 petroleum-list-each">
						<a href="{{route('contracts')}}">
							<h2 class="petroleum-list-title">{{$contracts}}</h2>
							<small>{{trans('global.documents')}}</small>
						</a>
					</div>
					@if(!site()->isCountrySite())
						<div class="col-md-4 col-sm-4 col-xs-4 petroleum-list-each">
							<a href="{{route('countries')}}">
								<h2 class="petroleum-list-title">{{$countries}}</h2>
								<small>{{trans('global.countries')}}</small>
							</a>
						</div>
					@endif
					<div class="col-md-4 col-sm-4 col-xs-4">
						<a href="{{route('resources')}}">
							<h2 class="petroleum-list-title">{{$resources}}</h2>
							<small>{{trans('global.resources')}}</small>
						</a>
					</div>
				</div>
			</div>
			<div class="clear"></div>
			<div class="list-item-wrap">
				<div class="inner-list-item">
					<label class="group-item-title">{{trans('global.explore_contract_terms')}}:</label>
					<ul class="list-group">
						@foreach($links as $link)
							<li class="list-group-item">
								<a href="{{$link['url']}}">{{$link['title']}}</a>
							</li>
						@endforeach
					</ul>
				</div>
			</div>
		</div>
	</section>

	<?php $homepage_text = getOptionText('homepage_text');?>
	@if($homepage_text != '')
		<section class="img-intro">
			<div class="img-intro-text">
				<p>
					{{$homepage_text}}
					<a href="{{route('about')}}">{{trans('global.learn_more')}}</a>
				</p>
			</div>
		</section>
	@endif

	@if( !site()->isCountrySite())
		<section class="explore-contracts">
			<div class="map-wrapper">
				<h2 class="heading2">@lang('global.explore_contracts')</h2>
				<div id="map" class="map-wrap"></div>
			</div>
		</section>
		@if(isset($countryPartners) && count($countryPartners) > 0)
			<section class="country-partners">
				<div class="container wrapper country-partners-wrapper">
					<h2 class="heading2">{{trans('global.country_partners')}}</h2>
					<div class="col-md-12 col-sm-12">
						<div class="countrypartner">
							<div class="slider autoplay" dir="ltr">
								@foreach($countryPartners as $partner)
									<div class="multiple">
										<a target="_blank" href="{{$partner->link}}">
											<img src="{{$partner->image}}" alt="">
										</a>
									</div>
								@endforeach
							</div>
						</div>
					</div>
				</div>
			</section>
		@endif
	@endif
@stop

@if( !site()->isCountrySite())
@section('js')
	<script>
		var landColor = '{!! site()->isRC()?'#fff':'#fff' !!}';
		var highlightColor = '{!! site()->isRC()?'#FBCE9D':'#70bf4c' !!}';
		var selectedCountries = '{!! json_encode($countryList) !!}';
		var standardCountry = {!! json_encode(trans('country')) !!};
		var documentLang = '{{trans('global.document')}}';
		var documentsLang = '{{trans('global.documents')}}';
	</script>
	<script src="{{url('js/homepage.js')}}"></script>
@stop
@endif
