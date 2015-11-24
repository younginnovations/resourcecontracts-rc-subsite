@extends('layout.app-blank')
@section('css')
    <link rel="stylesheet" href="{{ url('css/annotation/annotator.css') }}">
       @if(env("CATEGORY")=="rc")
        <link href="{{url('css/rc-contract-view.css')}}" rel="stylesheet">
       @endif
      @if(env("CATEGORY")=="olc")
          <link href="{{url('css/olc-contract-view.css')}}" rel="stylesheet">
      @endif
  <style>
    .metadata-ocid a span {
      display: inline !important;
    }
    .metadata-info span {color:rgba(64, 64, 64, 0.7)}
  </style>
@stop
@section('content')
    <div id="content"></div>
@endsection
@section('js')
    <script src="{{ url('js/contract-view.min.js') }}"></script>
    <script src="{{ url('scripts/lib/pdfjs/pdf.js') }}"></script>
    <script src="{{ url('scripts/lib/pdfjs/pdf.worker.js') }}"></script>
    <script src="{{ url('scripts/lib/react/react-with-addons.js') }}"></script>
    <script src="{{ url('scripts/lib/react/JSXTransformer.js') }}"></script>
    <script type="text/jsx" src="{{ url('scripts/contract.view.custom/views/react.waypoint.js') }}"></script>
    <script type="text/jsx" src="{{ url('scripts/contract.view.custom/views/react.pdf.js') }}"></script>
    <script type="text/jsx" src="{{ url('scripts/contract.view.custom/views/pdf.view.js') }}"></script>
    <script type="text/jsx" src="{{ url('scripts/contract.view.custom/views/metadata.view.js') }}"></script>
    <script type="text/jsx" src="{{ url('scripts/contract.view.custom/views/text.view.js') }}"></script>
    <script type="text/jsx" src="{{ url('scripts/contract.view.custom/views/text.search.js') }}"></script>
    <script type="text/jsx" src="{{ url('scripts/contract.view.custom/views/annotations.view.js') }}"></script>

    <script type="text/jsx">
      var lang = <?php echo json_encode(trans('annotation'));?>;

      var debug = function() {
        var DEBUG = false;
        if(DEBUG) {
          console.log("-----");
          for (var i=0; i < arguments.length; i++) {
            console.log(arguments[i]);
          }
        }
      };
      var back_url = '{!!$back!!}';
      var app_url = '{{url()}}';
      var contractTitle = "{{$contract->metadata->contract_name}}";
      var contractApp = new ContractApp({
        contract_id: '{{$contract->metadata->contract_id}}',
        guid: '{{$contract->metadata->open_contracting_id}}',
        total_pages: '{{$contract->metadata->total_pages}}',
        esapi: '{{env("ELASTIC_SEARCH_HOST")}}'
      });
      debug("initializing contract ", contractTitle, contractApp.get("contract_id"));

      var pagesCollection = new ViewerPageCollection();
      pagesCollection.url = contractApp.getAllPageUrl();
      pagesCollection.fetch({reset: true});
      pagesCollection.on("reset", function() {
        debug("view.blade pageCollection reset, trigger change:page_no")
        contractApp.trigger("change:page_no");
      });

      var annotationsCollection = new AnnotationsCollection();
      annotationsCollection.url = contractApp.getAllAnnotationsUrl();
      annotationsCollection.fetch({reset: true});


      var searchResultsCollection = new SearchResultsCollection();
      searchResultsCollection.url = contractApp.getSearchUrl();

      var pdfPage = new PdfPage({
        contractApp: contractApp
      });

      
      /**
      * @jsx React.DOM
      */
      var MainApp = React.createClass({
        getInitialState: function() {
          return {
            currentView: 'pdf'
          }
        },
        text: function(page_no, annotation_id) {
          debug("view.blade.php: setting text view");
          contractApp.setView("text");
          contractApp.resetSelectedAnnotation();
          if(page_no) {
            contractApp.setCurrentPage(page_no);
          }
          if(annotation_id) {
            contractApp.setSelectedAnnotation(annotation_id);
          }
          this.forceUpdate();
        },
        pdf: function(page_no, annotation_id) {
          debug("view.blade.php: setting pdf view");
          if(page_no) {
            contractApp.setCurrentPage(page_no);
            debug("view.blade.php: setting current page to", page_no);
          } else {
            // contractApp.trigger("change:page_no");
            // this.forceUpdate();
          }
          if(annotation_id) {
            contractApp.setSelectedAnnotation(annotation_id);
            debug("view.blade.php: setting annotation to", annotation_id);
          } else {
            contractApp.resetSelectedAnnotation();
          }
          if(!pdfPage.init && contractApp.getView() != "pdf") {
            debug("view.blade pdfPage init-none, trigger change:page_no")
            contractApp.setView("pdf");
          } 
          contractApp.setView("pdf");
          this.forceUpdate();
        },
        search: function(query) {
          contractApp.setView("search");
          var show_pdf_text = contractApp.metadata.get('show_pdf_text');
          if(show_pdf_text ==1)
          {
            contractApp.setSearchQuery(query);
            searchResultsCollection.fetch({
              searchTerm: query,
              reset: true
            });
          }
          else
          {
            searchResultsCollection.reset();
          }

          this.forceUpdate();
        },
        meta: function(action) {
          // this.forceUpdate();
        },
        componentDidUpdate: function() {
        },
        componentDidMount: function() {
          var router = Router({
            '/text': this.text,
            '/text/page/:page_no': this.text,
            '/text/page/:page_no/annotation/:annotation_id': this.text,
            '/pdf': this.pdf,
            '/pdf/page/:page_no': this.pdf,
            '/pdf/page/:page_no/annotation/:annotation_id': this.pdf,
            '/search/:query': this.search,
            '/meta/:action': this.meta
          });
          router.init();
        },    
        getStyle: function(showFlag) {
          var style = { display: "none" };
          if(showFlag) style.display = "block";
          return style;
        },
        render: function() {
          return (
            <div className="main-app">
              <div className="title-wrap">
                <div className="navbar-header">
                    @if(env("CATEGORY")=="rc")
                      <a className="navbar-brand" href="{{url()}}" >Resource <span className="beta">Beta</span><span>Contracts</span></a>
                    @else                        
                        <a className="navbar-brand" href="{{url()}}" >OPENLAND <span className="beta">Beta</span><span>Contracts</span></a>
                    @endif
                </div>              
                <span>{htmlDecode(contractTitle)}</span>
              </div>
              <div className="head-wrap">
                <TextSearchForm
                  style={this.getStyle(contractApp.isViewVisible("TextSearchForm"))} />
                <NavigationView 
                  contractApp={contractApp} />
                <TextPaginationView 
                  style={this.getStyle(contractApp.isViewVisible("TextPaginationView"))} 
                  contractApp={contractApp}
                  pagesCollection={pagesCollection} />
                <PdfPaginationView 
                  style={this.getStyle(contractApp.isViewVisible("PdfPaginationView"))}
                  contractApp={contractApp} />
                <PdfZoom 
                  style={this.getStyle(contractApp.isViewVisible("PdfZoom"))}
                  contractApp={contractApp} />

                  <div className="tools">
                      <a  className="pdf-download-link" href="{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}" >pdf download</a>
                  </div>
                <MetadataToggleButton
                  style={this.getStyle(contractApp.getShowMeta())}                  
                  contractApp={contractApp} />
              </div>
              <div className="document-wrap">
                <AnnotationsViewer
                  style={this.getStyle(contractApp.isViewVisible("AnnotationsViewer"))}
                  contractApp={contractApp}
                  annotationsCollection={annotationsCollection} />
                <TextSearchResultsList
                  style={this.getStyle(contractApp.isViewVisible("TextSearchResultsList"))}
                  contractApp={contractApp}
                  searchResultsCollection={searchResultsCollection} />
                <TextViewer 
                  style={this.getStyle(contractApp.isViewVisible("TextViewer"))}
                  contractApp={contractApp}
                  pagesCollection={pagesCollection}
                  metadata={contractApp.metadata}
                />
                <PdfViewer 
                  pdfPage={pdfPage}
                  style={this.getStyle(contractApp.isViewVisible("PdfViewer"))}                  
                  contractApp={contractApp}
                  pagesCollection={pagesCollection} />
                <RightColumnView 
                  metadata={contractApp.metadata}
                  contractApp={contractApp} />
              </div>
            </div>
          );
        }
      });
      
      React.render(
        <MainApp />,
        document.getElementById('content')
      );        
    </script>
@stop


