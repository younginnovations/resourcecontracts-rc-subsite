<?php
use \Illuminate\Support\Facades\Lang;

$local = app('App\Http\Services\LocalizationService');
$image = site()->meta('bgImage');
?>
@extends('layout.app-full')

@section('css')
	@if(!empty($image))
		<style>
			.row-top-wrap {
				background-image: url({{$image}});
			}
		</style>
	@endif
@stop
@section('content')
	@if(config('localisation'))
		<div class="dropdown language-selector">
			<button class="btn  dropdown-toggle" data-toggle="dropdown" id="dropdownMenu2" aria-expanded="false">
				<img style="width: 16px ; height: 16px; margin-right: 6px;"
					 src="{{getCountryByLang(app('translator')->getLocale())}}"/>{{config('language')[app('translator')->getLocale()]['name']}}
				<span class="caret"></span>
			</button>
			<ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style="min-width: 110px;">
				@foreach (config('language') as $locale => $language)
					@if(app('translator')->getLocale()!=$locale)
						<li>
							<a href={{ url(Request::url().'?lang='.$locale)}}>
								<img style="width: 16px ; height: 16px; margin-right: 6px;"
									 src="{{getCountryByLang($locale)}}"/>
								{{$language['name']}}
							</a>
						</li>
					@endif
				@endforeach
			</ul>
		</div>
	@endif
	<div class="row row-top-wrap front-row-top-wrap">
		<div class="homepage-wrapper">
			<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
				@include('layout.partials.logo')
			</nav>

			<div class="row row-top-content">
				<div class="tagline">
					{!! site()->meta('tagline') !!}
				</div>
				<form action="{{route('search')}}" method="GET" class="contract-search-form">
					<div class="form-group">
						<input type="text" name="q" class="form-control pull-left"
							   placeholder="@lang('global.search') {{$contracts}} {{ Lang::choice('global.contracts', $contracts) }} {{site()->meta('associated_documents')}}">
						<button type="submit" class="btn btn-search">@lang('global.search')</button>
					</div>
					<span class="advanced-search">@lang('global.advanced_search')</span>
				</form>
			</div>
		</div>
	</div>
	</div>
	<div class="row row-content">
		<div class="col-sm-6 col-md-6 col-lg-6 country-wrapper">
			<div class="country-wrap">
				@if(!site()->isCountrySite())
					<div class="country-inner-wrap">
						<p>@lang('global.contract_doc_from')</p>
						<span>{{$countries or ''}}</span> @lang('global.countries')
					</div>
					<a href="{{route('countries')}}" class="btn btn-view">@lang('global.view_all_countries')</a>
				@endif
			</div>
		</div>
		<div class="col-sm-6 col-md-6 col-lg-6 resource-wrapper">
			<div class="resource-wrap">
				<div class="resource-inner-wrap">
					<p>@lang('global.contracts_related_to')</p>
					<span>{{$resources or ''}}</span> @lang('global.resources')
				</div>
				<a href="{{route('resources')}}" class="btn btn-view">@lang('global.view_all_resources')</a>
			</div>
		</div>
	</div>
@stop
