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
<script src="{{ url('js/pdfjs/pdf.js') }}"></script>
<script src="{{ url('js/pdfjs/pdf.worker.js') }}"></script>
<script>
  var debug = function() {
        var DEBUG = false;
        if(DEBUG) {
          console.log("-----");
          for (var i=0; i < arguments.length; i++) {
            console.log(arguments[i]);
          }
        }
      };
  var lang = <?php echo json_encode(trans('annotation'));?>;
  var email = '<?php echo env('CONTACT_MAIL'); ?>';
  var back_url = '{!!$back!!}';
  var app_url = '{{url()}}';
  var category = '{{env('CATEGORY')=='rc' ? 'Resource' : 'Openland' }}';
  var pdf_download_url = '{{route('contract.download.pdf',['id'=> $contract->metadata->open_contracting_id])}}';
  var contract = {!!json_encode($contract)!!};
  var contractTitle = contract.metadata.name;
  var esapi = '{{rtrim(env("ELASTIC_SEARCH_HOST"),'/')}}/';
</script>
<script src="{{ url('js/contract-view.min.js') }}"></script>
@stop