<?php
$image_main = site()->getImageUrl('bg');
?>
@extends('layout.app-full')
@section('css')
	<style>
		.petroleum-wrapper {
			background-image: url({{$image_main}});
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
			<div class="navbar-right">
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
						<form action="{{route('search')}}" method="GET" class="search-form" role="search">
							<div class="form-group clearfix">
								<input type="text" name="q" class="form-control"
									   placeholder="@lang('global.search') {{$contracts}} @lang('global.contracts') @lang('global.associated_documents')">
								<button type="submit" class="btn btn-default search-button">
									@lang('global.search')
								</button>
							</div>
						</form>
						<div class="advance-search">
							<a href="{{url('search')}}">@lang('global.advanced_search')</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div class="row row-content">
		<div class="col-sm-6 col-md-6 col-lg-6 country-wrapper">
			<div class="country-wrap">
				<div class="country-inner-wrap"></div>
			</div>
		</div>
		<div class="col-sm-6 col-md-6 col-lg-6 resource-wrapper">
			<div class="resource-wrap">
				<div class="resource-inner-wrap">
					<p>@lang('global.contracts_related_to')</p>
					{{trans('global.resource_count', ['count'=>$resources])}}
				</div>
				<a href="{{route('resources')}}" class="btn btn-view">@lang('global.view_all_resources')</a>
			</div>
		</div>
	</div>
@stop
