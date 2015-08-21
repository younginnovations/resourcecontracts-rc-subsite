@extends('layout.app')

@section('content')
    <div class="panel panel-default">
    <div class="panel-heading">{{$country}}</div>
    <div class="panel-body">
        <table class="table table-responsive table-contract">
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
                        </td>
                        <td align="right">{{getFileSize($contract->file_size)}}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="2">{{'Search result not found.'}}</td>
                    </tr>
                @endforelse
        </table>


    </div>
</div>
@stop
