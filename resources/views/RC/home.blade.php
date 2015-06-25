@extends("layout.app")

@section('content')
@include('layout.partials.search') 

    <div class="panel panel-default">
        <div class="panel-heading">All Contracts</div>
        <div class="panel-body">
            <table class="table table-responsive table-contract">
        		@foreach($result as $data)
			        <tr>
			            <td width="70%"><a href="">{{$data['name']}}</a><span class="label label-default">EN</span></td>
			            <td align="right">711kb</td>
			            <td align="right">June 25, 2015</td>
			        </tr>
				@endforeach
            </table>
        </div>
    </div>
@endsection