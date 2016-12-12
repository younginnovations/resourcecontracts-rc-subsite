<footer>
	<div class="footer__wrap">
		<p class="partner-description">
			{{getOptionText('footer_text')}}
		</p>
		<div class="partner-wrapper clearfix">

			<div class="mini__menu clearfix">

				<div class="partner-inner">
					<div class="">
						<div class="partner-inner-each">
							<ul>
								@if(site()->isRC() || site()->isCountrySite())
									<li>
										<a href="http://www.resourcegovernance.org/" class="img-responsive logo__nrgi"
										   target="_blank"></a>
									</li>
								@endif
								<li>
									<a href="http://ccsi.columbia.edu/" class="img-responsive logo__cu"
									   target="_blank"></a>
								</li>
								@if(site()->isRC() || site()->isCountrySite())
									<li>
										<a href="http://www.worldbank.org/en/topic/governance"
										   class="img-responsive logo__wb"
										   target="_blank"></a>
									</li>
								@endif
							</ul>
						</div>
						<div class="partner-inner-each">
							<ul>
								<li>
									<a href="http://www.dfid.gov.uk" class="img-responsive logo__ukaid"
									   target="_blank"></a>
								</li>
								@if(site()->isRC() || site()->isCountrySite())
									<li>
										<a href="http://alsf.afdb.org/"
										   class="img-responsive logo__alsf" target="_blank"></a>
									</li>
								@endif
							</ul>
						</div>
					</div>
				</div>
				<div class="menu-list clearfix">
					<ul class="menu-list-each">
						<li><a href="{{url('about')}}">@lang('footer.about')</a></li>
						<li><a href="{{url('faqs')}}">@lang('footer.faqs')</a></li>
						<li><a href="{{url('guides')}}">@lang('sidebar.guides')</a></li>
						<li><a href="{{url('glossary')}}">@lang('footer.glossary')</a></li>
						<li><a href="{{url('publish-contracts')}}">@lang('footer.publish_contracts')</a></li>
						<li><a href="{{url('contact')}}">@lang('footer.contact')</a></li>
						<li><a href="https://github.com/NRGI/resourcecontracts.org/wiki/API" target="_blank">API</a>
						</li>
					</ul>
					@if(\Request::url() != url())
						<div class="clearfix">
							@include('layout.partials.language')
						</div>
					@endif
					<br>
					<form action="{{site()->newsletterUrl()}}" method="get" name="subscribe">
						<style>
							.input {
								display: flex;
								align-items: center;
								border-radius: 0 5px 5px 0;
							}
							#email {
								color: #000000;
								padding: 5px;
							}
							.button {
								height: 44px;
								border: none;
							}
							#newsletter-submit {
								width: 25%;
								height: 46px;
								background: #E86C8D;
								font-family: inherit;
								font-weight: bold;
								color: inherit;
								letter-spacing: 1px;
								border-radius: 0 5px 5px 0;
								cursor: pointer;
								transition: background .3s ease-in-out;
							}
							#newsletter-submit:hover {
								background: #d45d7d;
							}
						</style>
						<div class="input">
							<input type="text" class="button" id="email" name="email" placeholder="name@example.com">
							<input type="submit" class="button" id="newsletter-submit" value="Subscribe">
						</div>
					</form>
				</div>
			</div>
			<div class="footer-bottom">
				<p class="footer-description">@lang('footer.licensed')
					<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">(CC BY-SA 4.0)</a>
					<img src="{{url('images/license-buttons.png')}}" width="88" height="31">
				</p>
			</div>
		</div>
	</div>
</footer>
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