<a class="navbar-brand" href="{{url()}}">
	@if(site()->isCountrySite())
		<span class="country-flag">
			<img src="{{site()->meta('logo')}}" width="20" height="18"/>
		</span>
	@endif
	<i @if(!empty(site()->meta('short_name'))) class="hidden_small" @endif >{{site()->meta('name')}}</i>
	@if(!empty(site()->meta('short_name')))
		<i class="shown_small">{{site()->meta('short_name')}}</i>
	@endif
	<span>@if(site()->isCountrySite()) {{site()->meta('type')}} @endif Contracts</span>
</a>