@extends('layout.admin')

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.manage_image')</h3>
        </div>
        <div class="panel-body">
            <p><strong>Home Page Image</strong></p>
            <form method="post" action="{{route('admin.image.upload' , ['type' => 'bg'])}}" enctype='multipart/form-data'>
                <p><input type="file" name="image[bg]" />
                    <small>Image size must be minimum 960X500px</small>
                </p>
                <p><img width="200" src="{{$homePageImage}}"></p>
                <button type="submit" class="btn btn-primary upload"><i class="fa fa-upload"></i> Upload</button>
            </form>
            <hr>
            <p><strong>Side Bar Image</strong></p>
            <form method="post" action="{{route('admin.image.upload' , ['type' => 'sidebar'])}}" enctype='multipart/form-data'>
                <p><input type="file" name="image" />
                    <small>Image size must be minimum 240X200</small>
                </p>
                <p><img width="200" src="{{$sidebarImage}}"></p>
                <button type="submit" class="btn btn-primary upload"><i class="fa fa-upload"></i> Upload</button>
            </form>


        </div>
    </div>
@stop
