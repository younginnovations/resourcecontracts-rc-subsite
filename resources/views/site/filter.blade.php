@extends("layout.app")

@section('content')
    @include('layout.partials.search')

    <div class="panel panel-default">
        <div class="panel-heading">Contracts</div>
        <div class="panel-body">
            <table class="table table-responsive table-contract">

                @if(!empty($contract) AND $contract->total>0)

                    @forelse($contract->result as $data)

                        <tr>
                            <td width="70%">
                                <a href="{{route('contract.detail',['id'=>$data->contract_id ])}}">
                                    {{ $data->contract_name or ''}}
                                </a>
                                <?php $arr = array_filter([trans('country.'.strtoupper($data->country)), $data->signature_year]);?>
                                - {{ join(', ', $arr)}}
                                <div style="margin-top: 10px;">
                                    @if($data->text !="")
                                        {!! $data->text or '' !!}
                                    @else
                                        {!! $data->annotations or '' !!}
                                    @endif

                                </div>
                            </td>
                            <td align="right">
                                @foreach($data->group as $type)
                                    <lable class="label label-success">{{ $type }}</lable>
                                @endforeach
                            </td>
                            <td align="right">{{getFileSize($data->file_size)}}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3">{{'Search result not found.'}}</td>
                        </tr>
                    @endforelse
                @else
                    <tr>
                        <td colspan="3">{{'Search result not found.'}}</td>
                    </tr>
                @endif
            </table>


        </div>
    </div>
@stop