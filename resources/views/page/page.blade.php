@section('css')
<link href="{{url('/js/lib/summernote/summernote.css')}}" rel="stylesheet">
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
        <script src="{{url('js/lib/summernote/summernote.js')}}"></script>
        <link href="{{url('js/lib/editable/bootstrap-editable.css')}}" rel="stylesheet"/>
        <script src="{{url('js/lib/editable/bootstrap-editable.min.js')}}"></script>
        <script>
            $.fn.editable.defaults.mode = 'inline';
            $(document).ready(function() {
             $('#content').on('shown', function(e, editable) {
                    editable.input.$input.summernote({
                        minHeight : 700,
                        focus: true
                    });
                 editable.input.$input.code($(this).html());
                });

                $('#title').editable({
                    type: 'text',
                    pk: '{{$page_name}}',
                    url: '{{route('page')}}',
                    title: 'Enter title',
                    validate: function(v) {
                        if(!v) return 'Required field!';
                    }
                });
                $('#content').editable({
                    type: 'wysihtml5',
                    escape:false,
                    pk: '{{$page_name}}',
                    url: '{{route('page')}}',
                    title: 'Enter Content',
                    rows: 40,
                    validate: function(v) {
                        if(!v) return 'Required field!';
                    }
                });
            });
        </script>
    @stop
@endif