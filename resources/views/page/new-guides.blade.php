@extends('layout.app')
@section('content')
    @if(auth()->isloggedIn())
        <div class="edit-mode"><div>@lang('admin.editing') <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">@lang('admin.click_here')</a> @lang('admin.to_edit') - <a href="{{url('logout')}}">@lang('admin.logout')</a></div></div>
    @endif

    <div class="content-static-wrap">
        <h1 id="title">
        <!-- title here -->
        </h1>
        <div id="content">
        <!-- content here -->
        </div>
    </div>
@stop