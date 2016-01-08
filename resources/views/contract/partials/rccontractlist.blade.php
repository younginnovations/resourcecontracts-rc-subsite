<?php

$url = Request::all();
$order = \Illuminate\Support\Facades\Input::get('order', '');
$sortBy = \Illuminate\Support\Facades\Input::get('sortby', '');
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
    <th>
        <a href="{{appendInUrl($route,$url,"contract_name",$order)}}">@lang('global.document'){!!show_arrow($order, $sortBy=='contract_name')!!}</a>
    </th>
    <th></th>
    <th width="10%"><a href="{{appendInUrl($route,$url,"year",$order)}}">@lang('global.year') {!!show_arrow($order, $sortBy=='year')!!}</a></th>

    <th>
        <a href="{{appendInUrl($route,$url,"resource",$order)}}">@lang('global.resource') {!!show_arrow($order, $sortBy=='resource')!!}</a>
    </th>
    <th><a href="{{appendInUrl($route,$url,"contract_type",$order)}}">@lang('global.contract_type'){!!show_arrow($order, $sortBy=='contract_type')!!}</a></th>
    </thead>
    <tbody>
    @forelse($contracts->results as $contract)
        <?php
        $api = app('App\Http\Services\APIService');
        $annotations = $api->getAnnotations($contract->id);

        ?>
        <tr>
            <td></td>
            <td>
                <a href="{{route('contract.detail',['id'=>$contract->open_contracting_id ])}}">
                    {{ $contract->name or ''}}
                </a>
                @if($annotations->total>0)
                    <div class="annotate-text"> Annotated</div>
                @endif

                <p class="country_name">- {{trans('country.'.strtoupper($contract->country_code))}}</p>
            </td>

            <td>
                <div class="contract-info-section">
                    <div class="download-main-wrap">
                        <div class="download-wrap">

                            <span>Download</span>
                        </div>
                        <ul class="dropdown-menu">
                            <li><a href="{{route('contract.download.pdf',['id'=> $contract->open_contracting_id])}}">Pdf</a></li>
                            @if(env('CATEGORY')!= 'olc' && $contract->is_ocr_reviewed == 1)
                                <li><a href="{{route('contract.download',['id'=> $contract->open_contracting_id])}}">Word File</a></li>
                            @endif
                        </ul>
                    </div>
                </div>
            </td>


            <td class="contract-date">{{$contract->year_signed}}</td>

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

                @if(is_array($contract->contract_type))
                    @foreach($contract->contract_type as $contracttype)
                        @if(!empty($contracttype))
                            <li>{{$contracttype}}</li>
                        @else
                            -
                        @endif
                    @endforeach

                @endif
            </td>
        </tr>
    @empty
        <tr>
            <td colspan="2">{{'Contract result not found.'}}</td>
        </tr>
    @endforelse
    </tbody>
</table>