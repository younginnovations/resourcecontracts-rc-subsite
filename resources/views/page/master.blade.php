@extends('layout.app')
<?php
$editingMode = auth()->isloggedIn();
$pageVersion = app('request')->get('v');
?>
@section('content')
    @if($editingMode)
        @if (!is_null($pageVersion))
            <div class="edit-mode">
                <div>@lang('admin.editing_page_version', ['version' => 'v' . $pageVersion])
                    <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}?v={{ $pageVersion }}">@lang('admin.click_here')</a> @lang('admin.to_edit') -
                    <a href="{{ url('logout') }}">@lang('admin.logout')</a></div>
            </div>
        @else
            <div class="edit-mode">
                <div>@lang('admin.editing')
                    <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">@lang('admin.click_here')</a> @lang('admin.to_edit') -
                    <a href="{{url('logout')}}">@lang('admin.logout')</a></div>
            </div>
        @endif

    @endif

    <div class="content-static-wrap">
        <h1 id="title">{{$page->title()}}</h1>
        <div id="content">{!!$page->content(app('request')->query('v'))!!}</div>
    </div>
@stop