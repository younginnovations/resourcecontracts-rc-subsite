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
      .loading {margin-top:250px; text-align: center}
  </style>
@stop

@section('content')
    <div id="content"> <div class="loading"><img src="{{url('images/loading.gif')}}"/> Loading ... </div></div>
@endsection
@section('js')
    <script src="{{ url('js/contract-component.min.js') }}"></script>
    <script src="{{ url('scripts/lib/pdfjs/pdf.js') }}"></script>
    <script src="{{ url('scripts/lib/pdfjs/pdf.worker.js') }}"></script>
    <script src="{{ url('scripts/lib/react/react-with-addons.js') }}"></script>
    <script src="{{ url('js/contract-view.min.js') }}"></script>
    <script>
      var lang = <?php echo json_encode(trans('annotation'));?>;
      var email = '<?php echo env('CONTACT_MAIL'); ?>';

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
      var category = '{{env('CATEGORY')=='rc' ? 'Resource' : 'Openland' }}';
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
    </script>
    <script src="{{ url('js/contract-main.min.js') }}"></script>
@stop


