@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{secure_asset('js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript" src="{{secure_asset('js/tinymce/tinymce-init.js')}}"></script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.add_new_page')</h3>
        </div>
        <div class="panel-body">
    <form  action="{{route('admin.page.store')}}" method="POST">
        <ul class="nav nav-tabs" role="tablist">
            @foreach(config('language') as $code=>$lang)
                <li role="page" @if($code == 'en') class="active" @endif ><a href="#{{$code}}" aria-controls="{{$code}}" role="tab" data-toggle="tab">{{$lang['name']}}</a></li>
            @endforeach
        </ul>
        <div class="tab-content" style="padding-top: 20px;">
            @foreach(config('language') as $code=>$lang)
                <div role="tabpanel" class="tab-pane @if($code == 'en') active @endif " id="{{$code}}">
                    <div class="form-group">
                        <label for="title">@lang('admin.title'):</label>
                        <input id="title" class="form-control" name="title[{{$code}}]" value="{{old('title')}}"/>
                    </div>

                    <div class="form-group">
                        <label for="title">@lang('admin.content'):</label>
                        <textarea style="width:100%; height:500px" id="content" class="{{$code}}" name="content[{{$code}}]" >{{old('content')}}</textarea>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="form-group">
            <div class="col-md-6 col-md-offset-2">
                <button type="submit" class="btn btn-primary">Submit</button>
                <a class="btn btn-default" href="{{route('admin.page')}}">@lang('global.cancel')</a>
            </div>
        </div>
    </form>
    </div>
    </div>
@stop