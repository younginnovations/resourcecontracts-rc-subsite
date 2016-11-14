<?php
if (!isset($summary)) {
	$api     = app('App\Http\Services\APIService');
	$summary = $api->sortSummaryCountry();
}
?>

<?php
$image   = app('App\Http\Services\Admin\ImageService');
$sidebar = $image->getImageUrl('sidebar');
?>

@if($sidebar != '')
	<style>
		.sidebar-nav > .sidebar-brand a, .sidebar-nav > .sidebar-brand a:hover {
			background: url('{{$sidebar}}');
		}
	</style>
@endif

<div id="sidebar-wrapper" class="sidebar-collapse in">
	<ul class="sidebar-nav">
		<li class="sidebar-brand">
			<a href="{{url()}}">
			    <span class="brand_first">
				{{site()->meta('name')}}
				@if(!site()->isRC())
					<span class="beta">Beta</span>
				@endif
				</span>
				<span>Contracts</span>
			</a>
		</li>
		<li><a href="{{url('/')}}" @if(isActiveMenu('')) class="active" @endif > @lang('sidebar.home') </a></li>
		<li><a href="{{url('contracts')}}"
			   @if(isActiveMenu('contracts')) class="active" @endif >@lang('sidebar.all_contracts')</a></li>
		@if(!site()->isCountrySite())
			<li><a href="{{url('countries')}}"
				   @if(isActiveMenu('countries')) class="active" @endif>@lang('sidebar.view_by_country')</a></li>
		@endif
		<li><a href="{{url('resources')}}"
			   @if(isActiveMenu('resources')) class="active" @endif>@lang('sidebar.view_by_resource')</a></li>
		<li><a href="{{url('about')}}" @if(isActiveMenu('about')) class="active" @endif>{{site()->meta('about')}}</a>
		</li>
		<li><a href="{{url('glossary')}}"
			   @if(isActiveMenu('glossary')) class="active" @endif>@lang('sidebar.glossary')</a></li>
		<li><a href="{{url('guides')}}" @if(isActiveMenu('guides')) class="active" @endif>@lang('sidebar.guides')</a>
		</li>
	</ul>
</div>
