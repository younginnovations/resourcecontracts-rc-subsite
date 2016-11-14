<a class="navbar-brand" href="{{url()}}">
	{{site()->meta('name')}}
	@if(site()->isOLC())
		<span class="beta">Beta</span>
	@endif
	<span>Contracts</span>
</a>