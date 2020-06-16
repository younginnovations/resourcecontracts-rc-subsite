<footer>
	<div class="footer__wrap">
		<p class="partner-description">
			{!! nl2br(getOptionText('footer_text')) !!}
		</p>
		<div class="partner-wrapper clearfix">

			@include('layout.partials.footer_partners')

			<div class="footer-bottom">
				<p class="footer-description">@lang('footer.licensed')
					<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" dir="rtl">(CC BY-SA 4.0)</a>
					<!-- <img src="{{url('images/license-buttons.png')}}" width="88" height="31"> -->
				</p>
			</div>
		</div>
	</div>
</footer>

@include('contract.partials.emailModal')

<script src="{{url('js/app.js')}}?v=2019-11-25"></script>
@yield('js')
@stack('footer-scripts')
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