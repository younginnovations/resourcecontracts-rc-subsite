@include('layout.partials.head')

<div class="main-container">
    @include('layout.partials.new-header')

    @include('layout.partials.new-sidebar')

    @yield('content')
</div>

@include('layout.partials.new-footer')