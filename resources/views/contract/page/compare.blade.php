@extends('layout.app-blank')
@section('css')
    <link rel="stylesheet" href="{{ url('css/annotation/pages.css') }}">
    <link rel="stylesheet" href="{{ url('css/annotation/pagination.css') }}"/>
    <link rel="stylesheet" href="{{ url('css/annotation/annotator.css') }}">
    <link rel="stylesheet" href="{{ url('css/jquery-ui.css') }}">
    <link rel="stylesheet" href="{{ url('css/contract-viewer.css') }}">
    <link rel="stylesheet" href="{{ url('css/contract-compare.css') }}">
@stop
@section('content')
    <div class="panel panel-default">
        <div class="panel-heading panel-heading-fixed">
            <div class="word-wrapper">            
                <div class="wordwrap pull-left"> 
                    <a href="{{route('contract.detail',['id'=>$contract1->metadata->contract_id])}}" class="back pull-left">Go back</a>
                    <span class="pull-left">Contracts Compare</span>            
                </div>
                <div class="pull-right">
                    <div class="view-metadata">
                        <a class="btn-pins pull-right" href="#">View Pins</a>
                    </div>
                    <div id="pinLists" class="pinlist" style="display:none"></div>  
                    <div id="search-form" class="pull-right">
                        <form method="POST" action="{{route('contract.page.search', ['id'=>$contract1->metadata->contract_id])}}" accept-charset="UTF-8" class="form-inline page-search pull-right">
                            <div class="form-group">
                                <div class="input-group">
                                    <input id="textfield" class="form-control" placeholder="Search in this document.." name="q" type="text">
                                </div>
                            </div>
                            <input class="btn btn-primary pull-left" type="submit" value="Search">
                            <a href='#' id="search-results-cache" style="display:none;" class="pull-right">Results</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-body panel-compare">
            <div class="col-lg-6">
                <div class="wordwrap pull-left"> 
                    <span class="pull-left">{{str_limit($contract1->metadata->contract_name, 50)}}</span>            
                </div>            
                <div class="document-wrap-head">
                    <div class="navigation pull-left"> 
                        <a href="#" id="text1-view">Text</a> 
                        <a href='#' id="pdf1-view">Pdf</a>                  
                    </div>
                    <div class="pull-right">
                        <div id="pagination-text1" class="view-text-pagination pull-left">
                            <a href="#" class="previous">&laquo;</a>
                            <input placeholder="Goto Page" type="number" class="small-input goto_page" title="Go to page">
                            <a href="#" class="next">&raquo;</a>
                        </div>
                        <div id="pagination-pdf1" class="view-text-pagination pull-left" style="display:none">
                            <a href="#" class="previous">&laquo;</a>
                            <input placeholder="Goto Page" type="number" class="small-input goto_pdfpage" title="Go to page">
                            <a href="#" class="next">&raquo;</a>
                        </div>
                        <div class="view-metadata">
                            <a id="btn-metadata1" class="btn-metadata pull-left" href="#">Metadata</a>
                            <a id="btn-annotation1" class="btn-annotation pull-right" href="#">Annotation</a>
                        </div>
                        <div id="metadata1" class="metadata" style="display:none"></div> 
                    </div>
                </div>
                <div class="view-wrapper">
                     <div id="message" style="padding: 0px 16px"></div>
                    <div class="document-wrap">
                        <div id="column-text1" class="column-text">
                            <span class="text-view-block">
                                <div id="text1-viewer-wrapper-overflow-scroll" class="_ annotator-text view-wrap">
                                    <!-- 
                                    don't understand why class="annotator-text" doesn't work, putting any dummy class makes the popup appear 
                                    similarly one extra <div> is required after <div class="annotator-text">, otherwise the annotation also doesn't appear
                                    -->
                                    <div></div>
                                    <div class="text-viewer-wrapper">
                                        <div id="text-viewer-overflow-scroll" class="text-viewer" >Loading ...</div>    
                                    </div>
                                    
                                </div>
                            </span>                            
                        </div>
                        <div id="column-pdf1" class="column-pdf" style="display:none">
                            <span class="pdf-view-block" >
                                <div class="annotator-pdf view-wrap">
                                    <canvas id="pdfcanvas1" width="500px" height="700px"></canvas>
                                </div>
                            </span>
                        </div>
                        <div id="column-annotations1" class="column-annotations" style="display:none">
                            <div id="annotations1-list-view" class="annotation-list-view annotations-view-block"></div>                    
                        </div>                        
                    </div>
                </div>
            </div>
            
            <div class="col-lg-6">
                <div class="wordwrap pull-left"> 
                    <span class="pull-left">{{str_limit($contract2->metadata->contract_name, 50)}}</span>            
                </div>            
                <div class="document-wrap-head">
                    <div class="navigation pull-left"> 
                        <a href="#" id="text2-view">Text</a> 
                        <a href='#' id="pdf2-view">Pdf</a>                     
                    </div>
                    <div class="pull-right">
                        <div id="pagination-text2" class="view-text-pagination pull-left">
                            <a href="#" class="previous">&laquo;</a>
                            <input placeholder="Goto Page" type="number" class="small-input goto_page" title="Go to page">
                            <a href="#" class="next">&raquo;</a>
                        </div>
                        <div id="pagination-pdf2" class="view-text-pagination pull-left" style="display:none">
                            <a href="#" class="previous">&laquo;</a>
                            <input placeholder="Goto Page" type="number" class="small-input goto_pdfpage" title="Go to page">
                            <a href="#" class="next">&raquo;</a>
                        </div>
                        <div class="view-metadata">
                            <a id="btn-metadata2" class="btn-metadata pull-left" href="#">Metadata</a>
                            <a id="btn-annotation2" class="btn-annotation pull-right" href="#">Annotation</a>
                        </div>
                        <div id="metadata2" class="metadata" style="display:none"></div> 
                    </div>
                </div>
                <div class="view-wrapper">
                    <div class="document-wrap">
                        <div id="column-text2" class="column-text">
                            <span class="text-view-block">
                                <div id="text2-viewer-wrapper-overflow-scroll" class="_ annotator-text view-wrap">
                                    <!-- 
                                    don't understand why class="annotator-text" doesn't work, putting any dummy class makes the popup appear 
                                    similarly one extra <div> is required after <div class="annotator-text">, otherwise the annotation also doesn't appear
                                    -->
                                    <div></div>
                                    <div class="text-viewer-wrapper">
                                        <div id="text-viewer-overflow-scroll" class="text-viewer" >Loading ...</div>    
                                    </div>
                                    
                                </div>
                            </span>                            
                        </div>
                        <div id="column-pdf2" class="column-pdf" style="display:none">
                            <span class="pdf-view-block" >
                                <div class="annotator-pdf view-wrap">
                                    <canvas id="pdfcanvas2" width="500px" height="700px"></canvas>
                                </div>
                            </span>
                        </div>
                        <div id="column-annotations2" class="column-annotations" style="display:none">
                            <div id="annotations2-list-view" class="annotation-list-view annotations-view-block"></div>                    
                        </div>                                                
                    </div>
                </div>
            </div>           


        </div>
    </div>    
