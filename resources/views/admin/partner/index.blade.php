@extends('layout.admin')

@section('content')
	<div class="panel panel-default">
		<div class="panel-heading clearfix">
			<h3 class="panel-title pull-left">@lang('admin.manage_partners')</h3>
			<div class="pull-right">
				<a class="btn btn-default" href="{{ route('admin.partner.create') }}">
					@lang('admin.partner.create')
				</a>
			</div>
		</div>
		<div class="panel-body">
			<table class="table">
				<thead>
				<tr>
					<th></th>
					<th>@lang('admin.partner.link')</th>
					<th>@lang('admin.partner.image')</th>
					<th>@lang('admin.action')</th>
				</tr>
				</thead>
				<tbody>
				@if(!empty($partners))
					@foreach($partners as $partner)
						<tr>
							<td></td>
							<td><a target="_blank" href="{{$partner->link}}">{{$partner->link}}</a></td>
							<td><img width="100" src="{{$partner->image}}"/></td>
							<td>
								<form method="POST"
									  action="{{ route('admin.partner.delete') }}"
									  accept-charset="UTF-8" style="display:inline">
									<input name="_method" type="hidden" value="DELETE">
									<input name="_token" type="hidden" value="{{ csrf_token()}}">
									<input name="id" type="hidden" value="{{ $partner->id}}">

									<button type="submit" class="btn btn-danger confirm"
											data-confirm="Are you sure you want to delete this partner?">
										<i class="fa fa-trash"> </i>
									</button>
								</form>
							</td>
						</tr>
					@endforeach
				@else
					<tr>
						<td colspan="4" style="text-align: center">
							<p>@lang('admin.partner.partner_not_found')</p>
						</td>
					</tr>
				@endif

				</tbody>
			</table>
		</div>
	</div>
@stop
