@section('css')
<link href="{{url('/js/lib/summernote/summernote.css')}}" rel="stylesheet">
<link href="{{url('js/lib/editable/bootstrap-editable.css')}}" rel="stylesheet"/>
    <style>
        .note-editor {overflow: inherit}
        .open>.dropdown-menu {
            display: block !important;
        }
    </style>
@stop

@section('content')
    @if(auth()->isloggedIn())
        <div class="edit-mode"><div>You are in editing mode. Please click below to edit - <a href="{{route('logout')}}">Logout</a></div></div>
    @endif
    <div class="content-wrap">
        <h1 id="title">{{$page->title or ''}}</h1>
        <div id="content">{!!$page->content!!}</div>
    </div>
@stop

@if(auth()->isloggedIn())
    @section('js')
        <script>
           var pk_name = '{{$page_name}}';
            var api_url = '{{route('page')}}';
        </script>
        <script src="{{url('js/page.min.js')}}"></script>
    @stop
@endif