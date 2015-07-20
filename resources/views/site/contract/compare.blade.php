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
        <div id="search-form-compare">
            <form method="POST" action="{{route('contract.page.search', ["id"=>$contract1['contract_id']])}}" accept-charset="UTF-8" class="form-inline page-search pull-right" style="width: 421px; margin: 0 auto 23px;">
                <div class="form-group">
                    <div class="input-group">
                        <input id="textfield" class="form-control" placeholder="Search..." style="padding:15px; width:280px" name="q" type="text">
                    </div>
                </div>
                <input class="btn btn-primary" type="submit" value="Search"><a href='#' id="search-results-cache" style="display:none;" class="pull-left">R</a>
            </form>
        </div>

        </div>
        <a href="#" class="view-pins-button panel-info_button">View Pins</a>
        <div id="pinList" class="pin-list" style="display:none">
            <div class="pull-right pin-buttons">
                <button class="exportPins">export</button>
                <button class="removeAllPins">clear all</button></div>
                <div id="no-pin-message"></div>
            </div>
        </div>

        <div class="panel-body panel-view-wrapper">
            <div class="top-document-wrapper">
                <div class="left-title-wrap">
                    <div class="title pull-left">{{$contract1['metadata']['contract_name']}}</div>
                    <div class="pull-right">
                        <div class="annotation-pop-wrap">
                          <a id="annotation-button-left" class="btn btn-default annotation_button" href="#">Annotations</a>
                            <div id="annotations_list_left" class="annotation-list" style="display:none"></div>
                            </div>
                        <div class="annotation-pop-wrap">
                          <a id="metadata-button-left" class="btn btn-default metadata_button" href="#">Metadata</a>
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
                            <a id="annotation-button-right" class="btn btn-default annotation_button" href="#">Annotations</a>
                            <div id="annotations_list_right" class="annotation-list" style="display:none"></div>
                            </div>
                        <div class="annotation-pop-wrap">
                            <a id="metadata-button-right" class="btn btn-default metadata_button" href="#">Metadata</a>
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
                        <div class="quill-wrapper">
                            <div></div>
                            <div id="editor_left" class="editor"></div>
                        </div>
                        <div id="SearchResultsListLeft" style="display:none"></div>
                     </div>
                    
                    <div id="annotatorjs_right" class="right-document-wrap">                        
                        <div class="quill-wrapper">
                            <div></div>
                           <div id="editor_right" class="editor"></div>
                        </div>
                        <div id="SearchResultsListRight" style="display:none"></div>
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
    <script src="{{ url('js/lib/backbone.localstorage.js') }}"></script>
    <script src="{{ url('js/lib/backbone.exportcsv.js') }}"></script>


    <script src="{{ url('js/custom/rc.utils.js') }}"></script>
    <script src="{{ url('js/custom/rc.contract.js') }}"></script>
    <script src="{{ url('js/custom/rc.page.js') }}"></script>
    <script src="{{ url('js/custom/rc.pagination.js') }}"></script>
    <script src="{{ url('js/custom/rc.pdf.js') }}"></script>
    <script src="{{ url('js/custom/rc.texteditor.js') }}"></script>    
    <script src="{{ url('js/custom/rc.annotator.js') }}"></script>    
    <script src="{{ url('js/custom/rc.annotations.js') }}"></script>    
    <script src="{{ url('js/custom/rc.search.js') }}"></script>    
    <script src="{{ url('js/custom/rc.metadata.js') }}"></script>
    <script src="{{ url('js/custom/rc.pinning.js') }}"></script>
    <script src="{{ url('js/custom/rc.scroll.js') }}"></script>

    <script type="text/template" id="metadata-view-template">
        <div class="popup-metadata">
        <p><strong>Contract Title:</strong><%= contract_name %></p>
        <p><strong>Country:</strong> <%= country.name %></p>
        <p><strong>Date of signature:</strong> <%= signature_date %></p>
        <p><strong>Resource:</strong>
            <%=resource%>
        </p></div>
    </script>

    <script>
    var contract1Events = {}; 
    _.extend(contract1Events, Backbone.Events); 

    var currentPage = 1;
    var contract1Metadata = {!!json_encode($contract1['metadata'])!!};
    var contract1 = new Contract({
        id: '{{$contract1['contract_id']}}',
        totalPages: '{{$contract1['total_pages']}}',
        currentPage: currentPage,
        annotatorjsAPI: "{{route('contract.page.annotations.search', ['id'=>$contract1['contract_id']])}}"
    });

    var pageModel1 = new Page({
        pageNumber: currentPage,
        loadUrl: "{{route('contract.page.get', ['id'=>$contract1['contract_id']])}}", 
        contractModel: contract1,
        eventsPipe: contract1Events
    }).load(currentPage);

    //pagination view
    new PaginationView({
        el: "#pagination_left",
        totalPages: contract1.getTotalPages(),
        pageModel: pageModel1,
        eventsPipe: contract1Events
    }).render();

    //text editor module
    new TextEditorView({
        el: "#editor_left",
        model: pageModel1
    }).render();

    new Scroller({
        editorEl: "#editor_left",
        eventsPipe: contract1Events
    });

    //annotator js module
    new AnnotatorjsView({
        el: "#annotatorjs_left",
        pageModel: pageModel1,
        contractModel: contract1,
        api: "{{route('contract.page.annotations.search', ['id'=>$contract1['contract_id']])}}"      
    }).render();

    //annotations list module
    new AnnotationsButtonView({
        el: '#annotation-button-left',
        annotationsListView: new AnnotationsListView({
            el: "#annotations_list_left",
            collection: new MyAnnotationCollection({!!json_encode($contract1Annotations)!!}),
            eventsPipe: contract1Events
        }).render()
    });

    //metadata view module
    var metadataButtonView = new MetadataButtonView({
        el: '#metadata-button-left',
        metadataView: new MetadataView({
            el: "#metadata_left",
            metadata: contract1Metadata
        }).render()
    });
    </script>

    <script>
    var contract2Events = {}; 
    _.extend(contract2Events, Backbone.Events);     

    var currentPage = 1;
    var contract2Metadata = {!!json_encode($contract2['metadata'])!!};
    var contract2 = new Contract({
        id: '{{$contract2['contract_id']}}',
        totalPages: '{{$contract2['total_pages']}}',
        currentPage: currentPage,
        annotatorjsAPI: "{{route('contract.page.annotations.search', ['id'=>$contract2['contract_id']])}}"
    });

    var pageModel2 = new Page({
        pageNumber: currentPage,
        loadUrl: "{{route('contract.page.get', ['id'=>$contract2['contract_id']])}}", 
        contractModel: contract2,
        eventsPipe: contract2Events
    }).load(currentPage);

    //pagination view
    new PaginationView({
        el: "#pagination_right",
        totalPages: contract2.getTotalPages(),
        eventsPipe: contract2Events
    }).render();

    //text editor module
    new TextEditorView({
        el: "#editor_right",
        model: pageModel2
    }).render();

    new Scroller({
        editorEl: "#editor_right",
        eventsPipe: contract2Events
    });

    //annotator js module
    new AnnotatorjsView({
        el: "#annotatorjs_right",
        pageModel: pageModel2,
        contractModel: contract2,
        api: "{{route('contract.page.annotations.search', ['id'=>$contract2['contract_id']])}}"        
    }).render();

    //annotations list module
    new AnnotationsButtonView({
        el: '#annotation-button-right',
        annotationsListView: new AnnotationsListView({
            el: "#annotations_list_right",
            collection: new MyAnnotationCollection({!!json_encode($contract2Annotations)!!}),
            eventsPipe: contract2Events
        }).render()
    });

    //metadata view module
    var metadataButtonView = new MetadataButtonView({
        el: '#metadata-button-right',
        metadataView: new MetadataView({
            el: "#metadata_right",
            metadata: contract2Metadata
        }).render()
    });

    var searchResultCollectionLeft = new SearchResultCollection({
        eventsPipe: contract1Events
    });
    var searchResultCollectionRight = new SearchResultCollection({
        eventsPipe: contract2Events
    });
    var searchFormView = new SearchMultipleContractFormView({
        el: '#search-form-compare',
        collectionLeft: searchResultCollectionLeft,
        contractIdLeft: '{{$contract1['contract_id']}}',
        collectionRight: searchResultCollectionRight,
        contractIdRight: '{{$contract2['contract_id']}}',
        events1Pipe: contract1Events,
        events2Pipe: contract2Events
    });

    var searchResultsListLeft = new SearchResultListView({
        el: '#SearchResultsListLeft',
        collection: searchResultCollectionLeft,
        pageModel: pageModel1,
        searchOverlayLayer: '#editor_left',
        eventsPipe: contract1Events
    });

    var searchResultsListRight = new SearchResultListView({
        el: '#SearchResultsListRight',
        collection: searchResultCollectionRight,
        pageModel: pageModel2,
        searchOverlayLayer: '#editor_right',
        eventsPipe: contract2Events
    });
    </script>
    <script type="text/template" id="pin-template">
        <%= pintext %><button class='removePin'>x</button>
    </script>
    <script type="text/javascript">
    //pinning module
    var pinCollection = new PinCollection();
    pinCollection.fetch({reset: true});
    var pinningEditorViewLeft = new PinningEditorView({
        el: '#editor_left',
        contract_title: '{{$contract1['metadata']['contract_name']}}',
        contract_id: '{{$contract1['contract_id']}}',
        page_url: '{{\Illuminate\Support\Facades\Request::url()}}',
        collection: pinCollection,
        eventsPipe: contract1Events        
    });
    var pinningEditorViewRight = new PinningEditorView({
        el: '#editor_right',
        contract_title: '{{$contract2['metadata']['contract_name']}}',
        contract_id: '{{$contract2['contract_id']}}',
        page_url: '{{\Illuminate\Support\Facades\Request::url()}}',
        collection: pinCollection,
        eventsPipe: contract2Events
    });
    var pinListView = new PinListView({
        el: '#pinList',
        collection: pinCollection,
    });
    var pinButtonView = new PinButtonView({
        el: '.view-pins-button',
        collection: pinCollection,
        pinListView: pinListView
    }).render();
    </script>
@stop
