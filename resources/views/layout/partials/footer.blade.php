        <footer>
            <div class="footer-note">
                <text class="small">
                    This site provides summaries of contracts and their terms to facilitate understanding of important provisions in the documents. These summaries are
                    not interpretations of the documents. Neither the summaries nor the full contracts are complete accounts of all legal obligations related to the
                    projects in question. This site also includes document text that was created automatically; such text may contain errors and differences from
                    the original PDF files. No warranty is made to the accuracy of any content on this website.
                </text>
            </div>
            <div class="row">
                <div class="col-lg-3 footer-left-wrap">
                    <ul>
                        <li><a href="{{url('about')}}">About</a></li>
                        <li><a href="{{url('faqs')}}">FAQs</a></li>
                        <li><a href="{{url('page/resources')}}">Resources</a></li>
                        <li><a href="{{url('glossary')}}">Glossary</a></li>
                        <li><a href="{{url('publish-contracts')}}">Publish Contracts</a></li>
                        <li><a href="{{url('contact')}}">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-9 footer-right-wrap">
                    <ul>
                        @if(env("CATEGORY")=="rc")
                            <li><a href="http://www.resourcecontracts.org/" target="_blank"><img src="{{url('images/ic-nrgi.png')}}" /></a></li>
                        @endif

                        <li><a href="http://ccsi.columbia.edu/" target="_blank"><img src="{{url('images/ic-cc.png')}}" /></a></li>
                        <li><a href="http://www.worldbank.org/en/topic/governance" target="_blank"><img src="{{url('images/ic-worldbank.png')}}" /></a></li>
                        <li><a href="http://www.dfid.gov.uk" target="_blank"><img src="{{url('images/ic-dfid.png')}}" /></a></li>
                            @if(env("CATEGORY")=="rc")
                                <li><a href="http://www.afdb.org/en/topics-and-sectors/initiatives-partnerships/african-legal-support-facility/" target="_blank"><img src="{{url('images/ic-alsf.png')}}" /></a></li>
                            @endif
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
