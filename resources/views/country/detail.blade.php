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
                            <li><a href="{{route('countries')}}">@lang('global.countries')</a></li>
                            <li>{{@trans('country')[strtoupper($country)]}}</li>
                        </ul>
                    </div>
                    <div class="panel-title">
                        <img src="{{getFlagUrl($country)}}" />
                        {{@trans('country')[strtoupper($country)]}}
                        @if(env("CATEGORY")=="rc")
                            @if(!empty(@trans('amla')[strtoupper($country)]))<a href="{{@trans('amla')[strtoupper($country)]}}" class="country-amla-link">AMLA</a>@endif
                        @endif
                    </div>
                </div>
            </div>

            <div class="filter-wrapper">
                <div class="col-lg-12">
                    <div class="filter-country-wrap">
                        <form action="{{url('search')}}" method="GET" class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" name="q" class="form-control pull-left" placeholder="@lang('countriespage.find_contract') {{@trans('country')[strtoupper($country)]}}...">

                                <input type="hidden" name="country" value="{{$country}}" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="contract-number-wrap">
                <span>{{$contracts->total}}</span> {{ Lang::choice('global.contracts', $contracts->total) }}
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 country-detail-wrapper">
            <div class="col-md-8 col-lg-8">
                <div class="panel panel-default panel-wrap country-contract-wrap">
                        <?php
                            $params = Request::all();
                            $params['country']=$country;
                            $params['resource']='';
                            $params['download']=true;
                        ?>
                        <div class="download-csv">
                            <a href="{{route('contract.metadata.download',$params)}}">@lang('global.download_as_csv')</a>
                        </div>

                    <div class="panel-heading">@lang('countriespage.contracts_in') {{@trans('country')[strtoupper($country)]}}</div>
                    <div class="panel-body">
                        @include('contract.partials.rccontractlist')
                        @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-lg-4">
                <div class="panel panel-default panel-wrap country-resource-wrap">
                    <div class="panel-heading">@lang('countriespage.resources_in')  {{@trans('country')[strtoupper($country)]}}
                    </div>
                    <div class="panel-body">
                        <ul>
                            @foreach($resources as $resource)
                                <li>
                                    <span><a href="{{route("search")}}?q=&country%5B%5D={{$country}}&resource%5B%5D={{urlencode($resource->resource)}}">{{ucfirst($resource->resource)}}</a></span>
                                    <span class="count pull-right">{{$resource->contract}}</span>
                                </li>
                            @endforeach
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>

@stop
