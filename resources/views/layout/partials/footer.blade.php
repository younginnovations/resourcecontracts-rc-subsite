<footer>
            <div class="row">
                <div class="col-lg-4">
                    <ul>
                        <li><a href="{{url('about')}}">About</a></li>
                        <li><a href="{{url('faqs')}}">FAQs</a></li>
                        <li><a href="{{url('guides')}}">Guides</a></li>
                        <li><a href="{{url('contact')}}">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-8">
                    <ul class="pull-right">
                        <li><a href="#"><img src="{{url('images/ic-nrgi.png')}}" /></a></li>
                        <li><a href="#"><img src="{{url('images/ic-cc.png')}}" /></a></li>
                        <li><a href="#"><img src="{{url('images/ic-worldbank.png')}}" /></a></li>
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

</body>
</html>
