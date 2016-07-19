<footer>
	<div class="footer__wrap">
	<p class="partner-description">
		{{getOptionText('footer_text')}}
	</p>
	<div class="partner-wrapper clearfix">
		@if(!site()->isRC())
			<div class="mini__menu clearfix">
		@endif
		<div class="col-md-10 partner-inner row">
			<div class="row">
				<div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
					@if(site()->isRC())
						<h5 class="partner-inner-heading">@lang('footer.founding_partners')</h5>
					@endif
					<ul>
						@if(site()->isRC())
							<li>
								<a href="http://www.resourcegovernance.org/" class="img-responsive logo__nrgi"
								   target="_blank"></a>
							</li>
						@endif
						<li>
							<a href="http://ccsi.columbia.edu/" class="img-responsive logo__cu" target="_blank"></a>
						</li>
						@if(site()->isRC())
							<li>
								<a href="http://www.worldbank.org/en/topic/governance" class="img-responsive logo__wb"
								   target="_blank"></a>
							</li>
						@endif
					</ul>
				</div>
				<div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
					@if(site()->isRC())
						<h5 class="partner-inner-heading">@lang('footer.donors')</h5>
					@endif
					<ul>
						<li>
							<a href="http://www.dfid.gov.uk" class="img-responsive logo__ukaid" target="_blank"></a>
						</li>
						@if(site()->isRC())
							<li>
								<a href="http://www.afdb.org/en/topics-and-sectors/initiatives-partnerships/african-legal-support-facility/"
								   class="img-responsive logo__alsf" target="_blank"></a>
							</li>
						@endif
					</ul>
				</div>

				@if(site()->isRC())
					<div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
						<h5 class="partner-inner-heading">@lang('footer.content_partner')</h5>
						<ul>
							<li><a href="http://openoil.net/" class="img-responsive logo__oo" target="_blank"> </a></li>
						</ul>
					</div>
				@endif
			</div>
		</div>
		<div class="col-md-2 menu-list row">
			@if(site()->isRC())
				<h5 class="partner-inner-heading">@lang('footer.menu')</h5>
			@endif
			<ul class="menu-list-each">
				<li><a href="{{url('about')}}">@lang('footer.about')</a></li>
				<li><a href="{{url('faqs')}}">@lang('footer.faqs')</a></li>
				<li><a href="{{url('guides')}}">@lang('sidebar.guides')</a></li>
				<li><a href="{{url('glossary')}}">@lang('footer.glossary')</a></li>
				<li><a href="{{url('publish-contracts')}}">@lang('footer.publish_contracts')</a></li>
				<li><a href="{{url('contact')}}">@lang('footer.contact')</a></li>
				<li><a href="https://github.com/NRGI/resourcecontracts.org/wiki/API" target="_blank">API</a></li>
			</ul>
		</div>
	</div>
	<div class="footer-bottom">
		<p class="footer-description">@lang('footer.licensed')
			<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">(CC BY-SA 4.0)</a>
		</p>
		<img src="{{url('images/license-buttons.png')}}" width="88" height="31">
	</div>
	@if(!site()->isRC())
		</div>
	@endif
	</div>
</footer>

<script src="{{url('js/app.min.js')}}"></script>
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
