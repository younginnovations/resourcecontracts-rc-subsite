<?php
use \Illuminate\Support\Facades\Lang as Lang;

?>
@extends('layout.app-full')

@section('css')
    @if(!empty($image))
        <style xmlns="http://www.w3.org/1999/html">
            .row-top-wrap {
                background-image: url({{$image}});
            }
        </style>
    @endif
@stop
@section('content')
    <?php $local = app('App\Http\Services\LocalizationService'); ?>
    <div class="floated-top-div">
    @if(config('localisation'))
        <div class="language-selector">
            <ul>
                @foreach (config('language') as $locale => $language)
                    @if(app('translator')->getLocale()!=$locale)
                        <li><a href={{lang_url($locale)}}> {{$language['code']}} </a> </li>
                    @else
                        <li><a class="active"> {{$language['code']}} </a> </li>
                    @endif
                @endforeach
            </ul>
        </div>
    @endif
    </div>

    <div class="row row-top-wrap front-row-top-wrap">
        <div class="homepage-wrapper">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse"
                          data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
                    <a class="navbar-brand" href="{{url()}}"><span class="country-flag"><img src="{{get_country('flag')}}"/></span>{{ get_country('name') }}<span>Resource Contracts</span></a>
                </div>
            </nav>


            <div class="col-lg-7 col-md-9">
                <div class="row row-top-content">
                    <div class="tagline">
                        <span> {{trans('global.tagline', ['name'=>get_country('name')])}}</span>
                    </div>
                    <form action="{{route('search')}}" method="GET" class="contract-search-form">
                        <div class="form-group">
                            <input type="text" name="q" class="form-control pull-left"
                                   placeholder="{{trans('global.search_placeholder',['count' =>$contracts])}}">
                            <button type="submit"
                                    class="btn btn-search">@lang('global.search')</button>
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
                <div class="country-inner-wrap">
                </div>
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
