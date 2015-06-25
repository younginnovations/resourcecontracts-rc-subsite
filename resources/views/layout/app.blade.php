@include('layout.partials.header')
<div id="wrapper">
    @include('layout.partials.menu')
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    @yield('content')
                </div>
            </div>
        </div>
    </div>
</div>
@include('layout.partials.footer')
