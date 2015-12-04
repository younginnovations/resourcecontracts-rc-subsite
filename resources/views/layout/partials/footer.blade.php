        <footer>
            <div class="footer-note">
                <text class="small">
                    @lang('footer.message')
                </text>
            </div>
            <div class="row">
                <div class="col-lg-3 footer-left-wrap">
                    <ul>
                        <li><a href="{{url('about')}}">@lang('footer.about')</a></li>
                        <li><a href="{{url('faqs')}}">FAQs</a></li>
                        <li><a href="{{url('page/resources')}}">@lang('global.resources')</a></li>
                        <li><a href="{{url('glossary')}}">@lang('footer.glossary')</a></li>
                        <li><a href="{{url('publish-contracts')}}">@lang('footer.publish_contracts')</a></li>
                        <li><a href="{{url('contact')}}">@lang('footer.contact')</a></li>
                        <li><a href="https://github.com/NRGI/resourcecontracts.org/wiki/API" target="_blank">API</a></li>
                    </ul>
                </div>
                <div class="col-lg-9 footer-right-wrap">
                    <ul>
                        @if(env("CATEGORY")=="rc")
                        <li><a href="http://www.resourcegovernance.org/" target="_blank"><img src="{{url('images/ic-nrgi.png')}}" width="142" height="72" /></a></li>
                        @endif
                        <li><a href="http://ccsi.columbia.edu/" target="_blank"><img src="{{url('images/ic-cc.png')}}" width="194" height="49" /></a></li>
                        <li><a href="http://www.worldbank.org/en/topic/governance" target="_blank"><img src="{{url('images/ic-worldbank.png')}}" width="218" height="43" /></a></li>
                        <li><a href="http://www.dfid.gov.uk" target="_blank"><img src="{{url('images/ic-dfid.png')}}" width="147" height="50" /></a></li>
                        @if(env("CATEGORY")=="rc")
                        <li><a href="http://www.afdb.org/en/topics-and-sectors/initiatives-partnerships/african-legal-support-facility/" target="_blank"><img src="{{url('images/ic-alsf.png')}}" width="56" height="68" /></a></li>
                        @endif
                    </ul>
                </div>
                <div class="license-buttons">
                    <p>Content is licensed under Attribution-ShareAlike 4.0 International <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">(CC BY-SA 4.0)</a></p>
                    <img src="{{url('images/license-buttons.png')}}" width="88" height="31" alt="">
                </div>
            </div>
        </footer>
    </div>
</div>
<script src="{{url('js/app.min.js')}}"></script>
@yield('js')
@if(env('TRACKING_ID') != '')
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', '{{env('TRACKING_ID')}}', 'auto');
    ga('send', 'pageview');
</script>
@endif
</body>
</html>
