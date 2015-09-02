@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">

            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">Home</a></li>
                            @if(\Illuminate\Support\Facades\Input::get('year') =='')
                                <li>All Contracts</li>
                            @else
                                <li><a href="{{url('contracts')}}">All Contracts</a></li>
                                <li>{{\Illuminate\Support\Facades\Input::get('year')}}</li>
                            @endif
                        </ul>
                    </div>
                    <div class="panel-title">
                        @if(\Illuminate\Support\Facades\Input::get('year') !='')
                            Contracts in {{\Illuminate\Support\Facades\Input::get('year')}}
                          @else
                            All Contracts
                        @endif
                    </div>
                </div>
            </div>
            <div class="contract-number-wrap" style="margin-top: -40px;">
                <span>{{$contracts->total}}</span>contracts
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 country-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-body">
                    <table class="table table-responsive table-contract">
                        <tbody>
                        @if($contracts->results)
                            @foreach($contracts->results as $contract)
                                <tr>
                                    <td width="70%">
                                        <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                                            {{ $contract->contract_name or ''}}
                                        </a>

                                        <?php
                                            $country_code ='';
                                            if($contract->country_code !='')
                                                {
                                                    $country_code = trans('country.' . strtoupper($contract->country_code));
                                                }

                                        $arr = array_filter(
                                                [
                                                        $country_code,
                                                        $contract->signature_year
                                                ]
                                        );
                                        $subText = join(', ', $arr);
                                        ?>
                                        @if($subText)
                                        - {{$subText}}
                                        @endif
                                        <span class="label label-default">{{strtoupper($contract->language)}}</span>
                                    </td>
                                    <td align="right">{{getFileSize($contract->file_size)}}</td>
                                </tr>
                            @endforeach
                        @else
                            <tr>
                                <td colspan="2">{{'Contract not found.'}}</td>
                            </tr>
                        @endif
                        </tbody>
                    </table>
                    @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
                </div>
            </div>
        </div>
    </div>





@stop
