@extends('layout.admin')

@section('content')

	<div class="panel panel-default">
		<div class="panel-heading clearfix">
			<h3 class="panel-title pull-left">@lang('admin.manage_pages')</h3>
			@if(auth()->user()->is_admin)
				<div class="pull-right">
					<a class="btn btn-default" href="{{ route('admin.page.create') }}">
						Add New page</a>
				</div>
			@endif
			<div class="panel-body">

				<table class="table">
					<thead>
					<tr>
						<th></th>
						<th>@lang('admin.id')</th>
						<th>@lang('admin.page_title')</th>
						<th>@lang('admin.slug')</th>
						<th>@lang('admin.action')</th>
					</tr>
					</thead>
					<tbody>
					@foreach($pages as   $page)
						<tr>
							<td></td>
							<td>{{$page->id}}</td>
							<td>{{$page->title->en}}</td>
							<td>{{$page->slug}}</td>
							<td>
								<a target="_blank" class="btn btn-success" href="{{url($page->slug)}}">
									<i class="fa fa-eye"></i>
								</a>
								<a class="btn btn-primary" href="{{route('admin.page.update', ['id'=>$page->id])}}">
									<i class="fa fa-pencil-square-o"></i>
								</a>
								@if(auth()->user()->id ==1)
									<form method="POST" action="{{ route('admin.page.delete' , ['id' => $page->id]) }}"
										  accept-charset="UTF-8" style="display:inline">
										<input name="_method" type="hidden" value="DELETE">
										<input name="_token" type="hidden" value="{{ csrf_token()}}">
										<button type="submit" class="btn btn-danger confirm"
												data-confirm="Are you sure you want to delete this page?"><i
													class="fa fa-trash"> </i></button>
									</form>
								@endif
							</td>
						</tr>
					@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
@stop
