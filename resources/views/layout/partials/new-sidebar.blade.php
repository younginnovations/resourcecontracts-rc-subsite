<div id="sidebar-wrapper" class="sidebar-collapse in">
	<ul class="sidebar-nav">
		<li class="sidebar-brand">
			@include('layout.partials.new-logo')
		</li>

	
		@if(site()->isRC())
		<li><a href="{{url('/')}}" @if(isActiveMenu('')) class="active" @endif > @lang('sidebar.home') </a></li>


			<li><a href="{{url('about')}}" @if(isActiveMenu('about')) class="active" @endif>@lang('sidebar.about')</a>

			<li><a href="{{url('faqs')}}" @if(isActiveMenu('faqs')) class="active" @endif>@lang('sidebar.faqs')</a></li>

			<li><a href="{{url('guides')}}"
				   @if(isActiveMenu('guides')) class="active" @endif>@lang('sidebar.guides')</a>
			</li>
			<li><a href="{{url('glossary')}}"
				   @if(isActiveMenu('glossary')) class="active" @endif>@lang('sidebar.glossary')</a></li>


			<li><a href="{{url('research-and-analysis')}}" @if(isActiveMenu('research-and-analysis')) class="active" @endif>@lang('sidebar.research_and_analysis')</a></li>

			<li><a href="{{url('country-sites')}}" @if(isActiveMenu('country-sites')) class="active" @endif>@lang('sidebar.country_sites')</a></li>
		<li><a href="{{url('contact')}}"@if(isActiveMenu('contact')) class="active" @endif>@lang('sidebar.contact')</a></li>
		
		@else


		<li><a href="{{url('/')}}" @if(isActiveMenu('')) class="active" @endif > @lang('sidebar.home') </a></li>

		<li><a href="{{url('countries')}}" @if(isActiveMenu('countries')) class="active" @endif>@lang('sidebar.browse_by_country')</a>

		<li><a href="{{url('resources')}}" @if(isActiveMenu('resources')) class="active" @endif>@lang('sidebar.browse_by_resource')</a></li>

		<li><a href="{{url('about')}}" @if(isActiveMenu('about')) class="active" @endif>@lang('sidebar.aboutOLC')</a>
		</li>
		<li><a href="{{url('guides')}}"
			   @if(isActiveMenu('guides')) class="active" @endif>@lang('sidebar.guidesOLC')</a></li>

			<li><a href="{{url('glossary')}}" @if(isActiveMenu('glossary')) class="active" @endif>@lang('sidebar.glossary')</a></li>

			<li><a href="{{url('faqs')}}" @if(isActiveMenu('faqs')) class="active" @endif>@lang('sidebar.faqs')</a></li>

		@endif

	</ul>
</div>
