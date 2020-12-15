<?php
$api = app('App\Http\Services\APIService');

$url = Request::all();
$order = \Illuminate\Support\Facades\Input::get('order', '');
$sortBy = \Illuminate\Support\Facades\Input::get('sortby', '');
$path = Request::path();
$full_path = $path;
$path = explode('/', $path);
$url['key'] = $path[1];
$route = "country.detail";
if ($path[0] == "resource") {
    $route = "resource.detail";
}
?>
<script>
 $(document).ready(function(){$(".expand").click(function(){$(this).toggleClass("active"),$(this).children(".parent").toggleClass("active")})});
</script>
<table class="table table-responsive table-contract">
    <thead>
    <th>
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($full_path)}}' + '?' + '{{getSortQuery($route,$url,"contract_name",$order)}}'; return false;">
            @lang('global.document')
            {!!show_arrow($order, $sortBy=='contract_name')!!}
        </a>
    </th>
    <th> </th>
    @if(!site()->isCountrySite() && $showCountry)
		<th width="12%">
            <a href="javascript:void(0)" onClick="window.location.href = '{{url($full_path)}}' + '?' + '{{getSortQuery($route,$url,"country",$order)}}'; return false;">
                @lang('global.country')
                {!!show_arrow($order, $sortBy=='country')!!}
            </a>
		</th>
	@endif
    <th width="10%">
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($full_path)}}' + '?' + '{{getSortQuery($route,$url,"year",$order)}}'; return false;">
            @lang('global.year')
            {!!show_arrow($order, $sortBy=='year')!!}
        </a>
    </th>

    <th>
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($full_path)}}' + '?' + '{{getSortQuery($route,$url,"resource",$order)}}'; return false;">
            @lang('global.resource')
            {!!show_arrow($order, $sortBy=='resource')!!}
        </a>
    </th>
    <th>
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($full_path)}}' + '?' + '{{getSortQuery($route,$url,"contract_type",$order)}}'; return false;">
            @lang('global.contract_type')
            {!!show_arrow($order, $sortBy=='contract_type')!!}
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
