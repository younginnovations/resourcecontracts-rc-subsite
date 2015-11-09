<?php

use Illuminate\Support\Facades\Lang;

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
                            <li><a href="{{route('resources')}}">@lang('global.resource')</a></li>
                            <li>{{ucfirst($resource)}}</li>
                        </ul>
                    </div>

                    <div class="panel-title">
                        {{ucfirst($resource)}}
                    </div>
                </div>
            </div>

            <div class="filter-wrapper">
                <div class="col-lg-12">
                    <div class="filter-country-wrap">
                        <form action="{{url('search')}}" method="get" class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" name="q" class="form-control pull-left" placeholder="@lang('global.find_contract') {{ucfirst($resource)}} ...">
                                <input type="hidden" name="resource" value="{{$resource}}" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="contract-number-wrap">

                <span>{{$contracts->total}}</span> {{ Lang::choice('global.contracts' , $contracts->total) }}
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 country-detail-wrapper">
            <div class="col-md-8 col-lg-8">
                <div class="panel panel-default panel-wrap country-contract-wrap">
                    <?php
                    $params = Request::all();
                    $params['country']='';
                    $params['resource']=$resource;
                    $params['download']=true;
                    ?>
                    <div class="download-csv">
                        <a href="{{route('contract.metadata.download',$params)}}">@lang('global.download_as_csv')</a>
                    </div>
                    <div class="panel-heading">@lang('global.contracts_for') {{ucfirst($resource)}}</div>
                    <div class="panel-body">
                        @include('contract.partials.rccontractlist')
                        @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])

                    </div>
                </div>
            </div>
            <div class="col-md-4 col-lg-4">
                <div class="panel panel-default panel-wrap country-resource-wrap">
                    <div class="panel-heading">@lang('global.countries')</div>
                    <div class="panel-body">
                        <ul>
                        @foreach($countries as $country)
                            <li>
                                <span><a href="{{route("search")}}?q=&resource%5B%5D={{urlencode($resource)}}&country%5B%5D={{urlencode($country->code)}}">{{trans('country')[strtoupper(ucfirst($country->code))]}}</a></span>
                                <span class="count pull-right">{{$country->contract}}</span>
                            </li>
                        @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
