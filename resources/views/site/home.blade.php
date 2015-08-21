@extends('layout.app-full')

@section('content')
    <div class="row row-top-wrap">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <span data-toggle="collapse-side" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
                <a class="navbar-brand" href="index.html" >Resource <span>Contracts</span></a>
            </div>
        </nav>
        <div class="col-lg-6 col-md-9">
            <div class="row row-top-content">
                <div class="tagline">
                    A directory of <span>Petroleum &amp; Mineral Contracts</span>
                </div>
                <form action="{{route('search')}}" method="GET" class="search-form">
                    <div class="form-group">
                        <input type="text" name="q" class="form-control pull-left" placeholder="Type here to search for contracts...">
                        <button type="submit" class="btn btn-search">Search Contract(s)</button>
                    </div>
                    <span class="advanced-search">Advanced Search</span>
                </form>
            </div>
        </div>
    </div>
    <div class="row row-content">
        <div class="col-lg-6 country-wrapper">
            <div class="country-wrap">
                <div class="country-inner-wrap">
                    <p>Contract Documents from</p>
                    <span>{{$countries or ''}}</span> countries
                </div>
                <a href="{{route('countries')}}" class="btn btn-view">View all Countries<i class="glyphicon glyphicon-triangle-right"></i></a>
            </div>
        </div>
        <div class="col-lg-6 resource-wrapper">
            <div class="resource-wrap">
                <div class="resource-inner-wrap">
                    <p>Contract Documents related to</p>
                    <span>{{$resources or ''}}</span> resources
                </div>
                <a href="{{route('resources')}}" class="btn btn-view">View all Resources<i class="glyphicon glyphicon-triangle-right"></i></a>
            </div>
        </div>
    </div>
@stop