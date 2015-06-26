@extends("layout.app")

@section('content')
@include('layout.partials.search')

    <div class="panel panel-default">
        <div class="panel-heading">All Contracts</div>
        <div class="panel-body">
            <table class="table table-responsive table-contract">

        		@foreach($contracts as $data)
                   <tr>
			            <td width="70%"><a href="{{route('contract.detail',['id'=>isset($data['contract_id']) ? $data['contract_id'] : 'null'])}}">{{$data['metadata']['contract_name']}}</a><span class="label label-default">EN</span></td>
                        <td align="right">{{getFileSize($data['metadata']['file_size'])}}</td>
                        <td align="right">{{isset($data['metadata']['signature_date'])?$data['metadata']['signature_date']:''}}</td>
			        </tr>
				@endforeach
            </table>
        </div>
    </div>
@endsection