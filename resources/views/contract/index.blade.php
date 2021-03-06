<?php
use \Illuminate\Support\Facades\Lang as Lang;
?>
@extends('layout.app-full')

@section('content')
	<div class="row">
		<div class="col-lg-12 panel-top-wrapper attached-top-wrapper">
			<div class="panel-top-content">
				<div class="clearfix">
					<div class="back back-button">Back</div>
					<div class="panel-title">
						@if(\Illuminate\Support\Facades\Input::get('year') !='')
							@lang('global.documents_of') {{\Illuminate\Support\Facades\Input::get('year')}}
						@else
							@lang('global.all_documents')
						@endif
					</div>
				</div>
			</div>
            <?php
            $params['download'] = true;
            $params['q'] = '';
            $download_route = route('contract.csv.download');
            $querystring = http_build_query($params);
            ?>
			<div class="advance-filter-wrapper contract_page_actions">
				@if(isset($contracts->total) && $contracts->total!=0)

					<button class="clip-btn on-annotation"><span class="icon"></span><span
								class="text">@lang('clip.clip')</span></button>

					<div class="social-share dropdown" id="social-toggler">
						<a class="dropdown-toggle"
						   data-toggle="dropdown"><span>@lang('contract.social_share')</span></a>
						@include('contract.partials.share')
					</div>

					<div class="dropdown download-csv">
                        <!-- Build link dynamically with JS to prevent access for aggressive web crawlers. -->
                        <a href="javascript:void(0)" onClick="window.location.href = '{{$download_route}}' + '?' + '{{$querystring}}'; return false;">
							<span>@lang('search.download')</span>
						</a>
					</div>
				@endif
			</div>
			<div class="contract-number-wrap">
				@if(isset($contracts->total) && $contracts->total!=0)
					<span>{{$contracts->total}}</span> {{ Lang::choice('global.documents' , $contracts->total) }}
				@else
					<span>0</span> {{ Lang::choice('global.documents' , 0) }}
				@endif
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 country-list-wrapper">
			<div class="panel panel-default panel-wrap country-list-wrap">
				<div class="panel-body">
					@include('contract.partials.search_list')

					@if(isset($contracts->total) && isset($contracts->per_page))
						@include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
					@endif
				</div>
			</div>
		</div>
	</div>
	<script>
		var lang = <?php echo json_encode(trans('annotation'));?>;
	</script>

@stop
