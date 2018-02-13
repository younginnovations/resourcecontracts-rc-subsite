@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{secure_url('js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript" src="{{secure_url('js/tinymce/tinymce-init.js')}}"></script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.edit_page') : {{$page->title()}}</h3>
        </div>
        <div class="panel-body">
            <form class="" action="{{route('admin.page.update', ['id'=>$page->id])}}" method="POST">
                <ul class="nav nav-tabs" role="tablist">
                    @foreach(config('language') as $code=>$lang)
                        <li role="page" @if($code == 'en') class="active" @endif ><a href="#{{$code}}" aria-controls="{{$code}}" role="tab" data-toggle="tab">{{$lang['name']}}</a></li>
                    @endforeach
                </ul>
                <div class="tab-content" style="padding-top: 20px;">
                    @foreach(config('language') as $code=>$lang)
                        <div role="tabpanel" class="tab-pane @if($code == 'en') active @endif " id="{{$code}}">

                            <div class="form-group" style="margin-bottom: 20px; overflow: hidden">
                                <label class="col-md-12 control-label">@lang('admin.title'):</label>
                                <div class="col-md-12">
                                    <input id="title" class="form-control" name="title[{{$code}}]" value="{{old('title', isset($page->title->$code)?$page->title->$code:'')}}"/>
                                </div>
                            </div>

                            <div class="form-group" style="overflow:hidden; margin-top: 20px;">
                                <label class="col-md-12 control-label">@lang('admin.content'):</label>
                                <div class="col-md-12">
                                    <textarea style="width:100%; height:500px" id="content" class="{{$code}}" name="content[{{$code}}]" >{{old('content', isset($page->content->$code)?$page->content->$code:'')}}</textarea>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="form-group">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-primary">@lang('admin.submit')</button>
                        <a class="btn btn-default" href="{{route('admin.page')}}">@lang('global.cancel')</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
@stop
