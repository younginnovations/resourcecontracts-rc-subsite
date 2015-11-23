@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">@lang('global.home')</a></li>
                            <li>@lang('global.countries')</li>
                        </ul>
                    </div>
                    <div class="panel-title">
                        @lang('global.countries')
                    </div>
                </div>
            </div>
            <div class="filter-wrapper">
                <div class="col-xs-6 col-sm-6 col-md-9 col-lg-8">
                    <div class="filter-country-wrap">
                        <form class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                          <input type="text" class="form-control search pull-left" placeholder="@lang('countriespage.filter_by_contry_name')">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-xs-5 col-sm-3 col-md-3 col-lg-2 pull-right">
                    <div class="filter-resource-wrap">
                        <div class="filter-label" data-toggle="collapse-side" data-target=".side-collapse" data-target-2=".side-collapse-container">@lang('countriespage.filter_by_resources')<i></i></div>
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
        <div id="countries" class="col-lg-12 country-list-wrap">
        </div>
    </div>
@stop

@section('js')
<script type="text/template" id="country-template">
    <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <a href="{{url('countries')}}/<%= code %>">
            <img width="200" src="{{getFlagUrl()}}<%= code %>.png" />
            <div class="country-name"><%= country[code.toUpperCase()]%></div>
        </a>
        <div class="contract-count"><%= contract %>
            <% if (contract > 1){%>
            @lang('countriespage.contracts')
            <% }else{ %>
            @lang('countriespage.contract')
            <% } %>

        </div>
   </div>
</script>
<script type="text/template" id="resource-template">
    <li>
        <input class="resource" name="resource[]" type="checkbox" value="<%= value %>" />
        <label>
            <% if(typeof resource[name] == 'undefined') {%>
            <%= name %>
            <% }else{%>
            <%= resource[name] %>
            <% } %>
            (<%= contract %>)
        </label>
    </li>
</script>
<script>
    var APP_URL = '{{url()}}';
    var lang = <?php echo json_encode(trans('annotation'));?>;
    var country = <?php echo json_encode(trans('country'));?>;
    var resource = <?php echo json_encode(trans('resources'));?>;
</script>
<script type="text/javascript" src="{{url('js/country.js')}}"></script>
@stop
