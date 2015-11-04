@extends('layout.admin')

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Manage Pages</h3>
        </div>
        <div class="panel-body">
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
                        @foreach($pages as   $page)
                            <tr>
                                <td>{{$page->id}}</td>
                                <td>{{$page->title->en}}</td>
                                <td>{{$page->slug}}</td>
                                <td>
                                    <a target="_blank" class="btn btn-success" href="{{url($page->slug)}}">
                                        <i class="fa fa-eye"></i>
                                    </a>
                                    <a class="btn btn-primary" href="{{route('admin.page.update', ['id'=>$page->id])}}">
                                        <i class="fa fa-pencil-square-o"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
            </table>
        </div>
    </div>
@stop
