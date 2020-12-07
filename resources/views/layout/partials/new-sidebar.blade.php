<div id="sidebar-wrapper" class="sidebar-collapse in">
	<ul class="sidebar-nav">
		<li class="sidebar-brand">
			@include('layout.partials.new-logo')
		</li>
		<li><a href="{{url('/')}}" @if(isActiveMenu('')) class="active" @endif > @lang('sidebar.home') </a></li>
		<li><a href="{{url('about')}}" @if(isActiveMenu('about')) class="active" @endif>{{site()->meta('about')}}</a>
		<li><a href="{{url('faqs')}}" @if(isActiveMenu('faqs')) class="active" @endif>@lang('sidebar.faqs')</a></li>
		
		<li><a href="{{url('guides')}}" @if(isActiveMenu('guides')) class="active" @endif>@lang('sidebar.guides')</a>
		</li>
		<li><a href="{{url('glossary')}}"
			   @if(isActiveMenu('glossary')) class="active" @endif>@lang('sidebar.glossary')</a></li>
		
			   @if(site()->isRC())
					<li><a href="{{url('research-and-analysis')}}">@lang('sidebar.research_and_analysis')</a></li>
				@endif

				@if(!site()->isCountrySite())
					<li><a href="{{url('country-sites')}}">@lang('sidebar.country_sites')</a></li>
				@endif
				<li><a href="{{url('contact')}}">@lang('sidebar.contact')</a></li>
	</ul>
</div>
