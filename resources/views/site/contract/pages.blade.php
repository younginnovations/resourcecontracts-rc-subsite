@extends('layout.app-full')
@section('css')
    <link rel="stylesheet" href="{{ url('css/pages.css') }}">
    <link rel="stylesheet" href="{{ url('css/pagination.css') }}"/>
    <link rel="stylesheet" href="{{ url('css/annotator.css') }}">
@stop
@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="pull-left title-bar-left">
                <div class="title">{{$contract['metadata']['contract_name']}}</div>
                <a href="{{route('contract.detail',['id'=>$contract['contract_id']])}}" class="go-back">Go back to
                    Contract detail</a>
            </div>
            <div class=" pull-right contract-actions view-document-action">
                <a target="_blank" href="{{ $contract['metadata']['file_url'] or ''}}" class="download">Download<span
                            class="size">({{getFileSize($contract['metadata']['file_size'])}})</span></a>
                <div class="contract-annotations annotation-pop-wrap">

                    <a href="#" class="view-pins-button panel-info_button">View Pins</a>
                    <div id="pinList" class="pin-list" style="display:none">
                        <div class="pull-right pin-buttons">
                            <button class="exportPins btn-primary">export</button>
                            <button class="removeAllPins btn-danger">clear all</button></div>
                            <div id="no-pin-message"></div>
                        </div>
                    </div>
                <div class="contract-annotations annotation-pop-wrap">
                    <a href="#" class="annotation_button">View Annotations</a>
                    <div id="annotations_list" class="annotation-list" style="display:none"></div>
                </div>
                <div class="contract-metadata annotation-pop-wrap">
                    <a href="#" class="metadata_button">View Metadata</a>
                    <div id="metadata" class="metadata" style="display:none"></div>
                </div>
            </div>

        <div id="search-form">
            <form method="POST" action="{{route('contract.page.search', ["id"=>$contract['contract_id']])}}" accept-charset="UTF-8" class="form-inline page-search pull-right">
                <div class="form-group">
                    <div class="input-group">
                        <input id="textfield" class="form-control" placeholder="Search..." name="q" type="text">
                    </div>
                </div>
                <input class="btn btn-primary" type="submit" value="Search">
                <a href='#' id="search-results-cache" style="display:none;" class="pull-right">Results</a>

            </form>
        </div>
    </div>        
        <div class="panel-body panel-view-wrapper">
            <!-- <div id="auto-scroll" class="pull-left">AutoScroll <input type="checkbox" name='autoscroll' value="On"></div> -->
            <div id="pagination"></div>
            <div class="document-wrap">
                <div id="annotatorjs" class="left-document-wrap">
                    <div class="quill-wrapper">
                        <div></div>
                        <div id="editor" style="height: 750px" class="editor ql-container ql-snow"></div>
                    </div>
                </div>
                <div class="right-document-wrap search">
                    <canvas id="pdfcanvas"></canvas>
                    <div id="search-results-list" style='display:none'></div>
                </div>
                <div class="searchresults"></div>
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
    <script src="{{ url('js/custom/annotator.plugin.categories.js') }}"></script> 
    <script src="{{ url('js/custom/rc.contract.js') }}"></script>
    <script src="{{ url('js/custom/rc.page.js') }}"></script>
    <script src="{{ url('js/custom/rc.pagination.js') }}"></script>
    <script src="{{ url('js/custom/rc.pdf.js') }}"></script>
    <script src="{{ url('js/custom/rc.texteditor.js') }}"></script>    
    <script src="{{ url('js/custom/rc.annotations.js') }}"></script>    
    <script src="{{ url('js/custom/rc.search.js') }}"></script>    
    <script src="{{ url('js/custom/rc.annotator.js') }}"></script>    
    <script src="{{ url('js/custom/rc.metadata.js') }}"></script>
    <script src="{{ url('js/custom/rc.pinning.js') }}"></script>
    <script src="{{ url('js/custom/rc.scroll.js') }}"></script>

    <script type="text/javascript">
    var contractEvents = {};
    _.extend(contractEvents, Backbone.Events);
    var contractMetadata = {!!json_encode($contract['metadata'])!!};
    var currentPage = '{{1}}';
    var contract = new Contract({
        id: '{{$contract['contract_id']}}',
        metadata: contractMetadata,
        totalPages: '{{$contract['total_pages']}}',
        currentPage: '{{1}}',
        currentPageId: '{{1}}',
        annotatorjsAPI: "{{route('contract.page.annotations.search', ['id'=>$contract['contract_id']])}}",
    });

    var pageModel = new Page({
        pageNumber: currentPage || 1,
        loadUrl: "{{route('contract.page.get', ['id'=>$contract['contract_id']])}}", 
        contractModel: contract,
        eventsPipe: contractEvents
    }).load(currentPage);

    //pagination view
    var paginationView = new PaginationView({
        el: "#pagination",
        totalPages: contract.getTotalPages(),
        model: pageModel,
        eventsPipe: contractEvents
    }).render();

    //text editor module
    var textEditorView = new TextEditorView({
        el: "#editor",
        model: pageModel
    }).render();

    //pdf view module
    var pdfView = new PdfView({
        el: "pdfcanvas",
        model: pageModel
    });

    var scroller = new Scroller({
        editorEl: "#editor",
        eventsPipe: contractEvents
    });

    //search module
    var searchResultCollection = new SearchResultCollection({
        eventsPipe: contractEvents
    });
    var searchFormView = new SearchFormView({
        el: '#search-form',
        collection: searchResultCollection,
        url: "{{route('contract.page.search', ["id"=>$contract['contract_id']])}}",
        eventsPipe: contractEvents
    }).render();
    var searchResultsList = new SearchResultListView({
        el: '#search-results-list',
        collection: searchResultCollection,
        searchOverlayLayer: '#pdfcanvas',
        eventsPipe: contractEvents
    });

    //annotator js module
    var annotatorjsView = new AnnotatorjsView({
        el: "#annotatorjs",
        pageModel: pageModel,
        contractModel: contract,
        api: "{{route('contract.page.annotations.search', ['id'=>$contract['contract_id']])}}",
        tags: []
    });
    annotatorjsView.render();
    </script>

    <script type="text/template" id="annotation-item-template">
        <div class="page-num"><%= page %></div>
        <div class="annotation-item-description">
        <a href="#" class='quote'><%= quote %></a>
        <button class="pin-it btn-primary">pin</button>
        <p><%= text %></p>
        </div>
    </script>

    <script type="text/javascript">
    //annotations list module
    var annotationsCollection = new MyAnnotationCollection({!!json_encode($annotations)!!});    
    var annotationsListView = new AnnotationsListView({
        el: "#annotations_list",
        collection: annotationsCollection,
        eventsPipe: contractEvents,
        contractModel: contract,
    }).render();
    var annotationsButtonView = new AnnotationsButtonView({
        el: '.annotation_button',
        annotationsListView: annotationsListView
    });
    </script>
    <script type="text/template" id="metadata-view-template">
        <div class="popup-metadata">
        <p><strong>Contract Title:</strong><%= contract_name %></p>
        <p><strong>Country:</strong> <%= country.name %></p>
        <p><strong>Date of signature:</strong> <%= signature_date %></p>
        <p><strong>Resource:</strong>
            <%=resource%>
        </p></div>
    </script>
    <script type="text/javascript">
    //metadata view module
    var metadataView = new MetadataView({
        el: "#metadata",
        metadata: contractMetadata
    }).render();
    var metadataButtonView = new MetadataButtonView({
        el: '.metadata_button',
        metadataView: metadataView
    });
    </script>
    <script type="text/template" id="pin-template">
        <%= pintext %><button class='removePin btn-danger'>x</button>
    </script>
    <script type="text/javascript">
    //pinning module
    var pinCollection = new PinCollection();
    pinCollection.fetch({reset: true});
    var pinningEditorView = new PinningEditorView({
        el: '.editor',
        contract_title: '{{$contract['metadata']['contract_name']}}',
        contract_id: '{{$contract['contract_id']}}',
        page_url: '{{\Illuminate\Support\Facades\Request::url()}}',
        collection: pinCollection
    });
    var pinListView = new PinListView({
        el: '#pinList',
        collection: pinCollection,
        eventsPipe: contractEvents
    });
    var pinButtonView = new PinButtonView({
        el: '.view-pins-button',
        collection: pinCollection,
        pinListView: pinListView
    }).render();
 
    </script>
@stop

