@extends('layout.admin')

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <h3 class="panel-title pull-left">@lang('admin.research_and_analysis.research_and_analysis')</h3>
            @if(auth()->user()->is_admin)
                <div class="pull-right">
                    <a class="btn btn-default" href="{{ route('admin.research-and-analysis.get-featured') }}">@lang('admin.research_and_analysis.manage_featured')</a>
                    <a class="btn btn-default" href="{{ route('admin.research-and-analysis.create') }}">@lang('admin.research_and_analysis.add_new')</a>
                    <a class="btn btn-primary" href="{{route('admin.research-and-analysis.edit-background-image')}}">@lang('admin.research_and_analysis.edit_background_image_title')</a>
                    <a class="btn btn-primary" href="{{route('admin.research-and-analysis.text-configuration')}}">@lang('admin.research_and_analysis.configure_text')</a>
                </div>
            @endif
            <div class="panel-body">
                <table class="table" style="word-break: break-word;">
                    <thead>
                    <tr>
                        <th style="width: 10%">@lang('admin.id')</th>
                        <th style="width: 40%">@lang('admin.title')</th>
                        <th style="width: 30%">@lang('admin.research_and_analysis.links')</th>
                        <th style="width: 20%">@lang('admin.action')</th>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($pages as $page)
                            <tr>
                                <td>{{ $page->id }}</td>
                                <td>{{ $page->title->en }}</td>
                                <td><a href="{{ $page->url }}">{{ $page->url }}</a></td>
                                <td>
                                    <a class="btn btn-primary" style="color: white;" href="{{route('admin.research-and-analysis.edit', ['id'=>$page->id])}}" title="Edit page">
                                        <i class="fa fa-pencil-square-o"></i>
                                    </a>
                                    <form method="POST" action="{{ route('admin.research-and-analysis.delete' , ['id' => $page->id]) }}" accept-charset="UTF-8" style="display:inline" onsubmit="return confirm('Are you sure to delete this research and analysis  ?');">
                                        <input name="_method" type="hidden" value="DELETE">
                                        <input name="_token" type="hidden" value="{{ csrf_token()}}">
                                        <button type="submit" class="btn btn-danger confirm" data-confirm="Are you sure you want to delete this page?" title="Delete page"><i class="fa fa-trash"> </i></button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div>{!! $pages->render() !!}</div>
            </div>
        </div>
    </div>
@stop
@section('js')
    <script type="text/javascript">
        $('document').ready(function() {
        });
    </script>
@endsection
