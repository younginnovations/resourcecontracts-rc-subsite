@extends('layout.app')
{{-- hide search bar from 404 page only--}}
@section('search-bar')
@endsection
@section('content')
    <div class="row">
        <div class="col-lg-12 not-found-wrapper">
            <div class="not-found-container">
                <div class="not-found-content">
                    <div class="error-text" style="padding-top: 100px;">404!</div>
                    <p>@lang('global.page_doesnt_exist')</p>
                    <p>@lang('global.if_you_are_looking')</p>
                </div>
            </div>
        </div>
    </div>
@stop
