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

    <div class="research-and-analysis row">
        <h1 class="col-md-12">featured</h1>
        <table class="col-md-8 col-md-offset-2">
            <tbody>
            @foreach($featured as $research)
                <tr>
                    <td><a href="{{ $research->url }}">{{ $research->title }}</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    <div class="row">
        <h2 class="col-md-12">More links</h2>
        <table class="col-md-8 col-md-offset-2">
            <tbody>
            @foreach($researches as $research)
                <tr>
                    <td><a href="{{ $research->url }}">{{ $research->title }}</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@stop