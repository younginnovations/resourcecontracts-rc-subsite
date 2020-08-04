<?php $currentLang = app('App\Http\Services\LocalizationService')->getCurrentLang() ?>
<div @if(\Request::url()==url() && !site()->isCountrySite())
	 @endif class="mini__menu clearfix">
<!-- @if(\Request::url() != url() || !site()->isRC())
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
	 @endif -->

	@if(site()->isCategory('rc'))
		<div class="landing_section_logos">
			<div class="partners">
				<h3>@lang('global.partners')</h3>
				<a href="http://www.resourcegovernance.org/" target="_blank" class="nrgi"
				   title="Natural Resource Governance Institute">
					<img src="{{url('images/NRGI_logo.png')}}" alt="NRGI" width="113" height="45">
				</a>
				<a href="http://ccsi.columbia.edu/" target="_blank" title="Columbia Center on Sustainable Investment">
					<img src="{{url('images/CCSI_logo.png')}}" class="ccsi" alt="CCSI" width="252" height="45">
				</a>
				<a href="http://www.worldbank.org/en/topic/governance" target="_blank" title="The World Bank">
					<img src="{{url('images/WORLDBANK_logo.png')}}" alt="World Bank" width="108" height="45">
				</a>

				<a href="http://openoil.net" target="_blank" title="Open Oil">
					<img src="{{url('images/OO_logo.png')}}" alt="Open Oil" width="50" height="45">
				</a>
			</div>
			<div class="donors">
				<h3>@lang('global.donors')</h3>
				<a href="http://www.dfid.gov.uk" target="_blank" title="UKAid">
					<img src="{{url('images/UKAid_logo.png')}}" alt="UKAid" width="134" height="45">
				</a>
				<a href="http://alsf.afdb.org/" target="_blank" title="ALSF">
					<img src="{{url('images/ALSF_logo.png')}}" alt="ALSF" width="113" height="45">
				</a>
			</div>
		</div>
	@endif

	@if(site()->isCategory('olc'))
		<div class="landing_section_logos">
			<div class="partners olc-partners">
				<a href="http://ccsi.columbia.edu/" target="_blank" title="Columbia Center on Sustainable Investment">
					<img src="{{url('images/CCSI_logo.png')}}" class="ccsi" alt="CCSI">
				</a>
				<a href="https://www.gov.uk/government/organisations/foreign-commonwealth-development-office" target="_blank" title="UKAid">
					<img src="{{url('images/UKAid_logo_new.png')}}" alt="UKAid">
				</a>
			</div>
		</div>
	@endif

	<div class="partner-right">
		<div class="menu-list clearfix">
			<ul class="menu-list-each">
				@if(site()->isOLC())
					<li><a href="{{url('about')}}">@lang('footer.about')</a></li>
					<li><a href="{{url('guides')}}">@lang('sidebar_olc.use_this_site')</a></li>
					<li><a href="{{url('glossary')}}">@lang('footer.glossary')</a></li>
					<li><a href="{{url('faqs')}}">@lang('footer.faqs')</a></li>
					<li><a href="{{url('country-sites')}}">@lang('footer.country_sites')</a></li>
					<li><a href="{{url('contact')}}">@lang('footer.contact')</a></li>
					<li><a href="https://github.com/NRGI/resourcecontracts.org/wiki/API" target="_blank">API</a>
					</li>
				@else
					<li><a href="{{url('about')}}">@lang('footer.about')</a></li>
					<li><a href="{{url('faqs')}}">@lang('footer.faqs')</a></li>
					<li><a href="{{url('guides')}}">@lang('sidebar.guides')</a></li>
					<li><a href="{{url('glossary')}}">@lang('footer.glossary')</a></li>
					@if(site()->isRC())
						<li><a href="{{url('research-and-analysis')}}">@lang('footer.research_and_analysis')</a></li>
					@endif
					@if(!site()->isCountrySite())
						<li><a href="{{url('country-sites')}}">@lang('footer.country_sites')</a></li>
					@endif
					<li><a href="{{url('contact')}}">@lang('footer.contact')</a></li>
					<li><a href="https://github.com/NRGI/resourcecontracts.org/wiki/API" target="_blank">API</a>
					</li>
				@endif
			</ul>
			@if(\Request::url() != url())
				<div class="clearfix">
					@include('layout.partials.language')
				</div>
			@endif
		</div>
		<div class="footer-bottom">
			<p class="footer-description">{{ $text->homepage_footer_text->$currentLang or '' }}
				<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank"
				   dir="rtl">{{$text->homepage_footer_link_text->$currentLang or '' }}</a>
			<!-- <img src="{{url('images/license-buttons.png')}}" width="88" height="31"> -->
			</p>
		</div>
	</div>
</div>