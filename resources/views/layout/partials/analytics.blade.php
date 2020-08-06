<script src="{{url('js/app.js')}}?v=2020-08-19"></script>
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