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
	</style>
@stop
@section('content')
	<div class="hero-image">
		<div class="hero-wrap">
			<div class="hero-title">
				<span>{{ $text->homepage_new_sub_tag_line_text->$currentLang or ''}} </span>
				<h1>{{ $text->homepage_new_tag_line_text->$currentLang or ''}} </h1>
				<p>{{ $text->homepage_new_tag_line_desc_text->$currentLang or ''}}</p>
				<form action="{{route('search/group')}}" method="GET" class="search-form" role="search">
					<div class="form-group clearfix">
						<input type="text" name="q" class="form-control"
							   placeholder="@lang('global.search') {{$contracts}} {{ $text->homepage_search_placeholder_text->$currentLang or ''}}..." autocomplete="off">
						<button>@lang('global.search')</button>
					</div>
				</form>
				<div class="get-started">
					<h3><a href="{{route('page.resources')}}"> {{ $text->homepage_get_started_text->$currentLang or ''}}</a></h3>
				</div>
			</div>
		</div>
	</div>
	<div class="content-count-wrap">
		<div class="count-block count-countries">
			<a href="#"></a>
		</div>
		<div class="count-block count-search">
			<a href="{{route('search/group')}}">
				<h2 class="petroleum-list-title">{{$contracts}} @lang('global.documents')</h2>
				<span class="view">@lang('global.view')</span>
			</a>
		</div>
		<div class="count-block count-resources">
			<a href="{{route('resources')}}">
				<h2 class="petroleum-list-title">{{$resources}} @lang('global.resources')</h2>
				<span class="view">@lang('global.view')</span>
			</a>
		</div>
	</div>
@stop
