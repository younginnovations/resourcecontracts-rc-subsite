@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">Home</a></li>
                            <li>Countries</li>
                        </ul>
                    </div>
                    <div class="panel-title">
                        Countries
                    </div>
                </div>
            </div>
            <div class="filter-wrapper">
                <div class="col-lg-8">
                    <div class="filter-country-wrap">
                        <form class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" class="form-control search pull-left" placeholder="Filter by country name...">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-2 pull-right">
                    <div class="filter-resource-wrap">
                        <div class="filter-label" data-toggle="collapse-side" data-target=".side-collapse" data-target-2=".side-collapse-container">Filter by Resources<i></i></div>
                    </div>
                    <div class="side-collapse in">
                        <ul id="resources">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row side-collapse-container">
        <div class="sort-wrapper">
            <label for="">Sort</label>
            <select class="sort" name="sort" >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
        <div id="countries" class="col-lg-12 country-list-wrap">
        </div>
    </div>
@stop

@section('js')
    <script type="text/javascript" src="{{url('js/lib/underscore.js')}}"></script>
    <script type="text/javascript" src="{{url('js/lib/backbone.js')}}"></script>
    <script type="text/javascript" src="{{url('js/lib/backbone.fetch-cache.min.js')}}"></script>
    <script type="text/template" id="country-template">
        <div class="col-lg-2">
            <a href="{{url('countries')}}/<%= code %>">
                <img width="200" src="{{getFlagUrl()}}<%= code %>.png" />
                <div class="country-name"><%= name %></div>
            </a>
            <div class="contract-count"><%= contract %> contracts</div>
       </div>
    </script>
    <script type="text/template" id="resource-template">
        <li>
            <input class="resource" name="resource[]" type="checkbox" value="<%= value %>" />
            <label><%= name %> (<%= contract %>)</label>
        </li>
    </script>
    <script>
        var APP_URL = '{{url()}}';
    </script>
    <script type="text/javascript" src="{{url('js/lib/countries.js')}}"></script>
@stop
