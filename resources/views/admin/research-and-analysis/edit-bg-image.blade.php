@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{url('js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript" src="{{url('js/tinymce/tinymce-init.js')}}"></script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.research_and_analysis.background_image')</h3>
        </div>
        <div class="panel-body">
            <p><strong>Background image</strong></p>
            <form method="post" action="{{route('admin.research-and-analysis.store-background-image')}}" enctype='multipart/form-data'>
                <p>
                    <input type="file" name="image" required/>
                    <small>Image size must be minimum 200X100px</small>
                </p>
                <p><img width="200" src="{{$image['image_url'] or ''}}"></p>
                <button type="submit" class="btn btn-primary upload"><i class="fa fa-upload"></i> Upload</button>
                <a class="btn btn-default" href="{{route('admin.research-and-analysis.index')}}">@lang('global.cancel')</a>
            </form>

        </div>
    </div>
@stop
