@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{url('js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript" src="{{url('js/tinymce/tinymce-init.js')}}"></script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.research_and_analysis.edit_link')</h3>
        </div>
        <div class="panel-body">
            <form action="{{route('admin.research-and-analysis.update', ['id' => $research->id ])}}" method="POST">
                <input type="hidden" name="_method" value="put">
                <ul class="nav nav-tabs" role="tablist">
                    @foreach(config('language') as $code=>$lang)
                        <li role="page" @if($code == 'en') class="active" @endif >
                            <a href="#{{$code}}" aria-controls="{{$code}}" role="tab" data-toggle="tab">{{$lang['name']}}</a>
                        </li>
                    @endforeach
                </ul>

                <div class="tab-content" style="padding-top: 20px;">
                    @foreach(config('language') as $code=>$lang)
                        <div role="tabpanel" class="tab-pane @if($code == 'en') active @endif " id="{{$code}}">
                            <div class="form-group">
                                <label for="title">@lang('admin.title'):</label>
                                <input id="title" class="form-control" name="title[{{$code}}]" value="{{$research->title->$code}}"/>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="form-group">
                    <label for="url">@lang('admin.url'):</label>
                    <input type="text" id="url" class="form-control" value="{{$research->url}}" name="url">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <a class="btn btn-default" href="{{route('admin.research-and-analysis.index')}}">@lang('global.cancel')</a>
                </div>
            </form>
        </div>
    </div>
@stop
