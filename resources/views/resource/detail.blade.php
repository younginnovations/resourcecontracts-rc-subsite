@extends('layout.app-full')

@section('content')

   
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="breadcrumb-wrapper">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Countries</a></li>
                    <li>Guinea</li>
                </ul>
            </div>
            <div class="panel-title">
                {{ucfirst($resource)}}
            </div>
            <div class="filter-wrapper">
                <div class="col-lg-12">
                    <div class="filter-country-wrap">
                        <form action="" method="post" class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" class="form-control pull-left" placeholder="Find a contract {{$resource}}...">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="contract-number-wrap">
                <span>{{count($contracts)}}</span>contracts
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 country-detail-wrapper">
            <div class="col-lg-8">
                <div class="panel panel-default panel-wrap country-contract-wrap">
                    <div class="panel-heading">Contracts of {{ucfirst($resource)}}</div>
                    <div class="panel-body">
                        <table class="table table-responsive table-contract">
                            <tbody>

                            @forelse($contracts as $contract)
                                <tr>
                                    <td width="70%">
                                        <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                                            {{ $contract->contract_name or ''}}
                                        </a>

                                        <?php
                                        $arr = array_filter([trans('country.'.strtoupper($contract->country_code)), $contract->signature_year]);
                                        ?>
                                        - {{ join(', ', $arr)}}
                                        <span class="label label-default">{{strtoupper($contract->language)}}</span>
                                    </td>
                                    <td align="right">{{getFileSize($contract->file_size)}}</td>
                                    <td align="right">June 30, 2015</td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="2">{{'Search result not found.'}}</td>
                                </tr>
                            @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="panel panel-default panel-wrap country-resource-wrap">
                    <div class="panel-heading">Resources in Guinea</div>
                    <div class="panel-body">
                        <ul>
                        <?php $i=0; ?>
                        @foreach($countries as $country)
                            <li  @if($i<3) class="highest-count" @endif>
                                <span>{{trans('country')[strtoupper(ucfirst($country->code))]}}</span>
                                <span class="count pull-right">{{$country->contract}}</span>
                            </li>
                            <?php $i++; ?>
                        @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 contract-year-list">
            <div class="panel panel-default panel-wrap contract-year-wrap">
                <div class="panel-heading">Contracts by year in Guinea</div>
                <div class="panel-body">
                    <img src="../images/ic-graph.png" alt="">
                </div>
            </div>
        </div>
    </div>

@stop
