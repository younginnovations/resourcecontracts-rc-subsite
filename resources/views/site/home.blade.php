@extends('layout.app-full')

@section('content')
    <div class="row row-top-wrap front-row-top-wrap">
        <div class="homepage-wrapper">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
                    @if(env("CATEGORY")=="rc")
                    <a class="navbar-brand" href="{{url()}}" >Resource <span class="beta">Beta</span><span>Contracts</span></a>
                    @else
                        <a class="navbar-brand" href="{{url()}}" >OPENLAND <span class="beta">Beta</span><span>Contracts</span></a>
                     @endif
                </div>
            </nav>
            <div @if(env("CATEGORY")=="rc") class="col-lg-7 col-md-9" @else class="col-lg-8 col-md-9" @endif>
            <div class="row row-top-content">
                <div class="tagline">
                    @if(env("CATEGORY")=="rc")
                    A directory of <span>Petroleum &amp; Mineral Contracts</span>
                    @else
                        An online repository of <span>Open Land Contracts</span>
                    @endif
                </div>
                <form action="{{route('search')}}" method="GET" class="contract-search-form">
                    <div class="form-group">
                        <input type="text" name="q" class="form-control pull-left" placeholder="Search {{$contracts}} contracts and associated documents">
                        <button type="submit" class="btn btn-search">@lang('Search')</button>
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
                    <p>Contract Documents from</p>
                    <span>{{$countries or ''}}</span> Countries
                </div>
                <a href="{{route('countries')}}" class="btn btn-view">View all countries</a>
            </div>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-6 resource-wrapper">
            <div class="resource-wrap">
                <div class="resource-inner-wrap">
                    <p>Contract Documents related to</p>
                    <span>{{$resources or ''}}</span> Resources
                </div>
                <a href="{{route('resources')}}" class="btn btn-view">View all resources</a>
            </div>
        </div>
    </div>
@stop