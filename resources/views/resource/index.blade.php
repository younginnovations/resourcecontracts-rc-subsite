@extends('layout.app-full')

@section('content')
	<div class="row">
		<div class="col-lg-12 panel-top-wrapper attached-top-wrapper">
			<div class="panel-top-content">
				<div class="clearfix">
					<div class="back back-button">Back</div>
					<div class="panel-title">
						@lang('global.resources')
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
									   placeholder="@lang('global.filter_by_resource')">
							</div>
						</form>
					</div>
				</div>
				@if(!site()->isCountrySite())
					<div class="right-content">
						<a class="filter-resource-wrap filter-label" href={{url('/countries')}} >
							@lang('global.view_by_country')
						</a>
						<div class="side-collapse in">
							<ul id="countries">
							</ul>
						</div>
					</div>
				@endif
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
            <div class="country-name resource-name pull-left">
                <% if(typeof resource[name] == 'undefined') {%>
                    <%= name %>
                <% }else{%>
                    <%= resource[name] %>
                <% } %>
            </div>
        </a>
        <div class="contract-count pull-right"><%= contract %>
            <% if (contract > 1){%>
            {{\Illuminate\Support\Facades\Lang::choice('global.contracts' , 2)}}
            <% }else{ %>
            {{\Illuminate\Support\Facades\Lang::choice('global.contracts' , 1)}}
            <% } %>
        </div>
    </div>
</script>

<script type="text/template" id="country-template">
    <li>
        <input class="country" name="country[]" type="checkbox" value="<%= code %>" />
        <label><%= country[code.toUpperCase()] %></label>
    </li>
</script>

<script>
    var APP_URL = '{{url()}}';
    var lang = <?php echo json_encode(trans('annotation'));?>;
    var resource = <?php echo json_encode(trans('resources'));?>;
    var country = <?php echo json_encode(trans('country'));?>;
</script>

<script type=" text/javascript" src="{{url('js/resource.js')}}"></script>
@stop

