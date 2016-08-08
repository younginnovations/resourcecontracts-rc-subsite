<div class="navbar-header">
	<span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">Menu</span>
	<a class="navbar-brand" href="{{url()}}">
		@if(site()->isCountrySite())
			<img style="width: 24px; float: left; margin-top: 2px; margin-right: 3px;" src="{{site()->meta('logo')}}"/>
		@endif
		{{site()->meta('name')}}
		<span class="beta">Beta</span>
		<span>
			@if(site()->isCountrySite())
				{{site()->meta('contract')}}
			@endif
			Contracts
		</span>
	</a>
</div>
