@extends('layout.app-full')

@section('content')

    <div class="row">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">Resource <span>Contracts</span></a>
            </div>
            <div class="navbar-right">
                <form action="" method="post" class="search-form">
                    <div class="form-group">
                        <button type="submit" class="btn btn-navbar-search pull-left"></button>
                        <input type="text" class="form-control pull-left" placeholder="Search for contracts...">
                    </div>
                </form>
            </div>
            <!-- /.navbar-header -->
        </nav>
    </div>
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="breadcrumb-wrapper">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li>All Contracts</li>
                </ul>
            </div>
            <div class="panel-title">
                All Contracts
            </div>

        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 country-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-heading">Contracts in Guinea</div>
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
