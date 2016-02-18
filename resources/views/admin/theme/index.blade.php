@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{url('js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript" src="{{url('js/tinymce-init.js')}}"></script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Manage Theme</h3>
        </div>

        <div class="panel-body">
            <form action="{{ route('theme.store') }}" method="POST" enctype="multipart/form-data">

                <div class="form-group">
                    <label for="image[bg]"><strong>Background Image:</strong></label> <br>
                    <input type="file" name="image[bg]" id="image[bg]">
                    <small>Image size must be minimum 960X500px</small>
                    <br>
                    <p><img width="200" src="{{$homePageImage}}"></p>
                </div>

                <div class="form-group">
                    <label for="image[sidebar]"><strong>Sidebar Image:</strong></label> <br>
                    <input type="file" name="image[sidebar]" id="image[sidebar]">
                    <small>Image size must be minimum 240X200</small>
                    <br>
                    <p><img width="200" src="{{$sidebarImage}}"></p>
                </div>

                <div class="form-group">
                    <label for="color[primary-color]"><strong>Primary Color:</strong></label> <br>
                    <input type="color" name="color[primary-color]" value="{{$primaryColor }}" id="color[primary-color]">
                </div>

                <div class="form-group">
                    <label for="color[secondary-color]"><strong>Secondary Color:</strong></label> <br>
                    <input type="color" name="color[secondary-color]" value="{{$secondaryColor}}" id="color[secondary-color]">
                </div>

                <div class="form-group">
                    <label for="color[sidebar-color]"><strong>Sidebar Color:</strong></label> <br>
                    <input type="color" name="color[sidebar-color]" value="{{$sidebarColor}}" id="color[sidebar-color]">
                </div>
                <div class="form-group">
                    <label for="info[footer-text]"><strong>Footer Text</strong></label><br>
                    <textarea name="info[footer-text]" id="info[footer-text]" class="form-control">{{ $footerText }}</textarea>
                </div>

                <hr>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>

@stop
