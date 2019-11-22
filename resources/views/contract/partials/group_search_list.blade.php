<?php
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Request;
$api = app('App\Http\Services\APIService');

$url = Request::all();
$path = Request::path();
$order = \Illuminate\Support\Facades\Input::get('order', '');
$sortBy = \Illuminate\Support\Facades\Input::get('sortby', '');
$route = Request::path();
$showYear = true;

if ($route == "contracts" && isset($url['year'])) {
    $showYear = false;
}
?>
<style>
    .associate > a {
        color: blue !important;
    }

    .greyed > a {
        color: #c7c6c1 !important;
    }

    .associate {
        padding-left: 80px !important;
        background: url(../../images/ic-file.png) no-repeat 55px 20px !important;
    }
</style>

<table class="table table-responsive table-contract table-contract-list">
    <thead>
        <th width="50%">
            <a href="{{appendInUrl($route,$url,"contract_name",$order)}}">@lang('global.document') {!!show_arrow($order,
                $sortBy=='contract_name')!!}</a>
        </th>
        <th></th>
        @if(!site()->isCountrySite())
        <th width="12%"><a href="{{appendInUrl($route,$url,"country",$order)}}">@lang('global.country') {!!show_arrow
                ($order, $sortBy=='country')!!}</a>
        </th>
        @endif
        @if($showYear)
        <th>
            <a href="{{appendInUrl($route,$url,"year",$order)}}">
                @lang('global.year')
                {!!show_arrow($order, $sortBy=='year')!!}
            </a>
        </th>
        @endif
        <th width="13%">
            <a href="{{appendInUrl($route,$url,"resource",$order)}}">
                @lang('global.resource')
                {!!show_arrow($order, $sortBy=='resource')!!}
            </a>
        </th>
        <th width="25%">
            <a href="{{appendInUrl($route,$url,"contract_type",$order)}}">
                @lang('contract.contract_type')
                {!!show_arrow($order, $sortBy=='contract_type')!!}
            </a>
        </th>
    </thead>
    <tbody>
        @if(isset($contracts->results) && !empty($contracts->results))
        @foreach($contracts->results as $contract)
        @include('contract.partials.listRow')
        @if(isset($contract->children))
        <?php $main = $contract; ?>
        @foreach($contract->children as $child)
        <?php $contract = $child; ?>
        @include('contract.partials.listRow')
        @endforeach
        @if(count($main->children) < count($main->supporting_contracts))
            <tr>
                <td colspan="100%">
                    View
                    <a href="{{route('contract.view',['id'=> $main->open_contracting_id]).'#associatedcontracts'}}">{{count($main->supporting_contracts)- count($main->children)}}
                        other document(s) </a> associate with {{$main->name}}
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