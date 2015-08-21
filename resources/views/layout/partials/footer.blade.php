
<footer>
            <div class="row">
                <div class="col-lg-6">
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Faq</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <ul>
                        <li><a href="#"><img src="{{url('images/ic-gei-icon.png')}}" /></a></li>
                        <li><a href="#"><img src="{{url('images/ic-nrgi-icon.png')}}" /></a></li>
                        <li><a href="#"><img src="{{url('images/ic-cc-icon.png')}}" /></a></li>
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
       // 'morris.min.js',
     //   'morris-data.js',
        'sb-admin-2.js'
];
?>
@foreach($js as $link)
    <script src="{{url(sprintf('js/%s',$link))}}"></script>
@endforeach

@yield('js')

@if(env('APP_DEBUG') == false)
    <hr/>
    <pre style="background: #ccc; padding: 10px;">
    {{\Session::get('url')}}
            {{dd(\Session::get('response'))}}
    </pre>
@endif

</body>
</html>
