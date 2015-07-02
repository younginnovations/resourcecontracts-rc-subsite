@extends('layout.app-full')
@section('css')
    <link rel="stylesheet" href="{{ url('css/pagination.css') }}"/>
    <link rel="stylesheet" href="{{ url('css/annotator.css') }}">
    <link rel="stylesheet" href="{{ url('css/simplePagination.css') }}">
    <style>
        .annotation-list {
            display: block;
            position: absolute;
            top: 40px;
            right: 0px;
            width: 400px;
            background-color: #eee;
        }
        .metadata {
            display: block;
            position: absolute;
            top: 40px;
            right: 0px;
            width: 400px;
            background-color: #eee;
        }
    </style>
@stop
@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="pull-left">
                <div class="title">Compare Contracts</div>

            </div>
            <a class="btn btn-default pull-right" href="{{route('home')}}">Home</a>
        </div>
        <div class="panel-body panel-view-wrapper">
            <div id="pagelist">
                <div class="document-wrap">

                    <div id="annotatorjs_left" class="left-document-wrap">
                        <div class="title">{{$contract1['metadata']['contract_name']}}</div>
                        <a id="left" class="btn btn-default pull-right annotation_button" href="#">Annotations</a>
                        <a id="left" class="btn btn-default pull-right metadata_button" href="#">Metadata</a>

                        <div class="quill-wrapper">
                            <div id="pagination_left"></div>

                            <div id="editor_left" class="editor"></div>
                        </div>
                        <div id="metadata_left" class="metadata" style="display:none"></div>
                        <div id="annotations_list_left" class="annotation-list" style="display:none"></div>
                    </div>
                    <div class="right-document-wrap" id="annotatorjs_right">
                        <div class="title">{{$contract2['metadata']['contract_name']}}</div>
                        <a id="right" class="btn btn-default pull-right annotation_button" href="#">Annotations</a>
                        <a id="right" class="btn btn-default pull-right metadata_button" href="#">Metadata</a>

                        <div class="quill-wrapper">
                            <div id="pagination_right"></div>
                            <div id="editor_right" class="editor"></div>
                        </div>
                        <div id="metadata_right" class="metadata" style="display:none"></div>
                        <div id="annotations_list_right" class="annotation-list" style="display:none"></div>
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
        <table class="table">
            <tr>
                <td>Contract Identifier</td>
                <td><%= contract_identifier %></td>
            </tr>
            <tr>
                <td>Language</td>
                <td><%= language %></td>
            </tr>

            <tr>
                <td>Government Entity</td>
                <td><%= government_entity %></td>
            </tr>
            <tr>
                <td>Government Identifier</td>
                <td><%= government_identifier %></td>
            </tr>
            <tr>
                <td>Type of Contract</td>
                <td><%= type_of_contract %></td>
            </tr>
            <tr>
                <td>Signature Date</td>
                <td><%= signature_date %></td>
            </tr>
            <tr>
                <td>Document Type</td>
                <td><%= document_type %></td>
            </tr>
            <tr>
                <td>Translation from original</td>
                <td><%= translation_parent %></td>
            </tr>
        </table>
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

    </script>
@stop

