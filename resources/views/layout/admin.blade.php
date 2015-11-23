@include('layout.partials.head')
@include('layout.partials.header')
<div class="container" style="margin-top: 20px;">

    @if(Session::has('error'))
        <div class="alert alert-danger alert-dismissable">
            <button type="button" class="close" data-dismiss="alert">
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Close</span>
            </button>
            {{ Session::get('error') }}
        </div>
    @endif

    @if(Session::has('success'))
        <div class="alert alert-success alert-dismissable">
            <button type="button" class="close" data-dismiss="alert">
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Close</span>
            </button>
            {{ Session::get('success') }}
        </div>
    @endif
    <?php $url = \Request::getPathInfo();?>
    <div class="row">
        <div class="col-sm-4 col-md-3">
            <div class="list-group">

                <a href="{{route('admin.page')}}" class="@if($url == '/admin' || strpos($url, 'page') != false) active @endif  list-group-item">
                    <i class="fa fa-file-archive-o"></i> Manage Pages
                </a>

                <a href="{{route('admin.image')}}" class="@if(strpos($url, 'image') != false) active @endif list-group-item">
                    <i class="fa fa-image"></i> Manage Image
                </a>

            </div>
        </div>
        <div class="col-lg-8">
            @yield('content')
        </div>
    </div>
</div>

@include('layout.partials.footer')

