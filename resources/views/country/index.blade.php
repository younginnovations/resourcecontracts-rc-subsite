@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="panel-top-wrapper attached-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="back back-button">Back</div>
                    <div class="panel-title">
                        @lang('global.countries')
                    </div>
                </div>
            </div>
            <div class="filter-wrapper" id="filter-by-category">
                <div class="left-content">
                    <div class="filter-country-wrap">
                        <form class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" class="form-control search pull-left"
                                       placeholder="@lang('global.filter_by_countries')">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="right-content">
                    <div class="filter-resource-wrap">
                        <a href={{url('/resources')}} class="filter-label">@lang('global.view_by_resource')</a>
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
        <div id="countries" class="col-lg-12 country-list-wrap clearfix">
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
            @lang('countriespage.documents')
            <% }else{ %>
            @lang('countriespage.document')
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
<script type=" text/javascript" src="{{url('js/country.js')}}"></script>
@stop
