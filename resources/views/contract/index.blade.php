<?php
 use \Illuminate\Support\Facades\Lang as Lang;
?>
@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">@lang('global.home')</a></li>
                            @if(\Illuminate\Support\Facades\Input::get('year') =='')
                                <li>@lang('global.all_contracts')</li>
                            @else
                                <li><a href="{{url('contracts')}}">@lang('global.all_contracts')</a></li>
                                <li>{{\Illuminate\Support\Facades\Input::get('year')}}</li>
                            @endif
                        </ul>
                    </div>
                    <div class="panel-title">
                        @if(\Illuminate\Support\Facades\Input::get('year') !='')
                            Contracts in {{\Illuminate\Support\Facades\Input::get('year')}}
                          @else
                            @lang('global.all_contracts')
                        @endif
                    </div>
                </div>
            </div>
            <div class="contract-number-wrap" style="margin-top: -40px;">
                <span>{{$contracts->total}}</span> {{ Lang::choice('global.contracts' , $contracts->total) }}
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