@endsection

@section('js')
    <script>
        var app_url = '{{url()}}';
    </script>
    <script src="{{ url('js/select2.min.js') }}"></script>
    <script src="{{ url('js/lib/annotator/annotator-full.min.js') }}"></script>
    <script src="{{ url('js/lib/pdfjs/pdf.js') }}"></script>

    <script src="{{ url('js/lib/underscore.js') }}"></script>    
    <script src="{{ url('js/lib/backbone.js') }}"></script>
    <script src="{{ url('js/lib/backbone.localstorage.js') }}"></script>
    <script src="{{ url('js/lib/backbone.exportcsv.js') }}"></script>
    <script src="{{ url('js/lib/jquery.xpath.js') }}"></script> 
    <script src="{{ url('js/lib/jquery.waypoints.js') }}"></script>    

    <script src="{{ url('js/lib/annotator.plugin.annotorious.js') }}"></script>
    <script src="{{ url('js/custom/rc.pages.collection.js') }}"></script> 
    <script src="{{ url('js/custom/rc.text.viewer.js') }}"></script> 

    <script src="{{ url('js/custom/rc.utils.js') }}"></script>
    <script src="{{ url('js/custom/rc.contract.js') }}"></script>

    <script src="{{ url('js/custom/rc.pdf.js') }}"></script>

    <script src="{{ url('js/custom/annotator.plugin.event.js') }}"></script>
    <script src="{{ url('js/custom/annotator.plugin.categories.js') }}"></script>
    <script src="{{ url('js/custom/annotator.plugin.tags.js') }}"></script>
    <script src="{{ url('js/custom/rc.annotations.js') }}"></script>
    <script src="{{ url('js/custom/rc.annotator.js') }}"></script>
    <script src="{{ url('js/custom/rc.metadata.js') }}"></script>
    <script src="{{ url('js/custom/rc.search.js') }}"></script>
    <script src="{{ url('js/custom/rc.pinning.js') }}"></script>

    <script type="text/template" id="text-page-partial-view">
        <span id="<%= page_no %>">
        <span><%= page_no %></span>
        <%= nl2br(text) %>
        </span>
    </script>
    <script type="text/template" id="annotation-list-title-template">
        <div class="annotation-title">Annotations</div>
    </script>
    <script type="text/template" id="annotation-category-no-items-template">
        <div class="annotation-category-not-done">
            <%= categoryName %> <small>Not annotated yet</small>
        </div>
    </script>
    <script type="text/template" id="annotation-category-with-items-template">
        <div class="annotation-category-done">
            <%= categoryName %> [<%= categoryItemsCount %>]
            <ul id="<%= elemId %>"></ul>
        </div>
    </script>
    <script type="text/template" id="annotation-item-view-template">
        <div>
            <span class="text"><%= text %></span>

            <a href='#' class="quote">
                <% if (typeof quote !== "undefined") { %>
                <%= quote %>
                <% } %>
            </a>

            <% if (typeof page_no !== "undefined") { %>
            <span class="page-no">Pg <a href='#'><%= page_no %></a></span>
            <% } %>

            <% if (typeof tags !== "undefined") { %>
            <% _.each(tags, function(tag) { %>
                <span class="tag"><%= tag %></span>
            <% }); %>
            <% } %>
        </div>
    </script>
    <script>
    var contract1 = new Contract({
        id: '{{$contract1->metadata->contract_id}}',
        // metadata: {!!json_encode($contract1->metadata)!!},
        canEdit: false,
        canAnnotate: false,
    });
    var contract2 = new Contract({
        id: '{{$contract2->metadata->contract_id}}',
        // metadata: {!!json_encode($contract1->metadata)!!},
        canEdit: false,
        canAnnotate: false,
    });
    var rcEvents1 = {};
    var rcEvents2 = {};
    _.extend(rcEvents1, Backbone.Events);
    _.extend(rcEvents2, Backbone.Events);

    var Tabs = Backbone.View.extend({
        el: '.panel',
        events: {
            "click #text1-view": "text1View",
            "click #pdf1-view": "pdf1View",
            "click #btn-annotation1": "annotations1View",
            "click #text2-view": "text2View",
            "click #pdf2-view": "pdf2View",
            "click #btn-annotation2": "annotations2View",
            "click input[type=submit]": "searchView",
            "click a#search-results-cache": "searchView"
        },
        initialize: function() {
            this.textTabEl = $('.text-view-block');           
            this.pdfTabEl = $('.pdf-view-block');
            this.currentPage = null;
            this.viewerPage = null;
            this.currentPdfPage = null;
            this.pdfAnnotatorjsView = null;
            this.annotationsTabEl = $('.annotations-view-block');                        
            // this.initAnnotationsView();
            // this.initPdfView();
            // this.initSearch();
            // this.textView();

            this.initText2View();
            this.initText1View();
            this.initPdf1View();
            this.initPdf2View();
            this.initAnnotations1View();
            this.initAnnotations2View();
        },
        text1View: function(e) {
            if(e) e.preventDefault();
            $('#column-text1').show();
            $('#column-pdf1').hide();
            $('#column-annotations1').hide();            
            $('#pagination-text1').show();
            $('#pagination-pdf1').hide();
        },
        pdf1View: function(e) {
            if(e) e.preventDefault();
            $('#column-text1').hide();
            $('#column-pdf1').show();
            $('#column-annotations1').hide();            
            $('#pagination-text1').hide();
            $('#pagination-pdf1').show();
        },
        text2View: function(e) {
            if(e) e.preventDefault();
            $('#column-text2').show();
            $('#column-pdf2').hide();
            $('#column-annotations2').hide();            
            $('#pagination-text2').show();
            $('#pagination-pdf2').hide();
        },
        pdf2View: function(e) {
            if(e) e.preventDefault();
            $('#column-text2').hide();
            $('#column-pdf2').show();
            $('#column-annotations2').hide();                        
            $('#pagination-text2').hide();
            $('#pagination-pdf2').show();
            // if(!this.pdfAnnotatorjsView) {
            //     this.pdfAnnotatorjsView = new PdfAnnotatorjsView({
            //         el: ".annotator-pdf",
            //         currentPage: this.currentPdfPage,
            //         contract: contract,
            //         api: "{{route('contract.page.annotations.search', ['id'=>$contract1->metadata->contract_id])}}",
            //         availableTags: {!! json_encode(trans("codelist/annotation.tags")) !!},
            //         collection: annotationCollection,
            //         annotationCategories: annotationCategories,
            //         enablePdfAnnotation: false
            //     });   
            // }
        },
        annotations1View: function(e) {
            if(e) e.preventDefault();
            $('#column-annotations1').show();
            $('#column-text1').hide();
            $('#column-pdf1').hide();
            $('#pagination-text1').hide();
            $('#pagination-pdf1').hide();
        },
        annotations2View: function(e) {
            if(e) e.preventDefault();
            $('#column-annotations2').show();
            $('#column-text2').hide();
            $('#column-pdf2').hide();
            $('#pagination-text2').hide();
            $('#pagination-pdf2').hide();
        },        
        searchView: function(e) {
            if(e) e.preventDefault();
            $('.column-text').show();
            $('.column-text').removeClass('column-common');
            $('.column-pdf').hide();
            $('.column-annotations').hide();
            $('.column-search-results').show();               
        },
        initText1View: function() {
            var viewerPages = new ViewerPagesCollection([], {
                url: "{{route('contract.allpage.get', ['id'=>$contract1->metadata->contract_id])}}"
            });
            viewerPages.fetch({reset: true});
            var currentPage = new ViewerCurrentPage({
                collection: viewerPages
            });
            new TextViewerView({
                el: '#text1-viewer-wrapper-overflow-scroll',
                collection: viewerPages,
                rcEvents: rcEvents1,
                currentPage: currentPage
            });
            new TextViewerPagination({
                el: '#pagination-text1',
                collection: viewerPages,
                currentPage: currentPage
            });  
        },
        initText2View: function() {
            var viewerPages = new ViewerPagesCollection([], {
                url: "{{route('contract.allpage.get', ['id'=>$contract2->metadata->contract_id])}}"
            });
            viewerPages.fetch({reset: true});
            var currentPage = new ViewerCurrentPage({
                collection: viewerPages
            });
            new TextViewerView({
                el: '#text2-viewer-wrapper-overflow-scroll',
                collection: viewerPages,
                rcEvents: rcEvents2,
                currentPage: currentPage
            });
            new TextViewerPagination({
                el: '#pagination-text2',
                collection: viewerPages,
                currentPage: currentPage
            });  
        },        
        initPdf1View: function() {
            var pdfPages = new PdfPagesCollection();
            pdfPages.url = "{{route('contract.allpage.get', ['id'=>$contract1->metadata->contract_id])}}"
            pdfPages.fetch({reset: true});
            this.currentPdfPage1 = new PdfCurrentPage({
                collection: pdfPages
            });
            //pdf view module
            var pdfView = new PdfView({
                el: "pdfcanvas1",
                collection: pdfPages,
                currentPage: this.currentPdfPage1
            });
            pdfPages.on('reset', function() {
                pdfView.render();
            }, this);
            new PdfViewerPagination({
                el: '#pagination-pdf1',
                collection: pdfPages,
                currentPage: this.currentPdfPage1
            });
        },
        initPdf2View: function() {
            var pdfPages = new PdfPagesCollection();
            pdfPages.url = "{{route('contract.allpage.get', ['id'=>$contract2->metadata->contract_id])}}"
            pdfPages.fetch({reset: true});
            this.currentPdfPage2 = new PdfCurrentPage({
                collection: pdfPages
            });
            //pdf view module
            var pdfView = new PdfView({
                el: "pdfcanvas2",
                collection: pdfPages,
                currentPage: this.currentPdfPage2
            });
            pdfPages.on('reset', function() {
                pdfView.render();
            }, this);
            new PdfViewerPagination({
                el: '#pagination-pdf2',
                collection: pdfPages,
                currentPage: this.currentPdfPage2
            });            
        },
        initAnnotations1View: function() {
            var categories = {!! json_encode(trans("codelist/annotation.categories")) !!}
            var annotationCategories = new AnnotationCategories();
            _.each(categories, function(category) {
                annotationCategories.add({name: category});
            });
            var annotationCollection = new AnnotationCollection();
            annotationCollection.url = "{{route('contract.page.annotations.search', ['id'=>$contract1->metadata->contract_id])}}";
            annotationCollection.fetch({reset: true});

            var annotationsTitleView = new AnnotationsTitleView({
                collection: annotationCollection,
                annotationCategories: annotationCategories
            });
            var annotationsListView = new AnnotationsListView({
                el: "#annotations1-list-view",
                collection: annotationCollection,
                annotationCategories: annotationCategories,
                eventsPipe: rcEvents1,
                annotationsTitleView: annotationsTitleView.render()
            }).render();
        },
        initAnnotations2View: function() {
            var categories = {!! json_encode(trans("codelist/annotation.categories")) !!}
            var annotationCategories = new AnnotationCategories();
            _.each(categories, function(category) {
                annotationCategories.add({name: category});
            });
            var annotationCollection = new AnnotationCollection();
            annotationCollection.url = "{{route('contract.page.annotations.search', ['id'=>$contract2->metadata->contract_id])}}";
            annotationCollection.fetch({reset: true});

            var annotationsTitleView = new AnnotationsTitleView({
                collection: annotationCollection,
                annotationCategories: annotationCategories
            });
            var annotationsListView = new AnnotationsListView({
                el: "#annotations2-list-view",
                collection: annotationCollection,
                annotationCategories: annotationCategories,
                eventsPipe: rcEvents1,
                annotationsTitleView: annotationsTitleView.render()
            }).render();
        },        
        initSearch: function() {
            var searchResultCollection = new SearchResultCollection({
                eventsPipe: rcEvents
            }); 
            this.listenTo(searchResultCollection, 'dataCollected', this.searchView);
            this.bind('dataCollected', this.searchView, this);                               
            var searchFormView = new SearchFormView({
                el: '#search-form',
                collection: searchResultCollection,
                url: "{{route('contract.page.search', ['id'=>$contract1->metadata->contract_id])}}",
                eventsPipe: rcEvents
            }).render();
            new SearchResultListView({
                el: '#search-results-list',
                collection: searchResultCollection,
                // searchOverlayLayer: '#pdfcanvas',
                eventsPipe: rcEvents
            });
        }
    });
    var tabs = new Tabs();
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
    <script>
    //metadata view module
    var contract1Metadata = {!!json_encode($contract1->metadata)!!};
    var metadataView1 = new MetadataView({
        el: "#metadata1",
        metadata: contract1Metadata
    }).render();
    var metadataButtonView = new MetadataButtonView({
        el: '#btn-metadata1',
        metadataView: metadataView1,
        eventsPipe: rcEvents1
    });  
    var contract2Metadata = {!!json_encode($contract2->metadata)!!};
    var metadataView2 = new MetadataView({
        el: "#metadata2",
        metadata: contract2Metadata
    }).render();
    var metadataButtonView = new MetadataButtonView({
        el: '#btn-metadata2',
        metadataView: metadataView2,
        eventsPipe: rcEvents1
    });  

    </script>
    <script type="text/template" id="pin-list-template">
    <div id="pinList" class="pin-list">
        <div class="pull-right pin-buttons">
            <button class="exportPins btn-primary">export</button>
            <button class="removeAllPins btn-danger">clear all</button></div>
            <div id="no-pin-message"></div>
        </div>
    </div>
    </script>
    <script type="text/template" id="pin-template">
        <%= pintext %><button class='removePin btn-danger'>x</button>
    </script>
    <script type="text/javascript">
    //pinning module
    var pinCollection = new PinCollection();
    pinCollection.fetch({reset: true});
    var pinningEditorViewLeft = new PinningEditorView({
        el: '#text1-viewer-wrapper-overflow-scroll',
        contract_title: '{{$contract1->metadata->contract_name}}',
        contract_id: '{{$contract1->metadata->contract_id}}',
        page_url: '{{\Illuminate\Support\Facades\Request::url()}}',
        collection: pinCollection,
    });
    var pinningEditorViewRight = new PinningEditorView({
        el: '#text2-viewer-wrapper-overflow-scroll',
        contract_title: '{{$contract2->metadata->contract_name}}',
        contract_id: '{{$contract2->metadata->contract_id}}',
        page_url: '{{\Illuminate\Support\Facades\Request::url()}}',
        collection: pinCollection,
    });    
    var pinListView = new PinListView({
        el: '#pinLists',
        collection: pinCollection,
        eventsPipe: rcEvents1
    }).render();
    var pinButtonView = new PinButtonView({
        el: '.btn-pins',
        collection: pinCollection,
        pinListView: pinListView,
        eventsPipe: rcEvents1
    }).render();

    </script>       
@stop
