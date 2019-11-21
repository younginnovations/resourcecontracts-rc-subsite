<?php $local = app('App\Http\Services\LocalizationService'); ?>
@include('layout.partials.clip')
<div class="row title-wrap clearfix">
	<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
		<form action="{{url('search')}}" method="get" class="search-form" id="search-form">
			<div class="navbar-header">
				<span data-toggle="collapse-sidebar" data-target=".sidebar-collapse"
					  data-target-2=".sidebar-collapse-container" class="pull-left trigger"></span>
				@include('layout.partials.logo')
			</div>
			<?php
			$segment = \Illuminate\Support\Facades\Request::segment(1);
			$isSearchPage = in_array($segment, ['search']) ? true : false;
			?>
			<div class="right-header-section navbar-right hidden" @if(isset($isDocumentView)) style="display: none;" @endif>
				@include('layout.partials.searchdropdown',["isSearchPage" => $isSearchPage])
			</div>
			@if(!$isSearchPage)
				@include('layout.partials.search')
				</form>
			@endif
			
	</nav>
</div>
