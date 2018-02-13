<div @if(\Request::url() == url() && !site()->isCountrySite())
	 style="margin: 30px 0px;"
	 @endif class="mini__menu clearfix">
	<div class="partner-inner">
		@if(\Request::url() != url() || !site()->isRC())
			<div class="partner-inner-each">
				<ul>
					@if(site()->isCategory('rc'))
						<li>
							<a href="http://www.resourcegovernance.org/"
							   class="img-responsive logo__nrgi"
							   target="_blank"></a>
						</li>
					@endif
					<li>
						<a href="http://www.resourcegovernance.org/"
						   class="img-responsive logo__cu"
						   target="_blank"></a>
					</li>
					@if(site()->isCategory('rc'))
						<li>
							<a href="http://www.worldbank.org/en/topic/governance"
							   class="img-responsive logo__wb"
							   target="_blank"></a>
						</li>
						@if(env('APP_DEBUG'))
							<li>
								<a href="http://openoil.net"
								   class="img-responsive logo__oo"
								   target="_blank">
								</a>
							</li>
						@endif
					@endif
				</ul>
			</div>
			<div class="partner-inner-each">
				<ul>
					<li>
						<a href="http://www.dfid.gov.uk" class="img-responsive logo__ukaid"
						   target="_blank"></a>
					</li>
					@if(site()->isCategory('rc'))
						<li>
							<a href="http://alsf.afdb.org/"
							   class="img-responsive logo__alsf" target="_blank"></a>
						</li>
					@endif
				</ul>
			</div>
		@endif
	</div>
	<div class="menu-list clearfix">
		<ul class="menu-list-each">
			<li><a href="{{generate_url('about')}}">@lang('footer.about')</a></li>
			<li><a href="{{generate_url('faqs')}}">@lang('footer.faqs')</a></li>
			<li><a href="{{generate_url('guides')}}">@lang('sidebar.guides')</a></li>
			<li><a href="{{generate_url('glossary')}}">@lang('footer.glossary')</a></li>
			@if(!site()->isCountrySite())
				<li><a href="{{generate_url('country-sites')}}">@lang('footer.country_sites')</a></li>
			@endif
			<li><a href="{{generate_url('contact')}}">@lang('footer.contact')</a></li>
			<li><a href="https://github.com/NRGI/resourcecontracts.org/wiki/API" target="_blank">API</a>
			</li>
		</ul>
		@if(\Request::url() != url())
			<div class="clearfix">
				@include('layout.partials.language')
			</div>
		@endif
	</div>
</div>