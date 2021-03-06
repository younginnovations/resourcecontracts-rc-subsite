<?php
$api = app('App\Http\Services\APIService');
?>


<script>
 $(document).ready(function(){$(".expand").click(function(){$(this).toggleClass("active"),$(this).children(".parent").toggleClass("active")})});
</script>

<table class="table table-responsive table-contract table-contract-list">
	<thead>
	<th width="50%">
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$filter_params,"contract_name",$orderBy)}}'; return false;">
            @lang('global.document')
			{!!show_arrow($orderBy,$sortBy=='contract_name')!!}
        </a>
	</th>
	<th></th>
	@if(!site()->isCountrySite())
		<th width="12%">
            <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$filter_params,"country",$orderBy)}}'; return false;">
                @lang('global.country')
                {!!show_arrow($orderBy, $sortBy=='country')!!}
            </a>
		</th>
	@endif
	@if($showYear)
		<th>
            <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$filter_params,"year",$orderBy)}}'; return false;">
				@lang('global.year')
				{!!show_arrow($orderBy, $sortBy=='year')!!}
			</a>
		</th>
	@endif
	<th width="13%">
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$filter_params,"resource",$orderBy)}}'; return false;">
			@lang('global.resource')
			{!!show_arrow($orderBy, $sortBy=='resource')!!}
		</a>
	</th>
	<th width="25%">
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$filter_params,"contract_type",$orderBy)}}'; return false;">
			@lang('contract.contract_type')
			{!!show_arrow($orderBy, $sortBy=='contract_type')!!}
		</a>
	</th>
	</thead>
	<tbody>
	@if(isset($contracts->results) && !empty($contracts->results))
		@foreach($contracts->results as $contract)
			@include('contract.partials.listRow')
			@if(isset($contract->children))
                <?php
                usort(
                    $contract->children,
                    function ($a, $b) {
                        return intval($b->year_signed) - intval($a->year_signed);
                    }
                );

                $supporting_contracts_count = !empty($contract->supporting_contracts) ? count($contract->supporting_contracts) : 0;
                $children_contracts_count = !empty($contract->children) ? count($contract->children) : 0;
                ?>

				@foreach($contract->children as $child)
					@include('contract.partials.listRow',['contract'=>$child])
				@endforeach
                <?php
                $published_supporting_contract_count = 0;

                if(isset($contract->supporting_contracts)) {
                    foreach ($contract->supporting_contracts as $supporting_contract) {
                        if ($supporting_contract->is_published) {
                            $published_supporting_contract_count++;
                        }
                    }
				}
                ?>
				@if(count($contract->children) < $published_supporting_contract_count)
					<tr class='{{$contract->id}} in'>
						<td colspan="6" class="other-document">
							View
							<a href="{{route('contract.view',['id'=> $contract->open_contracting_id]).'#associatedcontracts'}}">{{$supporting_contracts_count - $children_contracts_count}}
								other document(s) </a> associated with {{$contract->name}}
						</td>
					</tr>
				@endif
			@endif

		@endforeach
	@else
		<tr>
			<td colspan="100%" class="search-not-found">
				@lang('search.search_not_found' , ['link' => route('contracts')])
			</td>
		</tr>
	@endif

	</tbody>
</table>
