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

<table class="table table-responsive table-contract table-contract-list">
    <thead>
    <th width="50%">
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$url,"contract_name",$order)}}'; return false;">
            @lang('global.document')
            {!!show_arrow($order, $sortBy=='contract_name')!!}
        </a>
    </th>
    <th></th>
    @if(!site()->isCountrySite())
        <th width="12%">
            <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$url,"country",$order)}}'; return false;">
                @lang('global.country')
                {!!show_arrow($order, $sortBy=='country')!!}
            </a>
        </th>
    @endif
    @if($showYear)
        <th>
            <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$url,"year",$order)}}'; return false;">
                @lang('global.year')
                {!!show_arrow($order, $sortBy=='year')!!}
            </a>
        </th>
    @endif
    <th width="13%">
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$url,"resource",$order)}}'; return false;">
            @lang('global.resource')
            {!!show_arrow($order, $sortBy=='resource')!!}
        </a>
    </th>
    <th width="25%">
        <a href="javascript:void(0)" onClick="window.location.href = '{{url($path)}}' + '?' + '{{getSortQuery($route,$url,"contract_type",$order)}}'; return false;">
            @lang('contract.contract_type')
            {!!show_arrow($order, $sortBy=='contract_type')!!}
        </a>
    </th>
    </thead>
    <tbody>
    @if(isset($contracts->results) && !empty($contracts->results))
        @foreach($contracts->results as $contract)
            <?php
            $annotations = $api->getAnnotations($contract->id);
            $annotation_array = [];

            foreach ($annotations->result as $annotation) {
                if (!in_array($annotation->annotation_id, $annotation_array)) {
                    array_push($annotation_array, $annotation->annotation_id);
                }
            }

            $annotation_length = sizeof($annotation_array);
            $annotation_ids = (!empty($annotation_array)) ? implode(" ", $annotation_array) : "";
            ?>
            <tr>
                <td data-title="@lang('global.document')" class="documentTitle document_title">
                    <a class="title-{{$contract->open_contracting_id}}"
                       href="{{ url(sprintf("/contract/%s/view#/pdf", $contract->open_contracting_id )) }}">
                        {{ $contract->name or ''}}
                    </a>
                    <?php $link = sprintf('/contract/%s#annotations', $contract->open_contracting_id);?>
                    @if($annotations->total>0)
                        <div class="annotate-text" data-popover="true" data-html="true"
                             data-content="@if(site()->isRC())@lang('global.annotated', ['link' => url($link), 'ids' => $annotation_ids])
                             @else @lang('global.annotated_no_link') @endif ">
                            <span class="annotationCount">{{ $annotation_length  }}</span>
                        </div>
                        <button class="annotation-clip-icon clipToggleElems contractClipIcon"
                                data-id="{{ $annotation_ids }}"
                                data-action="add"
                                data-popover="true"
                                data-html="true"
                                data-content="@lang('clip.clip_contract')">Clip
                        </button>
                    @endif
                    <div class="search-text">
                        @if(isset($contract->text) && $contract->text !='')
                            <p>
                                <a href="{{ url(sprintf("/contract/%s/view#/search/%s", $contract->open_contracting_id ,rawurlencode($url['q']))) }}">
                                    {!!$contract->text.'...'!!}
                                    <span class="contract-group">@lang('global.text')</span>
                                </a>
                            </p>
                        @endif

                        @if(isset($contract->annotations ) && !empty($contract->annotations))
                            <p>
                                <a href="{{ url(sprintf("/contract/%s/view#/pdf/page/%s/annotation/%s", $contract->open_contracting_id ,$contract->annotations->page_no , $contract->annotations->annotation_id  )) }}">
                                    {!! $contract->annotations->annotation_text ." pg " .$contract->annotations->page_no !!}
                                    <span class="contract-group">@lang('global.annotation') </span>
                                </a>
                                <button class="annotation-clip-icon clipToggleElems static"
                                        data-id="{{ $contract->annotations->annotation_id }}"
                                        data-action="add"
                                        data-popover="true"
                                        data-html="true"
                                        data-content="@lang('clip.clip_annotation')">Clip
                                </button>
                            </p>
                        @endif

                        @if(isset($contract->metadata ) && $contract->metadata !='')
                            <p>
                                <a href="{{ route('contract.view' , ['id' => $contract->open_contracting_id]) }}">
                                    {!! $contract->metadata.'...' !!}
                                    <span class="contract-group">@lang('global.metadata')</span>
                                </a>
                            </p>
                        @endif
                    </div>
                    @if($annotations->total>0)
                        @if(\Illuminate\Support\Facades\Input::has('annotation_category'))
                            <?php $annotation_categories = \Illuminate\Support\Facades\Input::get(
                                'annotation_category'
                            )?>
                            @foreach($annotation_categories as $category)
                                <?php
                                $annotation = searchInArray($annotations->result, 'category', $category);
                                ?>
                                @if($annotation)
                                    <?php $annotation_type = isset($annotation['shapes']) ? 'pdf' : 'text'; ?>
                                    {{str_limit($category,50)}}-
                                    <span style="color: #404040;">
											{{str_limit($annotation['text'],50)}}
									</span>

                                    <a style="float: none"
                                       href="{{route('contract.detail',['id'=>$contract->open_contracting_id])}}#/{{$annotation_type}}/page/{{$annotation['page_no']}}/annotation/{{$annotation['id']}}">
                                        [Pg {{$annotation['page_no']}}]
                                    </a>
                                    <button class="annotation-clip-icon clipToggleElems static"
                                            data-id="{{ $annotation['annotation_id'] }}"
                                            data-action="add"
                                            data-popover="true"
                                            data-html="true"
                                            data-content="@lang('clip.clip_annotation')">Clip
                                    </button>
                                    <br>
                                @endif
                            @endforeach
                        @endif
                    @endif
                </td>
                <td class="download_row">

                    <div class="contract-info-section">
                        <div class="download-main-wrap dropdown">
                            <div class="download-wrap dropdown-toggle" data-toggle="dropdown">
                                <span>@lang('global.download')</span>
                            </div>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="{{route('contract.download.pdf',['id'=> $contract->open_contracting_id])}}">@lang('annotation.pdf')</a>
                                </li>
                                @if(!site()->isOLC() && $contract->is_ocr_reviewed == true)
                                    <li>
                                        <a href="{{route('contract.download',['id'=> $contract->open_contracting_id])}}">@lang('annotation.word_file')</a>
                                    </li>
                                @endif
                                @if($annotations->total>0)
                                    <li>
                                        <a href="{{route('contract.annotations.download',['id'=> $contract->open_contracting_id])}}">@lang('annotation.annotations_excel')</a>
                                    </li>
                                @endif
                            </ul>
                        </div>
                    </div>
                @if( !site()->isCountrySite() && $contract->country_code !='')
                    <td data-title="@lang('global.country')">
                        <img style="width: 24px ; height: auto" src="{{getFlagUrl($contract->country_code)}}"/>
                        <span class="country-name-title">{{@trans('country')[$contract->country_code]}}</span>
                    </td>
                @endif
                @if($showYear)
                    @if($contract->year_signed !='')
                        <td data-title="@lang('global.year')">{{$contract->year_signed}}</td>
                    @else
                        <td></td>
                    @endif
                @endif
                <td data-title="@lang('global.resource')">
                    <?php
                    if (isset($url['sortby']) && $url['sortby'] == "resource") {
                        if (isset($url['order']) && $url['order'] == "asc") {
                            asort($contract->resource);
                        }
                        if (isset($url['order']) && $url['order'] == "desc") {
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
                <td data-title="@lang('contract.contract_type')">
                    <ul>
                        @if(is_array($contract->contract_type))
                            @foreach($contract->contract_type as $contracttype)
                                @if(!empty($contracttype))
                                    <li>
                                        @if(Lang::has('codelist/contract_type.'.$contracttype))
                                            {{ trans('codelist/contract_type')[$contracttype] }}
                                        @else
                                            {{ $contracttype }}
                                        @endif
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
            <td colspan="100%" class="search-not-found">
                @lang('search.search_not_found' , ['link' => route('contracts')])
            </td>
        </tr>
    @endif

    </tbody>
</table>
