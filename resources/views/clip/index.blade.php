@extends('layout.app-full')

@section('content')
	<div class="row clip-panel-row">
		<div class="col-lg-12 panel-top-wrapper">
			<div class="panel-top-content attached-top-wrapper">
				<div class="pull-left">
					<a href="#" class="back-button back"><span>@lang('global.go_back')</span></a>
					<div class="panel-title" id="clip-panel-title">
                        <span>
                        	@lang('clip.all_clips')
							<span class="clipSelectCountWrapper" style="display: none;">
								(<span class="viewClipCount"></span>)
							</span>
                        </span>
						<a href="#" id="clear-all" style="display: none;">
                        	@lang('clip.clear_all_clips')
						</a>

					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="col-lg-12 country-list-wrapper search-list-wrapper" id="table-annotation">
		<div class="panel panel-default panel-wrap country-list-wrap">
			{{--<div class="loading">@lang('annotation.loading')</div>--}}
			<div class="panel-body" id="clip-annotations">

			</div>
		</div>
	</div>
@endsection

@section('js')
	<script>
		var key = '';
		var langClip = {!! json_encode(trans('clip')) !!};
		var langResource =  {!!  json_encode(trans('resources')) !!};
		var langCountry =  {!!  json_encode(trans('country')) !!};
		var siteName = '{{site()->meta('title')}}';
		var checkedClips = [];
	</script>
	<script src="{{generate_asset_url('js/clipping.js')}}"></script>
@stop