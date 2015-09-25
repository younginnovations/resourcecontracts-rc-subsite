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
                                <input type="text" name="q" class="form-control pull-left" placeholder="Find a contract in {{@trans('country')[strtoupper($country)]}}...">
                                <input type="hidden" name="country" value="{{$country}}" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="contract-number-wrap">
                <span>{{$contracts->total}}</span> @if($contracts->total > 1)contracts @else Contract @endif
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 country-detail-wrapper">
            <div class="col-md-8 col-lg-8">
                <div class="panel panel-default panel-wrap country-contract-wrap">
                    <div class="panel-heading">Contracts in {{@trans('country')[strtoupper($country)]}}</div>
                    <div class="panel-body">
                        <table class="table table-responsive table-contract">
                                <tbody>
                                @forelse($contracts->results as $contract)

                                    <?php
                                    $api     = app('App\Http\Services\APIService');
                                    $annotations = $api->getAnnotations($contract->contract_id);

                                    ?>
                                    <tr>
                                        <td>
                                            <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                                                {{ $contract->contract_name or ''}}
                                            </a>
                                            @if($annotations->total>0)
                                            <div class="annotate-text"> Annotated </div>
                                            @endif
                                            <p class="country_name">- {{trans('country.'.strtoupper($contract->country_code))}}</p>
                                            <div class="resource-contract-list">
                                                <div class="resource-type">
                                                    <label for="">Resource: </label>
                                                 @foreach($contract->resource as $resource)
                                                    {{$resource}}
                                                @endforeach
                                                </div>
                                                <div class="contract-type">
                                                    <label for="">Contract Type</label>
                                                    {{$contract->contract_type}}
                                                </div>
                                            </div>
                                        </td>

                                        <td class="contract-date">{{$contract->signature_date}}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="2">{{'Contract result not found.'}}</td>
                                    </tr>
                                @endforelse

                                </tbody>
                        </table>
                        @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])

                    </div>
                </div>
            </div>
            <div class="col-md-4 col-lg-4">
                <div class="panel panel-default panel-wrap country-resource-wrap">
                    <div class="panel-heading">Resources in  {{@trans('country')[strtoupper($country)]}}
                    </div>
                    <div class="panel-body">
                        <ul>
                            @foreach($resources as $resource)
                                <li>
                                    <span><a href="{{route("resource.detail",["key"=>$resource->resource])}}">{{ucfirst($resource->resource)}}</a></span>
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
