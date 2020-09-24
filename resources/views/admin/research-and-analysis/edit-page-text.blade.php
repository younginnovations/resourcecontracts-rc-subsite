@extends('layout.admin')

@section('js')
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.research_and_analysis.configure_text')</h3>
        </div>
        <div class="panel-body">
            <form  action="{{route('admin.research-and-analysis.text-configuration')}}" method="POST">
                <ul class="nav nav-tabs" role="tablist">
                    @foreach(config('language') as $code=>$lang)
                        <li role="page" @if($code == 'en') class="active" @endif ><a href="#{{$code}}" aria-controls="{{$code}}" role="tab" data-toggle="tab">{{$lang['name']}}</a></li>
                    @endforeach
                </ul>
                <div class="tab-content" style="padding-top: 20px;">
                    @foreach(config('language') as $code=>$lang)
                        <div role="tabpanel" class="tab-pane @if($code == 'en') active @endif " id="{{$code}}">
                            <div class="form-group">
                                <label for="title">@lang('admin.research_and_analysis.heading'):</label>
                                <input id="title" class="form-control" name="title[{{$code}}]" value="{{ array_get($textOptions, join('.', ['title',$code])) }}"/>
                            </div>

                            <div class="form-group">
                                <label for="title">@lang('admin.research_and_analysis.description'):</label>
                                <textarea style="width:100%; height:100px" id="content" class="form-control {{$code}}" name="description[{{$code}}]" >{{ array_get($textOptions, join('.', ['description',$code])) }}</textarea>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <a class="btn btn-default" href="{{route('admin.page')}}">@lang('global.cancel')</a>
                </div>
            </form>
        </div>
    </div>
@stop
