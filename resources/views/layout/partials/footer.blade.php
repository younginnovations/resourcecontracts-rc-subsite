        <footer>
            <div class="row">
                <div class="col-lg-4 footer-left-wrap">
                    <ul>
                        <li><a href="{{url('about')}}">About</a></li>
                        <li><a href="{{url('faqs')}}">FAQs</a></li>
                        <li><a href="{{url('page/resources')}}">Resources</a></li>
                        <li><a href="{{url('glossary')}}">Glossary</a></li>
                        <li><a href="{{url('contact')}}">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-8 footer-right-wrap">
                    <ul>
                        @if(env("CATEGORY")=="rc")
                            <li><a href="http://www.resourcecontracts.org/" target="_blank"><img src="{{url('images/ic-nrgi.png')}}" /></a></li>
                        @endif

                        <li><a href="http://ccsi.columbia.edu/" target="_blank"><img src="{{url('images/ic-cc.png')}}" /></a></li>
                        <li><a href="http://www.worldbank.org/en/topic/governance" target="_blank"><img src="{{url('images/ic-worldbank.png')}}" /></a></li>
                        <li><a href="http://www.dfid.gov.uk" target="_blank"><img src="{{url('images/ic-dfid.png')}}" /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
</div>
<?php
$js = [
        'jquery.min.js',
        'bootstrap.min.js',
        'metisMenu.min.js',
        'raphael-min.js',
        'script.js',
        'select2.min.js',
       // 'morris.min.js',
     //   'morris-data.js',
        'sb-admin-2.js'
];
?>
@foreach($js as $link)
    <script src="{{url(sprintf('js/%s',$link))}}"></script>
@endforeach

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
