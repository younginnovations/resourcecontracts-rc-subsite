@extends('layout.app-full')
@section('content')
<div class="row">
		<div class="col-lg-12 panel-top-wrapper search-top-wrapper attached-top-wrapper">
			<div class="panel-top-content">
				<div class="clearfix">
					<div class="back back-button">Back</div>

					<div class="panel-title">
						<?php
						$siteService = app('App\Http\Services\SiteService'); 
						$q = \Illuminate\Support\Facades\Input::get('q');
						$params = Request::all();
						$showSearchQ = showSearchQuery($params, $filter);
						$path = \Illuminate\Support\Facades\Request::path();
						$fullUrl = \Illuminate\Support\Facades\Request::fullUrl();
						$links = $siteService->createAllAndRecentDocsLink($path, $fullUrl);
						?>
						<div style="font-weight: normal; display: inline;">@lang('global.all_documents')</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row relative--small-screen">
		<div class="filter-wrapper advance-filter-wrapper" style="min-height: 135px">
			<div class="col-lg-12 static-search">
				<div class="filter-country-wrap" style="display: none">
						@include('layout.partials.search', ['searchPage' =>true])
					</form>
				</div>
			</div>
			<?php
			$params['download'] = true;
			?>
			@if($contracts->total!=0)
				<button class="clip-btn on-annotation">
					<span class="icon"></span>
					<span class="text">@lang('clip.clip')</span>
				</button>
				<div class="social-share dropdown" id="social-toggler">
					<a class="dropdown-toggle" data-toggle="dropdown">
						<span class="text">@lang('contract.social_share')</span>
					</a>
					@include('contract.partials.share')
				</div>
				<div class="download-csv">
					<a href="{{route('contract.csv.download',$params)}}">
						<span class="text">@lang('search.download')</span>
					</a>
				</div>
			@endif

			@if(!$showSearchQ)
				<div class="contract-number-wrap contract-search-number-wrap has-static-search">
					<span>{{$contracts->total}}</span> {{ \Illuminate\Support\Facades\Lang::choice('global.documents' , $contracts->total) }}
				</div>
			@else
				<div class="contract-number-wrap contract-search-number-wrap">
					<span>{{$contracts->total}}</span> {{ \Illuminate\Support\Facades\Lang::choice('global.documents' , $contracts->total) }}
				</div>
			@endif
		</div>
    </div>
    
	<div class="row">
		<div class="col-lg-12 country-list-wrapper">
			<div class="panel panel-default panel-wrap country-list-wrap">
				<div class="panel-body">

					@include('contract.partials.group_search_list',['filter_params'=>$filter_params, 'orderBy'=>$orderBy, 'sortBy'
					=>$sortBy,
					'route'=>$route, 'showYear' =>$showYear])

					@include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>
					$contracts->per_page, 'current_page' => $contracts->current_page ])
				</div>
			</div>
		</div>
	</div>
@stop

@section('js')
	<script>
        var lang = <?php echo json_encode(trans('annotation'));?>;
        var contractURL = '{{url('contract')}}';
        $(function () {
            $('.filter-country-wrap').show();
        });
	</script>

	<script type="text/javascript">
        $('document').ready(function () {
      	$("#close_adv_search").on("click",function(){$(".static-search").slideUp(200),$(this).hide(),$("#open_adv_search").show()}),$("#open_adv_search").on("click",function(){$(".static-search").slideDown(200),$(this).hide(),$("#close_adv_search").show()});
            var query = {!! json_encode($query) !!}
            if (query) {
                $('#query').val(query);
            }
        });
	</script>
@stop
