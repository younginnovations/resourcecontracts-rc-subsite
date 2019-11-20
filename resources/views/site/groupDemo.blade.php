@extends('layout.app-full')
@section('content')
	<div class="row">
		<div class="col-lg-12 country-list-wrapper">
			<div class="panel panel-default panel-wrap country-list-wrap">
				<div class="panel-body">

					@include('contract.partials.group_search_list',['filter_params'=>$filter_params, 'orderBy'=>$orderBy, 'sortBy'
					=>$sortBy,
					'route'=>$route, 'showYear' =>$showYear])

					@include('contract.partials.pagination', ['total_item' => $contracts->result_total, 'per_page'=>
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
            $('#close_adv_search').on('click', function () {
                $('.static-search').slideUp(200);
                $(this).hide();
                $('#open_adv_search').show();
            });

            $('#open_adv_search').on('click', function () {
                $('.static-search').slideDown(200);
                $(this).hide();
                $('#close_adv_search').show();
            });

            var query = {!! json_encode($query) !!}

            if (query) {
                $('#query').val(query);
            }
        });
	</script>
@stop
