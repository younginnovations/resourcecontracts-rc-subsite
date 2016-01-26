<?php
use Illuminate\Support\Facades\Lang;

$url = Request::all();
$order = \Illuminate\Support\Facades\Input::get('order', '');
$sortBy = \Illuminate\Support\Facades\Input::get('sortby', '');
$route = Request::path();
?>

<table class="table table-responsive table-contract table-contract-list">
    <thead>
    <th></th>
    <th width="50%">
        <a href="{{appendInUrl($route,$url,"contract_name",$order)}}">@lang('global.document') {!!show_arrow($order, $sortBy=='contract_name')!!}</a>
    </th>
    <th></th>

    <th width="20%"><a href="{{appendInUrl($route,$url,"country",$order)}}">@lang('global.country') {!!show_arrow($order, $sortBy=='country')!!}</a></th>
    <th><a href="{{appendInUrl($route,$url,"year",$order)}}">@lang('global.year') {!!show_arrow($order, $sortBy=='year')!!}</a></th>
    <th width="15%"><a href="{{appendInUrl($route,$url,"resource",$order)}}">@lang('global.resource') {!!show_arrow($order, $sortBy=='resource')!!}</a></th>
    <th width="15%"><a href="{{appendInUrl($route,$url,"contract_type",$order)}}">@lang('contract.contract_type') {!!show_arrow($order, $sortBy=='contract_type')!!}</a></th>

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

                @if(isset($show_advanc))<input type="checkbox" class="compare" name="compare[]" value="{{$contract->open_contracting_id}}"/>@endif
                <a class="title-{{$contract->open_contracting_id}}" href="{{route('contract.detail',['id'=>$contract->open_contracting_id ])}}">
                    {{ $contract->name or ''}}
                </a>
                @if($annotations->total>0)
                    <div class="annotate-text"> @lang('global.annotated')</div>
                @endif

                <div class="search-text">
                    @if(isset($contract->text ) && $contract->text !='')
                        <p>{!!$contract->text.'...'!!}</p>
                    @endif

                    @if(isset($contract->annotations ) && $contract->annotations !='')
                        <p>{!!$contract->annotations.'...'!!}</p>
                    @endif

                    @if(isset($contract->metadata ) && $contract->metadata !='')
                        <p>{!! $contract->metadata.'...' !!}</p>
                    @endif
                </div>
                @if($annotations->total>0)
                    @if(\Illuminate\Support\Facades\Input::has('annotation_category'))
                        <?php $annotation_categories = \Illuminate\Support\Facades\Input::get(
                                'annotation_category'
                        )?>
                        @foreach($annotation_categories as $category)
                            <?php
                            $annotation = searchInArray(
                                    $annotations->result,
                                    'category',
                                    $category
                            );
                            ?>
                            @if($annotation)
                                <?php $annotation_type = isset($annotation['shapes']) ? 'pdf' : 'text'; ?>
                                {{str_limit($category,50)}}-<span
                                        style="color: #404040;">{{str_limit($annotation['text'],50)}}</span>
                                <a style="float: none"
                                   href="{{route('contract.detail',['id'=>$contract->open_contracting_id])}}#/{{$annotation_type}}/page/{{$annotation['page_no']}}/annotation/{{$annotation['id']}}">
                                    [Pg {{$annotation['page_no']}}]</a>
                                <br>
                            @endif
                        @endforeach

                    @endif
                @endif
                @if(isset($contract->group) && count($contract->group)>0)
                    <div class="contract-group">
                        <label for="">@lang('search.found_in'): </label>
                        @foreach($contract->group as $group)
                            <a>{{$group}}</a>
                        @endforeach
                    </div>
                @endif
            </td>
            <td>
                <div class="contract-info-section">
                    <div class="download-main-wrap">
                        <div class="download-wrap">

                            <span>Download</span>
                        </div>
                        <ul class="dropdown-menu">
                            <li><a href="{{route('contract.download.pdf',['id'=> $contract->open_contracting_id])}}">Pdf</a></li>
                            @if(env('CATEGORY')!="olc" && $contract->is_ocr_reviewed == true)
                                <li><a href="{{route('contract.download',['id'=> $contract->open_contracting_id])}}">Word File</a></li>
                            @endif
                            @if($annotations->total>0)
                                <li><a href="{{route('contract.annotations.download',['id'=> $contract->open_contracting_id])}}">Annotations</a></li>
                            @endif
                        </ul>
                    </div>
                </div>
            </td>
            @if($contract->country_code !='')
                <td>
                    <img style="width: 24px ; height: auto" src="{{getFlagUrl($contract->country_code)}}"/>
                    <span class="country-name-title">{{@trans('country')[$contract->country_code]}}</span>
                </td>
            @else
                <td></td>
            @endif
            @if($contract->year_signed !='')
                <td>{{$contract->year_signed}}</td>
            @else
                <td></td>
            @endif
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
                    @forelse($contract->resource as $resource)
                        @if(!empty($resource))
                            <li>
                                @if(Lang::has('resources.'.$resource))
                                    @lang('resources.'.$resource)
                                @else
                                    {{ $resource }}
                                @endif
                            </li>
                        @else
                            -
                        @endif
                    @empty
                        -
                    @endforelse
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
            <td colspan="6" class="search-not-found">@lang('search.search_not_found' , ['link' => route('contracts')])</td>
        </tr>
    @endforelse
    </tbody>
</table>