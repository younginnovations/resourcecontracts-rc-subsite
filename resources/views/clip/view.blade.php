@extends('layout.app-full')

@section('content')
	<div class="row clip-panel-row">
		<div class="col-lg-12 panel-top-wrapper attached-top-wrapper">
			<div class="panel-top-content">
				<div class="pull-left">
					<a href="#" class="back-button back"><span>@lang('global.go_back')</span></a>
					<div class="panel-title">
						<span>
							@lang('clip.all_clips')
							<span class="clipSelectCountWrapper" style="display: none;">
								(<span class="viewClipCount"></span>)
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="col-lg-12 country-list-wrapper search-list-wrapper" id="table-annotation">
		<div class="panel panel-default panel-wrap country-list-wrap">
			<div class="panel-body" id="clip-annotations">
				<div class="loading">@lang('annotation.loading')</div>
			</div>
		</div>
	</div>
@stop

@section('js')
	<script>
		var key = '{{$key}}';
		var langResource =  {!!  json_encode(trans('resources')) !!};
		var langCountry =  {!!  json_encode(trans('country')) !!};
		var langClip = {!! json_encode(trans('clip')) !!};
		var siteName = '{{site()->meta('title')}}';
		var checkedClips = [];
	</script>
	<script src="{{url('js/clipping.js')}}?v=2020-07-22"></script>
@stop