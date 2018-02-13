<a class="navbar-brand" href="{{generate_url()}}">
	@if(site()->isCountrySite())
		<span class="country-flag">
			<img src="{{site()->meta('logo')}}"/>
		</span>
	@endif
	<i @if(!empty(site()->meta('short_name'))) class="hidden_small" @endif >{{site()->meta('name')}}</i>
	@if(!empty(site()->meta('short_name')))
		<i class="shown_small">{{site()->meta('short_name')}}</i>
	@endif
	@if(site()->isOLC())
		<span class="beta">Beta</span>
	@endif
	<span>@if(site()->isCountrySite()) {{site()->meta('type')}} @endif Contracts</span>
</a>