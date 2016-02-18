@extends('layout.admin')

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.manage_pages')</h3>
        </div>
        <div class="panel-body">
            @if(isAdmin())
                <span><a class="btn btn-default" href="{{ route('admin.page.create') }}">Add New Page</a></span>
            @endif
            <table class="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Page Title</th>
                    <th>Slug</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                @foreach($pages as $page)
                    <tr>

                        <td>{{$page->id}}</td>
                        <td>{{$page->title->en}}</td>
                        <td>{{$page->slug}}</td>
                        <td>
                            <a target="_blank" class="btn btn-success" href="{{url($page->slug)}}">
                                <i class="fa fa-eye"></i>
                            </a>
                            <a class="btn btn-primary" href="{{route('admin.page.update', ['slug'=>$page->slug])}}">
                                <i class="fa fa-pencil-square-o"></i>
                            </a>

                            @if(isAdmin())
                                <form method="POST" action="{{ route('admin.page.delete' , ['id' => $page->id]) }}" accept-charset="UTF-8" style="display:inline">
                                    <input name="_method" type="hidden" value="DELETE">
                                    <input name="_token" type="hidden" value="{{ csrf_token()}}">
                                    <button type="submit" class="btn btn-danger confirm" data-confirm="Are you sure you want to delete this page?"><i class="fa fa-trash"> </i></button>
                                </form>
                            @endif

                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
