@extends('layout.admin')

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.manage_image')</h3>
        </div>
        <div class="panel-body">
            <p><strong>@lang('admin.home_image')</strong></p>
            <form method="post" action="{{route('admin.image.upload')}}" enctype='multipart/form-data'>
                <p><input type="file" name="image" />
                    <small>@lang('admin.min_size')</small>
                </p>
                <p><img width="200" src="{{$image}}"></p>
                <button type="submit" class="btn btn-primary">@lang('admin.upload')</button>
            </form>
        </div>
    </div>
@stop
