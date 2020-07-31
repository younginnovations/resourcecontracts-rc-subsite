@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{url('js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript" src="{{url('js/tinymce/tinymce-init.js')}}"></script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.add_new_research_analysis')</h3>
        </div>
        <div class="panel-body">
            <form action="{{route('admin.research-and-analysis.store')}}" method="POST">
{{--                @foreach(config('language') as $code=>$lang)--}}
{{--                    <div role="tabpanel" class="tab-pane @if($code == 'en') active @endif " id="{{$code}}">--}}
{{--                        <div class="form-group">--}}
{{--                            <label for="title">@lang('admin.title'):</label>--}}
{{--                            <input id="title" class="form-control" name="title[{{$code}}]" value="{{old('title')}}"/>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                @endforeach--}}
                <div class="form-group">
                    <label for="url">@lang('admin.title'):</label>
                    <input type="text" id="url" class="form-control" value="{{old('title')}}" name="title">
                </div>
                <div class="form-group">
                    <label for="url">@lang('admin.url'):</label>
                    <input type="text" id="url" class="form-control" value="{{old('url')}}" name="url">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <a class="btn btn-default" href="{{route('admin.research-and-analysis.index')}}">@lang('global.cancel')</a>
                </div>
            </form>
        </div>
    </div>
@stop