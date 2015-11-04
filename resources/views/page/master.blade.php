@extends('layout.app')
@section('content')
    @if(auth()->isloggedIn())
        <div class="edit-mode"><div>You are in editing mode. Please <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">click here</a> to edit page - <a href="{{url('logout')}}">Logout</a></div></div>
    @endif

    <div class="content-wrap">
        <h1 id="title">{{$page->title()}}</h1>
        <div id="content">{!!$page->content()!!}</div>
    </div>
@stop