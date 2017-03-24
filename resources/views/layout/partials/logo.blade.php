<a class="navbar-brand" href="{{url()}}">
	@if(site()->isCountrySite())
		<span class="country-flag">
			<img src="{{site()->meta('logo')}}"/>
		</span>
	@endif {{site()->meta('name')}}
	@if(site()->isOLC())
		<span class="beta">Beta</span>
	@endif
	<span>@if(site()->isCountrySite()) {{site()->meta('type')}} @endif Contracts</span>
</a>