@extends('layout.app')
@section('content')
    @if(auth()->isloggedIn())
        <div class="edit-mode"><div>@lang('admin.editing') <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">@lang('admin.click_here')</a> @lang('admin.to_edit') - <a href="{{url('logout')}}">@lang('admin.logout')</a></div></div>
    @endif

    <div class="content-wrap">
        <h1 id="title">{{$page->title()}}</h1>
        <div id="content">{!!$page->content()!!}</div>
    </div>
@stop