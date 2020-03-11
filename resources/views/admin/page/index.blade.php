@extends('layout.admin')

@section('content')
<div class="panel panel-default">
	<div class="panel-heading clearfix">
		<h3 class="panel-title pull-left">@lang('admin.manage_pages')</h3>
		@if(auth()->user()->id ==1)
		<div class="pull-right">
			<a class="btn btn-default" href="{{ route('admin.page.create') }}">
				Add New page</a>
		</div>
		@endif
	</div>
	<div class="panel-body">
		<table class="table">
			<thead>
				<tr>
					<th></th>
					<th>@lang('admin.id')</th>
					<th>@lang('admin.page_title')</th>
					<th>@lang('admin.slug')</th>
					<th>@lang('admin.select_version')</th>
					<th>@lang('admin.action')</th>
				</tr>
			</thead>
			<tbody>
				@foreach($pages as $page)
				<?php
				$versions = (array) $page->version;
				?>
				<tr>
					<td></td>
					<td>{{$page->id}}</td>
					<td>{{$page->title->en}}</td>
					<td>{{$page->slug}}</td>
					<td>
						@if($versions)
						<form method="POST" action="{{ route('admin.version.edit', ['id'=>$page->id]) }}">
							<input name="_token" type="hidden" value="{{ csrf_token()}}">
							<input name="selected" class="selected" type="hidden" value="{{ $page->selected }}">
							<div class="form-group">
								<select class="form-control select-version" name="new-selected">
									@foreach($versions as $key => $value)
									<option value="{{$key}}" @if($key==$page->selected) selected @endif>v{{$key}}</option>
									@endforeach
								</select>
							</div>
							<button class="btn btn-xs btn-info hide change-version" type="submit"><i class="fa fa-check"></i> @lang('admin.change_version')</button>
						</form>
						@else
						No versions available
						@endif
					</td>
					<td>
						<a target="_blank" class="btn btn-success" href="{{url($page->slug)}}">
							<i class="fa fa-eye"></i>
						</a>
						<a class="btn btn-primary" href="{{route('admin.page.update', ['id'=>$page->id])}}">
							<i class="fa fa-pencil-square-o"></i>
						</a>
						@if(auth()->user()->id ==1)
						<form method="POST" action="{{ route('admin.page.delete' , ['id' => $page->id]) }}" accept-charset="UTF-8" style="display:inline" onsubmit="return confirm('Are you sure you want to delete this page?');">
							<input name="_method" type="hidden" value="DELETE">
							<input name="_token" type="hidden" value="{{ csrf_token()}}">
							<button type="submit" class="btn btn-danger confirm" data-confirm="Are you sure you want to delete this page?"><i class="fa fa-trash"> </i></button>
						</form>
						@endif
					</td>
				</tr>
				@endforeach
			</tbody>
		</table>
	</div>
</div>
@stop
@section('js')
<script type="text/javascript">
	$('document').ready(function() {
		$('.select-version').on('change', function() {
			var value = $(this).val();
			var parent = $(this).parent().parent('form');
			var selected_val = parent.find('.selected').val();
			var button = parent.find('.change-version');

			if (selected_val == value || value == null) {
				if (!button.hasClass('hide')) {
					button.addClass('hide');
				}
			} else {
				if (button.hasClass('hide')) {
					button.removeClass('hide');
				}
			}
		});
	});
</script>
@endsection