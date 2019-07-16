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
    @if(isset($contracts->results))
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
                    <?php
                    $link = sprintf('/contract/%s#annotations', $contract->open_contracting_id);
                    ?>
                    @if($annotations->total>0)
                        <div class="annotate-text" data-popover="true" data-html="true" data-content="@lang('global.annotated_no_link' , ['link' => url($link)])"></div>
                    @endif
                    @if($path[0]!="countries")
                    <p class="country_name">- {{trans('country.'.strtoupper($contract->country_code))}}</p>
                    @endif
                </td>

                <td>
                    <div class="contract-info-section">
                        <div class="download-main-wrap">
                            <div class="download-wrap dropdown-toggle" data-toggle="dropdown">
                                <span>@lang('global.download')</span>
                            </div>
                            <ul class="dropdown-menu">
                                <li><a href="{{route('contract.download.pdf',['id'=> $contract->open_contracting_id])}}">@lang('annotation.pdf')</a></li>
                                @if(!site()->isOLC() && $contract->is_ocr_reviewed == true)
                                    <li><a href="{{route('contract.download',['id'=> $contract->open_contracting_id])}}">@lang('annotation.word_file')</a></li>
                                @endif
                                @if($annotations->total>0)
                                    <li><a href="{{route('contract.annotations.download',['id'=> $contract->open_contracting_id])}}">@lang('annotation.annotations_excel')</a></li>
                                @endif
                            </ul>
                        </div>
                    </div>
                </td>


                <td class="contract-date">{{$contract->year_signed}}</td>
                <td>
                    <?php
                    if (isset($url['sortby']) && $url['sortby'] == "resource") {
                        if (isset($url['order'])){
                            if ($url['order'] == "asc") {
                                asort($contract->resource);
                            }
                            if ($url['order'] == "desc") {
                                rsort($contract->resource);
                            }
                        }
                    }
                    ?>
                    <ul>
                        @foreach($contract->resource as $resource)
                            @if(!empty($resource))
                                <li>{{_l("resources",$resource)}}</li>
                            @else
                                -
                            @endif
                        @endforeach
                    </ul>
                </td>
                <td>
                    <ul>
                        @if(is_array($contract->contract_type))
                            @foreach($contract->contract_type as $contracttype)
                                @if(!empty($contracttype))
                                    <li>
                                        {{_l('codelist/contract_type.',$contracttype)}}
                                    </li>
                                @else
                                    -
                                @endif
                            @endforeach
                        @endif
                    </ul>
                </td>
            </tr>
        @endforeach
    @else
        <tr>
            <td colspan="100%">@lang('search.search_not_found')</td>
        </tr>
    @endif
    </tbody>
</table>