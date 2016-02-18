<?php $local = app('App\Http\Services\LocalizationService');
$currentPath = Illuminate\Support\Facades\Request::path();
$currentPath = explode('/', $currentPath);
?>
<div class="row">
	<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
		@if($currentPath[0] == "admin")
			<div class="navbar-header admin-navbar-header">
				@else
					<div class="navbar-header">
						@endif
						<span data-toggle="collapse-sidebar" data-target=".sidebar-collapse"
							  data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
						<a class="navbar-brand" href="{{url()}}">
                    <span class="country-flag">
                        <img src="{{get_country('flag')}}"/>
                    </span>
							{{ get_country('name') }}
							<span>Resource Contracts</span>
						</a>
					</div>
					<div class="right-header-section navbar-right">
						@include('layout.partials.search')
					</div>
	</nav>
</div>