<?php
$api = app('App\Http\Services\APIService');
?>


<script>
 $(document).ready(function(){$(".expand").click(function(){$(this).toggleClass("active"),$(this).children(".parent").toggleClass("active")})});
</script>

<table class="table table-responsive table-contract table-contract-list">
	<thead>
	<th width="50%">
		<a href="{{appendInUrl($route,$filter_params,"contract_name",$orderBy)}}">@lang('global.document')
			{!!show_arrow
		($orderBy,
			$sortBy=='contract_name')!!}</a>
	</th>
	<th></th>
	@if(!site()->isCountrySite())
		<th width="12%"><a href="{{appendInUrl($route,$filter_params,"country",$orderBy)}}">@lang('global.country')
				{!!show_arrow
				($orderBy, $sortBy=='country')!!}</a>
		</th>
	@endif
	@if($showYear)
		<th>
			<a href="{{appendInUrl($route,$filter_params,"year",$orderBy)}}">
				@lang('global.year')
				{!!show_arrow($orderBy, $sortBy=='year')!!}
			</a>
		</th>
	@endif
	<th width="13%">
		<a href="{{appendInUrl($route,$filter_params,"resource",$orderBy)}}">
			@lang('global.resource')
			{!!show_arrow($orderBy, $sortBy=='resource')!!}
		</a>
	</th>
	<th width="25%">
		<a href="{{appendInUrl($route,$filter_params,"contract_type",$orderBy)}}">
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
							<a href="{{route('contract.view',['id'=> $contract->open_contracting_id]).'#associatedcontracts'}}">{{count($contract->supporting_contracts)- count($contract->children)}}
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
