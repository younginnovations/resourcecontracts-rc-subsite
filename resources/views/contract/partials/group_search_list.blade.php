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
    .greyed>a {
        color: #c7c6c1 !important;
    }

    .associate {
        padding-left: 60px !important;
        background: none !important;
    }

    .other-document {
        padding-left: 60px !important;
        font-style: italic;
    }

    .table-contract tbody td.documentTitle{
        background: none;
        position: relative;
    }
    .table-contract tbody td.parent:before {
        content: '';<<<<<<< 1245-api-groupContract
59
 
            $(this).toggleClass("active");
60
 
=======
        background: url(../../images/ic-disabled-arrow.png) no-repeat;
        width: 15px;
        height: 10px;
        display: inline-block;
        position: absolute;
        left: 5px;
        top: 20px;
        background-size: 90%;
        transition: transform 0.3s ease-in;
        transform: rotate(0)
    }

    .table-contract tbody td.parent.active:before{
        transform: rotate(-90deg)
    }
</style>

<script>
    $(document).ready(function() {
        $(".expand").click(function() {
            $(this).toggleClass("active")
            $(this).children('.parent').toggleClass("active");
        });
    })
  
</script>

<table class="table table-responsive table-contract table-contract-list">
    <thead>
        <th width="50%">
            <a href="{{appendInUrl($route,$url,"contract_name",$order)}}">@lang('global.document') {!!show_arrow($order,
                $sortBy=='contract_name')!!}</a>
        </th>
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
        @if(isset($contract->children) && count($contract->children) > 0)
        <?php 
            $main = $contract; 
            usort($contract->children, function($a, $b) {return intval($b->year_signed) - intval($a->year_signed);});
        ?>
        @foreach($contract->children as $child)
        <?php $contract = $child; ?>
        @include('contract.partials.listRow')
        @endforeach
        @if(count($main->children) < count($main->supporting_contracts))
            <tr class='{{$main->id}} in'>
                <td class="other-document">
                    View
                    <a href="{{route('contract.view',['id'=> $main->open_contracting_id]).'#associatedcontracts'}}">{{count($main->supporting_contracts)- count($main->children)}}
                        other document(s) </a> associated with {{$main->name}}
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