<?php $local = app('App\Http\Services\LocalizationService'); ?>
@include('layout.partials.clip')
<div class="row title-wrap clearfix">
	<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <?php
        $segment = \Illuminate\Support\Facades\Request::segment(1);
        $isGsearch = in_array($segment, ['gsearch']) ? true : false;
        $isSearchPage = in_array($segment, ['search']) ? true : false;
        $api = app('App\Http\Services\APIService');
        $summary = $api->sortSummaryCountry();
        $attributes = $api->searchAttributed();
        $category = $api->getAnnotationsCategory();
        ?>

		<form action="{{$isGsearch ? url('gsearch'): url('search')}}" method="get" class="search-form" id="search-form">
			<div class="navbar-header">
				<span data-toggle="collapse-sidebar" data-target=".sidebar-collapse"
					  data-target-2=".sidebar-collapse-container" class="pull-left trigger"></span>
				@include('layout.partials.logo')
			</div>
			@section('search-bar')
				@if(!(isset($hideSearchBar) && $hideSearchBar == true))
					<div class="right-header-section navbar-right hidden">
						@include('layout.partials.searchdropdown',["isSearchPage" => $isSearchPage])
					</div>
				@endif
			@show
			<?php
			$isSearchPage = in_array($segment, ['search']) ? true : false;
			?>
			@if(!$isSearchPage)
				@include('layout.partials.search')
				</form>
			@endif
			
	</nav>
</div>
