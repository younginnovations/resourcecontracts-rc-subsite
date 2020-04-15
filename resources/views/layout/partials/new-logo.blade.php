<a class="navbar-brand" href="{{url()}}">
	<i @if(!empty(site()->meta('short_name'))) class="hidden_small" @endif >{{site()->meta('name')}}</i>
	@if(!empty(site()->meta('short_name')))
		<i class="shown_small">{{site()->meta('short_name')}}</i>
	@endif
	<span>Contracts</span>
</a>