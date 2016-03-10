<?php
use \Illuminate\Support\Facades\Lang as Lang;

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
    <div class="row row-top-wrap front-row-top-wrap">
        <div class="homepage-wrapper">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse"
                          data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
                    @if(env("CATEGORY")=="rc")
                        <a class="navbar-brand" href="{{url()}}">{{Lang::choice('global.resources' , 1)}} <span
                                    class="beta">Beta</span><span>{{Lang::choice('global.contracts' ,2)}}</span></a>
                    @else
                        <a class="navbar-brand" href="{{url()}}">@lang('global.openland') <span
                                    class="beta">Beta</span><span>{{Lang::choice('global.contracts' ,2)}}</span></a>
                    @endif
                    <a href="{{ url() }}?lang=en">English</a></li>
                    <a href="{{ url() }}?lang=fr">French</a></li>
                </div>
            </nav>

            <div @if(env("CATEGORY")=="rc") class="col-lg-7 col-md-9" @else class="col-lg-8 col-md-9" @endif>

                <div class="row row-top-content">
                    <div class="tagline">
                        @if(env("CATEGORY")=="rc")
                            @lang('global.a_directory_of') <span>@lang('global.petroleum_mineral_contracts')</span>
                        @else
                            @lang('global.an_online_repository_of') <span>@lang('global.open_land_contracts')</span>
                        @endif
                    </div>
                    <form action="{{route('search')}}" method="GET" class="contract-search-form">
                        <div class="form-group">
                            <input type="text" name="q" class="form-control pull-left"
                                   placeholder="@lang('global.search') {{$contracts}} {{ Lang::choice('global.contracts' , $contracts) }} @if(env('CATEGORY') != 'olc') @lang('global.associated_documents') @endif">
                            <button type="submit"
                                    class="btn btn-search">@lang('global.search')</button>
                        </div>
                        <span class="advanced-search">Advanced Search</span>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row row-content">
        <div class="col-sm-6 col-md-6 col-lg-6 country-wrapper">
            <div class="country-wrap">
                <div class="country-inner-wrap">
                    <p>@lang('global.contract_doc_from')</p>
                    <span>{{$countries or ''}}</span> @lang('global.countries')
                </div>
                <a href="{{route('countries')}}" class="btn btn-view">@lang('global.view_all_countries')</a>
            </div>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-6 resource-wrapper">
            <div class="resource-wrap">
                <div class="resource-inner-wrap">
                    <p>@lang('global.contracts_related_to')</p>
                    <span>{{$resources or ''}}</span> {{Lang::choice('global.resources' , $resources)}}
                </div>
                <a href="{{route('resources')}}" class="btn btn-view">@lang('global.view_all_resources')</a>
            </div>
        </div>
    </div>
@stop