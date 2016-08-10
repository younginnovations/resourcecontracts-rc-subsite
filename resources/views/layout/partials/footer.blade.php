<!-- footer start -->
    <footer>
        <p class="partner-description"> @lang('footer.message')</p>
        <div class="partner-wrapper clearfix">
            <div class="col-md-10 partner-inner row">
                <div class="row">
                    <div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
                        <h5 class="partner-inner-heading">FOUNDING PARTNERS</h5>
                        <ul>
                            @if(env("CATEGORY")=="rc")
                                <li><a href="http://www.resourcegovernance.org/" class="img-responsive" target="_blank"><img src="{{url('images/logo_nrgi.png')}}"  width="142" height="72" /></a></li>
                            @endif
                            <li><a href="http://ccsi.columbia.edu/" class="img-responsive" target="_blank"><img src="{{url('images/logo_columbia_university.png')}}" width="194" height="49" /></a></li>
                            <li><a href="http://www.worldbank.org/en/topic/governance" class="img-responsive" target="_blank"><img src="{{url('images/logo_wb.png')}}" width="218" height="43" /></a></li>

                        </ul>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
                        <h5 class="partner-inner-heading">DONORS</h5>
                        <ul>
                            <li><a href="http://www.dfid.gov.uk"  class="img-responsive" target="_blank"><img src="{{url('images/logo_ukaid.png')}}" width="147" height="50" /></a></li>
                            @if(env("CATEGORY")=="rc")
                                <li><a href="http://www.afdb.org/en/topics-and-sectors/initiatives-partnerships/african-legal-support-facility/"  class="img-responsive" target="_blank"><img src="{{url('images/logo_alsf.png')}}" width="56" height="68" /></a></li>
                            @endif
                        </ul>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
                        <h5 class="partner-inner-heading">CONTENT PARTNER</h5>
                        <ul>
                            <li><a href="http://openoil.net/"  class="img-responsive" target="_blank"><img src="{{url('images/logo_oo.png')}}" width="54" height="49" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-2 menu-list row">
                <h5 class="partner-inner-heading">MENU</h5>
                <ul class="menu-list-each">
                    <li><a href="{{url('about')}}">@lang('footer.about')</a></li>
                    <li><a href="{{url('faqs')}}">FAQs</a></li>
                    <li><a href="{{url('page/resources')}}">@lang('global.resources')</a></li>
                    <li><a href="{{url('glossary')}}">@lang('footer.glossary')</a></li>
                    <li><a href="{{url('publish-contracts')}}">@lang('footer.publish_contracts')</a></li>
                    <li><a href="{{url('contact')}}">@lang('footer.contact')</a></li>
                    <li><a href="https://github.com/NRGI/resourcecontracts.org/wiki/API" target="_blank">API</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="footer-description">@lang('footer.licensed') <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">(CC BY-SA 4.0)</a></p>
            <img src="{{url('images/license-buttons.png')}}" width="88" height="31">
        </div>
</footer>
<!-- footer ends -->
    </div>
</div>
<script src="{{url('js/app.min.js')}}"></script>
<script src="{{url('js/homepage.js')}}"></script>
@yield('js')
{{--<script src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js">--}}
</script>
<script>
    $(document).ready(function(){
        $('.autoplay').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            /*autoplay: true,
            autoplaySpeed: 2000,*/

        });

    });
</script>
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
