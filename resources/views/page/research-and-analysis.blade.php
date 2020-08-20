<?php $image_main  = site()->getImageUrl('bg');
$currentLang = getCurrentLang();
?>
@extends('layout.app')
@section('css')
	<style>
		.hero-image {
			background-image: url({{$background['image_url']}});
			position: relative;
		}
	</style>
@stop
<?php
$editingMode = auth()->isloggedIn();
$pageVersion = app('request')->get('v');
?>
@section('content')
<div class="content-static-wrap">
    <div class="hero-image">
        <div class="hero-wrap">
            <div class="research-title">
                <h1>{{ isset($page['title'][$currentLang]) ? $page['title'][$currentLang] : $page['title']['en'] }}</h1>
                <p>{{ isset($page['description'][$currentLang]) ? $page['description'][$currentLang] : $page['description']['en'] }}</p>
            </div>
        </div>
    </div>
    <div class="research-and-analysis-content-wrap">
        <div class="research-and-analysis-featured-box">
            @foreach($featured as $research)
                <div class="featured-box">
                    <a href="{{ $research->url }}" target="_blank">
                        <span class="font-bold">{{ isset($research->title->$currentLang) ? str_limit($research->title->$currentLang, 150, ' ...') : str_limit($research->title->en, 96, ' ...') }}</span>
                        <span class="date">{{ $research->getPublicationDate() }}</span>
                    </a>
                </div>
            @endforeach
        </div>
        <h2 style="color: #385363">{{ site()->meta('research_and_analysis_publication') }}</h2>
        <div class="research-and-analysis-links">
            @foreach($researches as $research)
            <div class="research-and-analysis-link">
                <a href="{{ $research->url }}" target="_blank">
                    {{ isset($research->title->$currentLang) ? $research->title->$currentLang : $research->title->en }}
                    <span class="date">{{ $research->getPublicationDate() }}</span>
                </a>
            </div>
            @endforeach
            {{-- Pagination links --}}
            {!! $researches !!}
        </div>
    </div>
</div>
@stop
