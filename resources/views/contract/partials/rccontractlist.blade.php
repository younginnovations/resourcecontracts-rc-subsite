<?php
$url = Request::all();
$order = \Illuminate\Support\Facades\Input::get('order', 'desc');
$sortBy = \Illuminate\Support\Facades\Input::get('sortby', 'year');
$path = Request::path();
$path = explode('/', $path);
$url['key'] = $path[1];
$route = "country.detail";
if ($path[0] == "resource") {
    $route = "resource.detail";
}
?>
<table class="table table-responsive table-contract">
    <thead>
    <th></th>
    <th><a href="{{appendInUrl($route,$url,"contract_name",$order)}}">Document {!!show_arrow($order, $sortBy=='contract_name')!!}</a></th>
    <th><a href="{{appendInUrl($route,$url,"year",$order)}}">Year {!!show_arrow($order, $sortBy=='year')!!}</a></th>
    <th><a href="{{appendInUrl($route,$url,"resource",$order)}}">Resource Type {!!show_arrow($order, $sortBy=='resource')!!}</a></th>
    <th><a href="{{appendInUrl($route,$url,"contract_type",$order)}}">Contract Type {!!show_arrow($order, $sortBy=='contract_type')!!}</a></th>
    </thead>
    <tbody>
    @forelse($contracts->results as $contract)
        <?php
        $api = app('App\Http\Services\APIService');
        $annotations = $api->getAnnotations($contract->contract_id);

        ?>
        <tr>
            <td></td>
            <td>
                <a href="{{route('contract.detail',['id'=>$contract->open_contracting_id ])}}">
                    {{ $contract->contract_name or ''}}
                </a>
                @if($annotations->total>0)
                    <div class="annotate-text"> Annotated</div>
                @endif

                <p class="country_name">- {{trans('country.'.strtoupper($contract->country_code))}}</p>
            </td>
            <td class="contract-date">{{$contract->signature_year}}</td>
            <td>
                <?php

                if (isset($url['sortby']) && $url['sortby'] == "resource") {
                    if ($url['order'] == "asc") {
                        asort($contract->resource);
                    }
                    if ($url['order'] == "desc") {
                        rsort($contract->resource);
                    }
                }
                ?>
                <ul>
                    @foreach($contract->resource as $resource)
                        @if(!empty($resource))
                            <li>{{$resource}}</li>
                        @else
                            -
                        @endif
                    @endforeach
                </ul>
            </td>
            <td>
                {{$contract->contract_type}}
            </td>
        </tr>
    @empty
        <tr>
            <td colspan="2">{{'Contract result not found.'}}</td>
        </tr>
    @endforelse
    </tbody>
</table>