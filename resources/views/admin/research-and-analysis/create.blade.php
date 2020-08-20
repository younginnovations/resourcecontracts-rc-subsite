@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{url('js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript" src="{{url('js/tinymce/tinymce-init.js')}}"></script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.research_and_analysis.add_new')</h3>
        </div>
        <div class="panel-body">
            <form action="{{route('admin.research-and-analysis.store')}}" method="POST">
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
                            <label for="title">@lang('admin.research_and_analysis.title'):</label>
                            <input id="title" class="form-control" name="title[{{$code}}]" value="{{old('title.' . $code)}}"/>
                        </div>
                    </div>
                @endforeach
                </div>
                <div class="form-group">
                    <label for="url">@lang('admin.research_and_analysis.url'):</label>
                    <input type="text" id="url" class="form-control" value="{{old('url')}}" name="url" required>
                </div>
                <div class="form-group">
                    <label for="publication_date">@lang('admin.research_and_analysis.publication_date'):</label>
                    <input type="date" id="date" class="form-control" value="{{old('publication_date')}}" name="publication_date" required>
                </div>
                <div class="form-group">
                    <input type="checkbox" id="ignore_publication_day" name="ignore_publication_day">
                    <label for="ignore_publication_day">@lang('admin.research_and_analysis.ignore_publication_day')</label>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <a class="btn btn-default" href="{{route('admin.research-and-analysis.index')}}">@lang('global.cancel')</a>
                </div>
            </form>
        </div>
    </div>
@stop
