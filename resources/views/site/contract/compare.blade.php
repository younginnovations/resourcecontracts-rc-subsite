@extends('layout.app-full')
@section('css')
    <link rel="stylesheet" href="{{ url('css/pagination.css') }}"/>
    <link rel="stylesheet" href="{{ url('css/annotator.css') }}">
@stop
@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="pull-left">
                <div class="title">Compare Contracts</div>
            </div>
            <div id="searchFormCompare"></div>
            <script type="text/template" id="searchFormTemplate">
                <form method="POST" action="{{route('contract.page.search', ["id"=>$contract1['contract_id']])}}" accept-charset="UTF-8" class="form-inline page-search pull-right" style="width: 421px; margin: 0 auto 23px;">
                    <div class="form-group">
                        <div class="input-group">
                            <input id="textfield" class="form-control" placeholder="Search..." style="padding:15px; width:280px" name="q" type="text">
                        </div>
                    </div>
                    <input class="btn btn-primary" type="submit" value="Search">
                </form>
            </script>
            {{--<a class="btn btn-default pull-right" href="{{route('home')}}">Home</a>--}}
        </div>
        <div class="panel-body panel-view-wrapper">
            <div class="top-document-wrapper">
                <div class="left-title-wrap">
                    <div class="title pull-left">{{$contract1['metadata']['contract_name']}}</div>
                    <div class="pull-right">
                        <div class="annotation-pop-wrap">
                          <a id="left" class="btn btn-default annotation_button" href="#">Annotations</a>
                            <div id="annotations_list_left" class="annotation-list" style="display:none"></div>
                            </div>
                        <div class="annotation-pop-wrap">
                          <a id="left" class="btn btn-default metadata_button" href="#">Metadata</a>
                            <div id="metadata_left" class="metadata" style="display:none"></div>
                        </div>
                    </div>
                    <div id="pagination">
                      <div id="pagination_left"></div>
                    </div>
                </div>
                <div class="right-title-wrap">
                    <div class="title pull-left">{{$contract2['metadata']['contract_name']}}</div>
                    <div class="pull-right">
                        <div class="annotation-pop-wrap">
                            <a id="right" class="btn btn-default annotation_button" href="#">Annotations</a>
                            <div id="annotations_list_right" class="annotation-list" style="display:none"></div>
                            </div>
                        <div class="annotation-pop-wrap">
                            <a id="right" class="btn btn-default metadata_button" href="#">Metadata</a>
                            <div id="metadata_right" class="metadata" style="display:none"></div>
                        </div>
                    </div>
                    <div id="pagination">
                      <div id="pagination_right"></div>
                    </div>
                </div>
            </div>
            <div id="pagelist">
                <div class="document-wrap">
                    <div id="annotatorjs_left" class="left-document-wrap">
                        <div id="SearchResultsListRight"></div>
                      <div class="quill-wrapper">
                            <div id="editor_left" class="editor"></div>
                        </div>
                     </div>
                    <div class="right-document-wrap" id="annotatorjs_right">
                        <div id="SearchResultsListLeft" ></div>
                        <div class="quill-wrapper">
                           <div id="editor_right" class="editor"></div>
                        </div>
                    </div>
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
    <script type="text/template" id="metadataViewTemplate">
        <div class="popup-metadata">
            <p><strong>Contract Title:</strong><%= contract_name %></p>
            <p><strong>Country:</strong> <%= country.name %></p>
            <p><strong>Date of signature:</strong> <%= signature_date %></p>
            <p><strong>Resource:</strong>
                <%=resource %>
            </p></div>

    </script>
    <script>
        var contract1Annotations = {!!json_encode($contract1Annotations)!!};
        var contract2Annotations = {!!json_encode($contract2Annotations)!!};
        var contract1Metadata = {!!json_encode($contract1['metadata'])!!};
        var contract2Metadata = {!!json_encode($contract2['metadata'])!!};
        var contractLeft = new Contract({
            id: '{{$contract1['contract_id']}}',
            totalPages: '{{$contract1['total_pages']}}',
            currentPage: 1,

            editorEl: '#editor_left',
            paginationEl: '#pagination_left',
            annotationslistEl: '#annotations_list_left',
            metadataEl: '#metadata_left',
            annotatorjsEl: '#annotatorjs_left',

            textLoadAPI: "{{route('contract.page.get', ['id'=>$contract1['contract_id']])}}",
            annotatorjsAPI: "{{route('contract.page.get', ['id'=>$contract1['contract_id']])}}"
        });

        var annotationsCollection = new MyAnnotationCollection()
        contract1Annotations.forEach(function (annotationData) {
            annotationsCollection.add(annotationData);
        });

        var pageViewLeft = new PageView({
            pageModel: contractLeft.getPageModel(),
            paginationView: new PaginationView({
                paginationEl: contractLeft.getPaginationEl(),
                totalPages: contractLeft.getTotalPages(),
                pageModel: contractLeft.getPageModel()
            }),
            textEditorView: new TextEditorView({
                editorEl: contractLeft.getEditorEl(),
                pageModel: contractLeft.getPageModel()
            }),
            // pdfView: new PdfView({
            //     pdfviewEl: contract.getPdfviewEl(),
            //     pageModel: contract.getPageModel()
            // }),
            annotatorjsView: new AnnotatorjsView({
                annotatorjsEl: contractLeft.getAnnotatorjsEl(),
                pageModel: contractLeft.getPageModel(),
                contractModel: contractLeft,
                tags: []
            }),
            annotationsListView: new AnnotationsListView({
                annotationslistEl: contractLeft.getAnnotationsListEl(),
                collection: annotationsCollection,
                pageModel: contractLeft.getPageModel()
            }),
            metadataView: new MetadataView({
                metadataEl: contractLeft.getMetadataEl(),
                metadata: contract1Metadata,
                pageModel: contractLeft.getPageModel()
            })
        }).render();

        $('.annotation_button').click(function () {
            if (this.id == "left") pageViewLeft.toggleAnnotationList();
            if (this.id == "right") pageViewRight.toggleAnnotationList();
            // $(el).toggle();
        });
        $('.metadata_button').click(function () {
            if (this.id == "left") pageViewLeft.toggleMetadataList();
            if (this.id == "right") pageViewRight.toggleMetadataList();
            // $(el).toggle();
        });


        var contractRight = new Contract({
            id: '{{$contract2['contract_id']}}',
            totalPages: '{{$contract2['total_pages']}}',
            currentPage: 1,

            editorEl: '#editor_right',
            paginationEl: '#pagination_right',
            annotationslistEl: '#annotations_list_right',
            metadataEl: '#metadata_right',
            annotatorjsEl: '#annotatorjs_right',

            textLoadAPI: "{{route('contract.page.get', ['id'=>$contract2['contract_id']])}}",

            annotatorjsAPI: "{{route('contract.page.get', ['id'=>$contract2['contract_id']])}}"
        });

        var annotationsCollection2 = new MyAnnotationCollection()
        contract2Annotations.forEach(function (annotationData) {
            annotationsCollection2.add(annotationData);
        });


        var pageViewRight = new PageView({
            pageModel: contractRight.getPageModel(),
            paginationView: new PaginationView({
                paginationEl: contractRight.getPaginationEl(),
                totalPages: contractRight.getTotalPages(),
                pageModel: contractRight.getPageModel()
            }),
            textEditorView: new TextEditorView({
                editorEl: contractRight.getEditorEl(),
                pageModel: contractRight.getPageModel()
            }),
            annotatorjsView: new AnnotatorjsView({
                annotatorjsEl: contractRight.getAnnotatorjsEl(),
                pageModel: contractRight.getPageModel(),
                contractModel: contractRight,
                tags: []
            }),
            annotationsListView: new AnnotationsListView({
                annotationslistEl: contractRight.getAnnotationsListEl(),
                collection: annotationsCollection2,
                pageModel: contractRight.getPageModel()
            }),
            metadataView: new MetadataView({
                metadataEl: contractRight.getMetadataEl(),
                metadata: contract2Metadata,
                pageModel: contractRight.getPageModel()
            })

        }).render();

        var searchView = new PageView({
            searchFormView: new SearchMultipleContractFormView({
                collectionRight: contractRight.searchResultCollection,
                collectionLeft: contractLeft.searchResultCollection,
                contractIdRight: '{{$contract1['contract_id']}}',
                contractIdLeft: '{{$contract2['contract_id']}}',
                el: '#searchFormCompare'
            }),
            searchResultsListLeft: new SearchResultListView({
                el: '#SearchResultsListLeft',
                collection: contractLeft.searchResultCollection,
                pageModel: contractLeft.getPageModel(),
                searchOverlayLayer: '.editor'
            }),
            searchResultsListRight: new SearchResultListView({
                el: '#SearchResultsListRight',
                collection: contractRight.searchResultCollection,
                pageModel: contractRight.getPageModel(),
                searchOverlayLayer: '.editor'
            })
        }).render();


    </script>
@stop
