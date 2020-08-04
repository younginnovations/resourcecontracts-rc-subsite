<div id="sidebar-wrapper" class="sidebar-collapse in">
	<ul class="sidebar-nav">
		<li class="sidebar-brand">
			@include('layout.partials.new-logo')
		</li>
		@if(site()->isOLC())
			<li><a href="{{url('/')}}" @if(isActiveMenu('')) class="active" @endif > @lang('sidebar_olc.home') </a></li>
			<li><a href="{{url('countries')}}"
				   @if(isActiveMenu('countries')) class="active" @endif>@lang('sidebar_olc.view_by_country')</a></li>
			<li><a href="{{url('resources')}}"
				   @if(isActiveMenu('resources')) class="active" @endif>@lang('sidebar_olc.view_by_resource')</a></li>
			<li><a href="{{url('about')}}" @if(isActiveMenu('about')) class="active" @endif>@lang('sidebar_olc.about')
				</a>
			</li>
			<li><a href="{{url('guides')}}"
				   @if(isActiveMenu('guides')) class="active" @endif>@lang('sidebar_olc.use_this_site')</a>
			</li>
			<li><a href="{{url('glossary')}}"
				   @if(isActiveMenu('glossary')) class="active" @endif>@lang('sidebar_olc.glossary')</a></li>
			<li><a href="{{url('faqs')}}"
				   @if(isActiveMenu('faqs')) class="active" @endif>@lang('sidebar_olc.faqs')</a></li>
		@else
			<li><a href="{{url('/')}}" @if(isActiveMenu('')) class="active" @endif > @lang('sidebar.home') </a></li>

			<li><a href="{{url('about')}}" @if(isActiveMenu('about')) class="active" @endif>@lang('sidebar.about')</a>

			<li><a href="{{url('faqs')}}" @if(isActiveMenu('faqs')) class="active" @endif>@lang('sidebar.faqs')</a></li>

			<li><a href="{{url('guides')}}"
				   @if(isActiveMenu('guides')) class="active" @endif>@lang('sidebar.guides')</a>
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
		@endif

	</ul>
</div>
