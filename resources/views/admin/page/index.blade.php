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
                        <th style="min-width: 178px;">@lang('admin.select_version')</th>
                        <th style="min-width: 228px;">@lang('admin.action')</th>
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
                                <span class="badge" style="background-color: #337ab7;">v{{ $page->version_no }}</span>
                            @if (count($versions) > 1)
                                    <a href="#" data-toggle="collapse" data-target=".page-version-collapsible-{{$page->id}}" class="see-versions" data-version-count="{{ count((array) $page->version) }}">See all({{ count((array) $page->version) }})</a>
                                @endif
                            @else
                            No versions available
                            @endif
                        </td>
                        <td>
                            <a target="_blank" class="btn btn-success" style="color: white;" href="{{url($page->slug)}}" title="View page">
                                <i class="fa fa-eye"></i>
                            </a>
                            <a class="btn btn-primary" style="color: white;" href="{{route('admin.page.update', ['id'=>$page->id])}}" title="Edit page">
                                <i class="fa fa-pencil-square-o"></i>
                            </a>
                            @if(auth()->user()->is_admin && !empty($versions) && count($versions) <= 1)
                            <form method="POST" action="{{ route('admin.page.delete' , ['id' => $page->id]) }}" accept-charset="UTF-8" style="display:inline" onsubmit="return confirm('This is last version of this page. Do you want to delete this page as a whole?');">
                                <input name="_method" type="hidden" value="DELETE">
                                <input name="_token" type="hidden" value="{{ csrf_token()}}">
                                <button type="submit" class="btn btn-danger confirm" data-confirm="Are you sure you want to delete this page?" title="Delete page"><i class="fa fa-trash"> </i></button>
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
                                    <span class="badge" style="{{ "font-weight: bolder; background-color: #337ab7;" }}">v{{$key}}</span>
                                    @if ($key == $page->version_no) <span style="font-style: italic;">Current version</span> @endif
                                    <span style="display: block;"><strong>Updated:</strong> {{ \Carbon\Carbon::parse($versionContent->updated_at)->format('M d,Y') }}</span>
                                </td>
                                <td>

                                        @if ($key != $page->version_no)
                                        <form method="POST" action="{{ route('admin.version.edit', ['id'=>$page->id]) }}" style="display: inline">
                                            <input name="_token" type="hidden" value="{{ csrf_token()}}">
                                            <input name="version_no" class="selected" type="hidden" value="{{ $key }}">
                                            <button class="btn btn-success" style="margin-right: 4px;" type="submit" title="Publish this version">
                                                <i class="fa fa-check"></i>
                                            </button>
                                        </form>
                                        @endif
                                        <a target="_blank" style="color:white;" class="btn btn-success" href="{{url($page->slug)}}?v={{$key}}" title="View this page version">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                        <a class="btn btn-primary" style="color:white;" href="{{route('admin.page.update', ['id'=>$page->id])}}?v={{$key}}" title="Edit this version">
                                            <i class="fa fa-pencil-square-o"></i>
                                        </a>
                                        @if(auth()->user()->id ==1 && $key != $page->version_no)
                                            <form method="POST" action="{{ route('admin.page.version.delete' , ['id' => $page->id, 'version' => $key]) }}" accept-charset="UTF-8" style="display:inline" onsubmit="return confirm('Are you sure you want to delete this page?');">
                                                <input name="_method" type="hidden" value="DELETE">
                                                <input name="_token" type="hidden" value="{{ csrf_token()}}">
                                                <button type="submit" class="btn btn-danger confirm" data-confirm="Are you sure you want to delete this page?" title="Delete this version"><i class="fa fa-trash"> </i></button>
                                            </form>
                                        @endif

                                </td>
                            </tr>
                        @endforeach
                    @endif
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@stop
@section('js')
	<style>

	</style>
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