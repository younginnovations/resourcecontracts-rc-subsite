<?php
 use \Illuminate\Support\Facades\Lang as Lang;
?>
@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper attached-top-wrapper">
            <div class="panel-top-content">
                <div class="clearfix">
                    <div class="back back-button">Back</div>
                    <div class="panel-title">
                        @if(\Illuminate\Support\Facades\Input::get('year') !='')
                            @lang('global.documents_of') {{\Illuminate\Support\Facades\Input::get('year')}}
                          @else
                            @lang('global.all_documents')
                        @endif
                    </div>
                </div>
            </div>
            <div class="contract-number-wrap">
                <span>{{$contracts->total}}</span> {{ Lang::choice('global.documents' , $contracts->total) }}
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 country-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-body">
                    @include('contract.partials.contractlist')
                    @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
                </div>
            </div>
        </div>
    </div>
    <script>
        var lang = <?php echo json_encode(trans('annotation'));?>;
    </script>

@stop
