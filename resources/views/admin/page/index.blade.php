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
				$versions = array_values((array) $page->version);
				?>
				<tr >
					<td></td>
					<td>{{$page->id}}</td>
					<td>{{$page->title->en}}</td>
					<td>{{$page->slug}}</td>
					<td>
						@if($versions)
							<span class="badge">v{{ $page->version_no }}</span>
						@if (count($versions) > 1)
								<a href="#" data-toggle="collapse" data-target=".page-version-collapsible-{{$page->id}}" class="see-versions" data-version-count="{{ count((array) $page->version) }}">See all({{ count((array) $page->version) }})</a>
							@endif
						@else
						No versions available
						@endif
					</td>
					<td>
						<a target="_blank" class="btn btn-success" href="{{url($page->slug)}}" data-toggle="tooltip" data-placement="top" title="View page">
							<i class="fa fa-eye"></i>
						</a>
						<a class="btn btn-primary" href="{{route('admin.page.update', ['id'=>$page->id])}}"  data-toggle="tooltip" data-placement="top" title="Edit page">
							<i class="fa fa-pencil-square-o"></i>
						</a>
						@if(auth()->user()->id ==1 && !empty($versions) && count($versions) <= 1)
						<form method="POST" action="{{ route('admin.page.delete' , ['id' => $page->id]) }}" accept-charset="UTF-8" style="display:inline" onsubmit="return confirm('This is last version of this page. Do you want to delete this page as a whole?');">
							<input name="_method" type="hidden" value="DELETE">
							<input name="_token" type="hidden" value="{{ csrf_token()}}">
							<button type="submit" class="btn btn-danger confirm" data-confirm="Are you sure you want to delete this page?"  data-toggle="tooltip" data-placement="top" title="Delete page"><i class="fa fa-trash"> </i></button>
						</form>
						@endif
					</td>
				</tr>
				@if(!empty($page->version))
					@foreach($page->version as $key => $versionContent)
						<tr class="collapse page-version-collapsible-{{$page->id}}">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>
								<div>
									<span style="{{ $key == $page->version_no ? "font-weight: bolder":'' }}">v{{$key}}</span> <span class="badge">{{ \Carbon\Carbon::parse($versionContent->updated_at)->format('Y-m-d H:i:s') }}</span>
								</div>
							</td>
							<td>
								<div>
									@if ($key != $page->version_no)
									<form method="POST" action="{{ route('admin.version.edit', ['id'=>$page->id]) }}" style="display: inline">
										<input name="_token" type="hidden" value="{{ csrf_token()}}">
										<input name="version_no" class="selected" type="hidden" value="{{ $key }}">
										<button class="btn btn-success" type="submit"  data-toggle="tooltip" data-placement="top" title="Publish this version">
											<i class="fa fa-check"></i>
										</button>
									</form>
									@endif
									<a target="_blank" class="btn btn-success" href="{{url($page->slug)}}?v={{$key}}"  data-toggle="tooltip" data-placement="top" title="View this page version">
										<i class="fa fa-eye"></i>
									</a>
									<a class="btn btn-primary" href="{{route('admin.page.update', ['id'=>$page->id])}}?v={{$key}}"  data-toggle="tooltip" data-placement="top" title="Edit this version">
										<i class="fa fa-pencil-square-o"></i>
									</a>
									@if(auth()->user()->id ==1 && $key != $page->version_no)
										<form method="POST" action="{{ route('admin.page.version.delete' , ['id' => $page->id, 'version' => $key]) }}" accept-charset="UTF-8" style="display:inline" onsubmit="return confirm('Are you sure you want to delete this page?');">
											<input name="_method" type="hidden" value="DELETE">
											<input name="_token" type="hidden" value="{{ csrf_token()}}">
											<button type="submit" class="btn btn-danger confirm" data-confirm="Are you sure you want to delete this page?"  data-toggle="tooltip" data-placement="top" title="Delete this version"><i class="fa fa-trash"> </i></button>
										</form>
									@endif
								</div>
							</td>
						</tr>
					@endforeach
				@endif
				@endforeach
			</tbody>
		</table>
	</div>
</div>
@stop
@section('js')
<script type="text/javascript">
	$('document').ready(function() {
		$('.see-versions').on('click', function(e) {
			var $el = $(this);
			if ($el.attr('aria-expanded') == 'false' || !$el.attr('aria-expanded') ) {
				$el.text('Hide' + '('+ $el.attr('data-version-count') +')');
			}else{
				$el.text('See all' + '('+ $el.attr('data-version-count') +')');
			}
		});
	});
</script>
<style>

</style>
@endsection