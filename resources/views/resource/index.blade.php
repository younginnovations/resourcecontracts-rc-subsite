@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">Home</a></li>
                            <li>Resource</li>
                        </ul>
                    </div>
                    <div class="panel-title">
                        Resource
                    </div>
                </div>
            </div>
            <div class="filter-wrapper">
                <div class="col-xs-6 col-sm-6 col-md-9 col-lg-8">
                    <div class="filter-country-wrap">
                        <form class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" class="form-control search pull-left" placeholder="Filter by resource ...">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-xs-5 col-sm-3 col-md-3 col-lg-2 pull-right">
                    <div class="filter-resource-wrap">
                        <div class="filter-label" data-toggle="collapse-side" data-target=".side-collapse" data-target-2=".side-collapse-container">Filter by Countries<i></i></div>
                    </div>
                    <div class="side-collapse in">
                        <ul id="countries">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row side-collapse-container">
        <div id="resources" class="col-lg-12 country-list-wrap f32">
        </div>
    </div>

@stop

@section('js')
<script type="text/template" id="resource-template">
    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
        <a href="{{url('resource')}}/<%= value %>">
            <div class="country-name resource-name pull-left"><%= name %></div>
        </a>
        <div class="contract-count pull-right"><%= contract %>
            <% if (contract > 1){%>
            contracts
            <% }else{ %>
            contract
            <% } %>

        </div>
    </div>
</script>

<script type="text/template" id="country-template">
    <li>
        <input class="country" name="country[]" type="checkbox" value="<%= code %>" />
        <label><%= name %></label>
    </li>
</script>

<script>
    var APP_URL = '{{url()}}';
</script>

<script type="text/javascript" src="{{url('js/resource.min.js')}}"></script>
@stop

