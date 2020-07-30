@extends('layout.admin')

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <h3 class="panel-title pull-left">@lang('admin.research_and_analysis')</h3>
            @if(auth()->user()->is_admin)
                <div class="pull-right">
                    <a class="btn btn-default" href="{{ route('admin.research-and-analysis.create') }}">
                        @lang('admin.add_new_research_analysis')</a>
                </div>
            @endif
            <div class="panel-body">
                <table class="table">
                    <thead>
                    <tr>
                        <th>@lang('admin.id')</th>
                        <th>@lang('admin.title')</th>
                        <th>@lang('admin.link')</th>
                        <th style="min-width: 228px;">@lang('admin.action')</th>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($pages as $page)
                            <tr>
                                <td>{{ $page->id }}</td>
                                <td>{{ $page->title }}</td>
                                <td><a href="{{ $page->url }}">{{ $page->url }}</a></td>
                                <td>
                                    <a target="_blank" class="btn btn-success" style="color: white;" href="{{url($page->url)}}" title="View page">
                                        <i class="fa fa-eye"></i>
                                    </a>
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