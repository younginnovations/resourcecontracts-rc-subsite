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
            <form action="{{route('admin.research-and-analysis.update', ['id' => $research->id ])}}" method="POST">
                <input type="hidden" name="_method" value="put">
                <div class="form-group">
                    <label for="url">@lang('admin.title'):</label>
                    <input type="text" id="url" class="form-control" value="{{$research->title}}" name="title">
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