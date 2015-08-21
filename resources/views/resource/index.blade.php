@extends('layout.app')

@section('content')
<ul>
    @foreach($resources as $resource)
        <li>
            <a href="{{route('resource.detail', ['key' => $resource->key])}}">{{$resource->key}}</a>
            {{$resource->doc_count}}
        </li>
    @endforeach
</ul>
@stop