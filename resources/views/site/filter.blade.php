@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">Home</a></li>
                            <li>Search</li>
                        </ul>
                    </div>
                    <div class="panel-title">
                        Search
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 country-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
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
                                    $arr = array_filter([$contract->country, $contract->signature_year]);
                                    ?>
                                    - {{ join(', ', $arr)}}
                                    <span class="label label-default">{{strtoupper($contract->language)}}</span>
                                </td>
                                <td align="right">{{getFileSize($contract->file_size)}}</td>
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
    </div>
@stop
