@extends('layout.app-full')
@section('content')
    <div class="panel panel-default">        
        <div class="panel-heading"> 
            <div class="pull-left">
            <a href="{{route('contract.detail',['id'=>$contract['contract_id']])}}" class="go-back">Go back to contract detail</a>
             <div class="title">{{$contract['metadata']['contract_name']}}</div>
            </div>       
            <div class=" pull-right contract-actions view-document-action">
            <a href="" class="download">Download<span class="size">({{getFileSize($contract['metadata']['file_size'])}})</span></a>
            <a href="" class="view-annotations open-annotations">View Annotations</a>
            <a href="" class="view-annotations close-annotations">close Annotations</a>
            </div>
       </div>
        <div class="panel-body panel-view-wrapper">
            <div id="pagelist"><ul class="pagination"><li class="first"><a href="#">First</a></li><li class="prev"><a href="#">Previous</a></li><li class="page"><a href="#">1</a></li><li class="page"><a href="#">2</a></li><li class="page"><a href="#">3</a></li><li class="page"><a href="#">4</a></li><li class="page"><a href="#">5</a></li><li class="page"><a href="#">6</a></li><li class="page"><a href="#">7</a></li><li class="page"><a href="#">8</a></li><li class="page"><a href="#">9</a></li><li class="page"><a href="#">10</a></li><li class="next"><a href="#">Next</a></li><li class="last"><a href="#">Last</a></li></ul></div>
            <div class="document-wrap">
                <div class="left-document-wrap">{!!$page['text']!!}</div>
                <div class="right-document-wrap"></div>
            </div>
        </div>
    </div>
@endsection

