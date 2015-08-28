@include('layout.partials.head')

@yield('content')



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
