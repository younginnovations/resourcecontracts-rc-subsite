@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{url('js/tinymce/tinymce.min.js')}}"></script>
    <script>
        tinymce.init({
            selector: "textarea",
            theme: "modern",
            width: 700,
            height: 300,
            plugins: [
                "advlist autolink link image lists charmap  hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality template paste textcolor"
            ],
            content_css: "css/content.css",
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image |  media fullpage | forecolor backcolor",
        });
    </script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Add new page</h3>
        </div>
        <div class="panel-body">
    <form class="form-horizontal" action="{{route('admin.page.store')}}" method="POST">
        <ul class="nav nav-tabs" role="tablist">
            @foreach(config('language') as $code=>$lang)
                <li role="page" @if($code == 'en') class="active" @endif ><a href="#{{$code}}" aria-controls="{{$code}}" role="tab" data-toggle="tab">{{$lang['name']}}</a></li>
            @endforeach
        </ul>
        <div class="tab-content" style="padding-top: 20px;">
            @foreach(config('language') as $code=>$lang)
                <div role="tabpanel" class="tab-pane @if($code == 'en') active @endif " id="{{$code}}">

                    <div class="form-group">
                        <label class="col-md-2 control-label">Title:</label>
                        <div class="col-md-6">
                            <input id="title" class="form-control" name="title[{{$code}}]" value="{{old('title')}}"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-2 control-label">Content:</label>
                        <div class="col-md-6">
                            <textarea style="width:100%; height:500px" id="content" class="{{$code}}" name="content[{{$code}}]" >{{old('content')}}</textarea>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="form-group">
            <div class="col-md-6 col-md-offset-2">
                <button type="submit" class="btn btn-primary">Submit</button>
                <a class="btn btn-default" href="{{route('admin.page')}}">Cancel</a>
            </div>
        </div>
    </form>
    </div>
    </div>
@stop