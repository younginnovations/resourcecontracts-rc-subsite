@include('layout.partials.head')

@if(\Request::url() != url())
    @include('layout.partials.header')
@endif

@include('layout.partials.sidebar')

@yield('content')

@include('layout.partials.footer')