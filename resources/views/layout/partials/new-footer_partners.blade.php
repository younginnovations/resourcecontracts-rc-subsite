<div @if(\Request::url()==url() && !site()->isCountrySite())
	@endif class="mini__menu clearfix">
		@if(\Request::url() != url() || !site()->isRC())
		@if(site()->isCategory('rc'))
		<div class="partner-inner">
			<div class="partner-inner-each">
				<ul>
					<li>
						<a href="http://www.resourcegovernance.org/" class="img-responsive logo__nrgi" target="_blank">
							<img src="{{url('images/NRGI_logo@2x.png')}}" alt="NRGI" width="113" height="45">
						</a>
					</li>
					<li>
						<a href="http://www.resourcegovernance.org/" class="img-responsive logo__cu" target="_blank"></a>
					</li>
					<li>
						<a href="http://www.worldbank.org/en/topic/governance" class="img-responsive logo__wb" target="_blank"></a>
					</li>
					<li>
						<a href="http://openoil.net" class="img-responsive logo__oo" target="_blank">
						</a>
					</li>
				</ul>
			</div>
			<div class="partner-inner-each">
				<ul>
					<li>
						<a href="http://www.dfid.gov.uk" class="img-responsive logo__ukaid" target="_blank"></a>
					</li>
					<li>
						<a href="http://alsf.afdb.org/" class="img-responsive logo__alsf" target="_blank"></a>
					</li>
				</ul>
			</div>
		</div>
		@endif
		
		@if(site()->isCategory('olc'))
		<div class="partner-inner">
			<div class="partner-inner-each">
				<li>
					<a href="http://www.dfid.gov.uk" class="img-responsive logo__ukaid" target="_blank"></a>
				</li>
			</div>
			<div class="partner-inner-each">
				<li>
					<a href="http://alsf.afdb.org/" class="img-responsive logo__alsf" target="_blank"></a>
				</li>
			</div>
		</div>
		@endif
		@endif
	<div class="partner-right">
		<div class="menu-list clearfix">
			<ul class="menu-list-each">
				<li><a href="{{url('about')}}">@lang('footer.about')</a></li>
				<li><a href="{{url('faqs')}}">@lang('footer.faqs')</a></li>
				<li><a href="{{url('guides')}}">@lang('sidebar.guides')</a></li>
				<li><a href="{{url('glossary')}}">@lang('footer.glossary')</a></li>
				@if(!site()->isCountrySite())
				<li><a href="{{url('country-sites')}}">@lang('footer.country_sites')</a></li>
				@endif
				<li><a href="{{url('contact')}}">@lang('footer.contact')</a></li>
				<li><a href="https://github.com/NRGI/resourcecontracts.org/wiki/API" target="_blank">API</a>
				</li>
			</ul>
			@if(\Request::url() != url())
			<div class="clearfix">
				@include('layout.partials.language')
			</div>
			@endif
		</div>
		<div class="footer-bottom">
			<p class="footer-description">@lang('footer.licensed')
				<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" dir="rtl">(CC BY-SA 4.0)</a>
				<!-- <img src="{{url('images/license-buttons.png')}}" width="88" height="31"> -->
			</p>
		</div>
	</div>
</div>