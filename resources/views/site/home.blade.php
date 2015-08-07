@extends("layout.app")

@section('content')

    @include('layout.partials.search')

    <div class="panel panel-default">
        <div class="panel-heading">All Contracts</div>
        <div class="panel-body">
            <table class="table table-responsive table-contract">
                @foreach($contracts as $contract)
                    <tr>
                        <td width="70%">
                            <a href="{{route('contract.detail',['id'=>$contract->contract_id])}}">
                                {{ $contract->contract_name or ''}}
                            </a>
                            <span class="label label-default">
                             {{ strtoupper($contract->language)}}
                            </span>
                        </td>
                        <td align="right">{{getFileSize($contract->file_size)}}</td>
                        <td align="right">{{ $contract->signature_date or ''}}</td>
                    </tr>
                @endforeach
            </table>
        </div>
    </div>
@endsection