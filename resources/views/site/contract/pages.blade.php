@extends('layout.app-full')
@section('css')
    <link rel="stylesheet" href="{{ url('css/pagination.css') }}"/>
    <link rel="stylesheet" href="{{ url('css/annotator.css') }}">
@stop
@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="pull-left">
                <a href="{{route('contract.detail',['id'=>$contract['contract_id']])}}" class="go-back">Go back to
                    Contract detail</a>

                <div class="title">{{$contract['metadata']['contract_name']}}</div>
            </div>
            <div class=" pull-right contract-actions view-document-action">
                <a target="_blank" href="{{ isset($document['metadata']['file_url']) ? $document['metadata']['file_url'] : ''}}" class="download">Download<span
                            class="size">({{getFileSize($contract['metadata']['file_size'])}})</span></a>
                <div class="contract-annotations">
                    <a href="javascript:void();" class="open-annotations">View Annotations</a>
                    <a href="javascript:void();" class="open-metadata">View Metadata</a>
                </div>
            </div>
        </div>
        <div id="searchForm"></div>
        <script type="text/template" id="searchFormTemplate">

                <form method="POST" action="{{route('contract.page.search', ["id"=>$contract['contract_id']])}}" accept-charset="UTF-8" class="form-inline page-search pull-right" style="width: 421px; margin: 0 auto 23px;">
                    <div class="form-group">
                        <div class="input-group">
                            <input id="textfield" class="form-control" placeholder="Search..." style="padding:15px; width:280px" name="q" type="text">
                        </div>
                    </div>
                    <input class="btn btn-primary" type="submit" value="Submit">
                </form>

        </script>
        <div class="panel-body panel-view-wrapper">
            <div id="pagelist">
                <div id="pagination"></div>

            <div class="document-wrap">
                <div id="annotatorjs" class="left-document-wrap">
                    <div class="quill-wrapper">
                        <!-- Create the toolbar container -->
                        <div id="toolbar" class="ql-toolbar ql-snow">

                        </div>
                        <div id="editor" style="height: 750px" class="editor ql-container ql-snow">
                        </div>

                    </div>
                </div>
                <div class="right-document-wrap search">
                    <canvas id="pdfcanvas"></canvas>
                    <div id="SearchResultsList" style='display:none'></div>
                </div>
                <div class="searchresults"></div>

            </div>
        </div>
    </div>
    </div>
@endsection

@section('script')
    <script src="{{ url('js/lib/annotator/annotator-full.min.js') }}"></script>
    <script src="{{ url('js/lib/quill/quill.js') }}"></script>
    <script src="{{ url('js/lib/pdfjs/pdf.js') }}"></script>
    <script src="{{ url('js/lib/jquery.simplePagination.js') }}"></script>
    <script src="{{ url('js/lib/underscore.js') }}"></script>
    <script src="{{ url('js/lib/backbone.js') }}"></script>
    <script src="{{ url('js/contractmvc.js') }}"></script>

    <script>
        //defining format to use .format function
        String.prototype.format = function () {
            var formatted = this;
            for (var i = 0; i < arguments.length; i++) {
                var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                formatted = formatted.replace(regexp, arguments[i]);
            }
            return formatted;
        };
        var contract = new Contract({
            id: '{{$contract['contract_id']}}',
            totalPages: '{{$contract['total_pages']}}',
            currentPage: '{{1}}',
            currentPageId: '{{1}}',

            editorEl: '#editor',
            paginationEl: '#pagination',
            // annotationEl: '#annotation',
            pdfviewEl: 'pdfcanvas',
            annotatorjsEl: '#annotatorjs',
            textLoadAPI: "{{route('contract.page.get', ['id'=>$contract['contract_id']])}}",
            annotatorjsAPI: "{{route('contract.page.get', ['id'=>$contract['contract_id']])}}"
        });

        var pageView = new PageView({
            pageModel: contract.getPageModel(),
            paginationView: new PaginationView({
                paginationEl: contract.getPaginationEl(),
                totalPages: contract.getTotalPages(),
                pageModel: contract.getPageModel()
            }),
            textEditorView: new TextEditorView({
                editorEl: contract.getEditorEl(),
                pageModel: contract.getPageModel()
            }),
            pdfView: new PdfView({
                pdfviewEl: contract.getPdfviewEl(),
                pageModel: contract.getPageModel()
            }),
            annotatorjsView: new AnnotatorjsView({
                annotatorjsEl: contract.getAnnotatorjsEl(),
                pageModel: contract.getPageModel(),
                contractModel: contract,
                tags:[]
            }),
            searchFormView: new SearchFormView({
                collection: contract.searchResultCollection,
                el: '#searchForm'
            }),
            searchResultsList: new SearchResultListView({
                el: '#SearchResultsList',
                collection: contract.searchResultCollection,
                pageModel: contract.getPageModel(),
            }),
        }).render();
    </script>
@stop

