<footer>
	<div class="footer__wrap">
		<p class="partner-description">
			{!! nl2br(getOptionText('footer_text')) !!}
		</p>
		<div class="partner-wrapper clearfix">
			<div @if(\Request::url() == url() && !site()->isCountrySite()) style="margin: 30px 0px;"
				 @endif class="mini__menu clearfix">
				<div class="partner-inner">
					@if(\Request::url() != url() || site()->isCountrySite())
						<div class="partner-inner-each">
							<ul>
								@if(site()->isCategory('rc'))
									<li>
										<a href="http://www.resourcegovernance.org/"
										   class="img-responsive logo__nrgi"
										   target="_blank"></a>
									</li>
									@if(site()->isCategory('rc'))
										<li>
											<a href="http://www.worldbank.org/en/topic/governance"
											   class="img-responsive logo__wb"
											   target="_blank"></a>
										</li>
										@if(env('APP_DEBUG'))
											<a href="http://openoil.net"
											   class="img-responsive logo__oo"
											   target="_blank">
											</a>
										@endif
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
			</div>
			<div class="footer-bottom">
				<p class="footer-description">@lang('footer.licensed')
					<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" dir="rtl">(CC BY-SA
						4.0)</a>
					<img src="{{url('images/license-buttons.png')}}" width="88" height="31">
				</p>
			</div>
		</div>
	</div>
</footer>

@include('contract.partials.emailModal')

<script src="{{url('js/app.js')}}"></script>
@yield('js')
@if(site()->hasTracking())
	<script>
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
						(i[r].q = i[r].q || []).push(arguments)
					}, i[r].l = 1 * new Date();
			a = s.createElement(o),
					m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

		ga('create', '{{site()->getTrackingCode()}}', 'auto');
		ga('send', 'pageview');
	</script>
	@endif
	</body>
	</html>