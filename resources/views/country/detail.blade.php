@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">

            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">Home</a></li>
                            <li><a href="{{route('countries')}}">Countries</a></li>
                            <li>{{@trans('country')[strtoupper($country)]}}</li>
                        </ul>
                    </div>
                    <div class="panel-title">
                        <img src="{{getFlagUrl($country)}}" />
                        {{@trans('country')[strtoupper($country)]}}
                    </div>
                </div>
            </div>

            <div class="filter-wrapper">
                <div class="col-lg-12">
                    <div class="filter-country-wrap">
                        <form action="{{url('search')}}" method="GET" class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" name="q" class="form-control pull-left" placeholder="Find a contract in {{@trans('country')[strtoupper($country)]}}...">
                                <input type="hidden" name="country" value="{{$country}}" />
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
                    <div class="panel-heading">Contracts in {{@trans('country')[strtoupper($country)]}}</div>
                    <div class="panel-body">
                        <table class="table table-responsive table-contract">

                                <tbody>
                                @forelse($contracts as $contract)
                                    <tr>
                                        <td width="70%">
                                            <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                                                {{ $contract->contract_name or ''}}
                                            </a>
                                            <span class="label label-default">{{strtoupper($contract->language)}}</span>
                                            <p class="country_name">- {{trans('country.'.strtoupper($contract->country_code))}}</p>
                                        </td>
                                        <td align="right"> {{$contract->signature_year}} </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="2">{{'Contract result not found.'}}</td>
                                    </tr>
                                @endforelse

                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="panel panel-default panel-wrap country-resource-wrap">
                    <div class="panel-heading">Resources in  {{@trans('country')[strtoupper($country)]}}
                    </div>
                    <div class="panel-body">
                        <ul>
                            <?php $i=0; ?>
                            @foreach($resources as $resource)
                                <li  @if($i<3) class="highest-count" @endif>
                                    <span>{{ucfirst($resource->resource)}}</span>
                                    <span class="count pull-right">{{$resource->contract}}</span>
                                </li>
                               <?php $i++; ?>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

@stop
