@extends('layout.app-full')
@section('css')
	<style>
		.loading, .no-record {
			top: 45%;
			position: absolute;
			display: block;
			text-align: center;
			left: 49%;
		}
	</style>
@stop
@section('content')
	<div class="row clip-panel-row">
		<div class="col-lg-12 panel-top-wrapper attached-top-wrapper">
			<div class="panel-top-content">
				<div class="pull-left">
					<a href="#" class="back-button back"><span>@lang('global.go_back')</span></a>
					<div class="panel-title">
						@lang('clip.all_clips')
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

@endsection

@section('js')
	<script>
		var key ='{{$key}}';
		var langResource =  {!!  json_encode(trans('resources')) !!};
		var langCountry =  {!!  json_encode(trans('country')) !!};
	</script>
	<script src="{{url('js/clipping.js')}}"></script>
@stop