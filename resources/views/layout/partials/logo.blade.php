<a class="navbar-brand" href="{{url()}}">
	{{site()->meta('name')}}
	@if(!site()->isRC())
		<span class="beta">Beta</span>
	@endif
	<span>Contracts</span>
</a>