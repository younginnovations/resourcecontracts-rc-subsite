<?php
use Illuminate\Support\Facades\Lang;

?>
@extends('layout.app-full')

@section('content')

    <div class="row">
        <div class="col-lg-12 panel-top-wrapper">
            <div class="panel-top-content">
                @if($referrer != '')
                <a href="{{$referrer}}" class="back contract-back"><span>@lang('global.go_back')</span></a>
                @endif
                <div class="pull-left">
                    <div class="breadcrumb-wrapper contract-breadcrumb-wrapper">
                        <ul>
                            <li><a href="{{url()}}">@lang('global.home')</a></li>
                            <li><a href="{{route('contracts')}}">{{Lang::choice('global.contracts' , 2)}}</a></li>
                            <li>{{str_limit($contract->metadata->name, 100)}}</li>
                        </ul>
                    </div>

                    <div class="panel-title contract-panel-title">
                    {{$contract->metadata->name}}
                </div>
                </div>
                <div class="action-links">
                    <ul>
                        @if($contract->pages->total>0)
                            <li class="pull-left">
                                    <a href="{{route('contract.detail',['id'=>$contract->metadata->open_contracting_id])}}">@lang('global.view_document')</a>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
            <div class="filter-wrapper actions-wrapper">
                <div class="col-lg-12">
                    <div class="download-main-wrap">
                        <div class="download-wrap">
                            <span>@lang('global.download')</span>
                        </div>

                        <ul class="dropdown-menu">
                            <li><a href="{{_e($contract->metadata->file[0], 'url')}}" target="_blank">Pdf</a></li>
                            @if(_e($contract->metadata->file[1], 'url') !='' && env('CATEGORY')!="olc")
                                <li><a href="{{route('contract.download',['id'=> $contract->metadata->open_contracting_id])}}"
                                       target="_blank">Word File</a></li>
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row contract-detail-wrapper">
        <div class="col-lg-12">
            <div class="col-md-6 col-lg-6">
                <div class="panel panel-default panel-wrap panel-contract-wrap">
                    <div class="panel-body">
                        <ul>
                            <li class="col-lg-12 open-contracting-id">
                                <label for="">@lang('contract.open_contracting_id')</label>
                                <span>{{_e($contract->metadata,'open_contracting_id','-')}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.language')</label>
                                <span>{{strtoupper(_e($contract->metadata,'language','-'))}}</span>
                            </li>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.country')</label>
                                @if($code = strtolower(_e($contract->metadata->country,'code')))
                                    <span><a href="{{route('country.detail', ['key'=>$code])}}">{{ucfirst(_e($contract->metadata->country,'name'))}}</a>
                                        @if(env("CATEGORY")=="rc")
                                            @if(isset($contract->metadata->url->amla) && !empty($contract->metadata->url->amla))
                                                <span class="amla-link">See <a href="{{$contract->metadata->url->amla}}"
                                                                               target="_blank">Legislation</a> in African Mining Legislation Atlas</span>@endif</span>
                                @endif
                                @endif

                            </li>
                        </ul>
                        <ul class="government-entity-wrap">
                            <li class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <label for="">@lang('global.government_entity')</label>
                                @if(isset($contract->metadata->government_entity))
                                    @foreach($contract->metadata->government_entity as $governmentEntity)
                                        <span>
                                        @if(isset($governmentEntity->name) && isset($governmentEntity->identifier) && !empty($governmentEntity->name))
                                                {{$governmentEntity->name}} @if($governmentEntity->identifier)
                                                    ({{$governmentEntity->identifier}})@endif
                                            @endif
                                    </span>
                                    @endforeach
                                @else
                                    -
                                @endif
                            </li>

                        </ul>
                        <ul>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.signature_date')</label>
                                <?php
                                $date = $contract->metadata->date_signed;
                                $date = strtotime($date);
                                ?>
                                <span>@if($date){{date('F',$date)}} {{date('d',$date)}}, {{date('Y',$date)}}@else
                                        - @endif</span>
                            </li>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.document_type')</label>
                                <span>{{_e($contract->metadata,'type','-')}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.type_contract')</label>
                                <span class="contract-type-list">@if(isset($contract->metadata->contract_type) && !empty($contract->metadata->contract_type) && is_array($contract->metadata->contract_type))
                                          @foreach($contract->metadata->contract_type as $contractype)
                                            <a href="{{route("search",['contract_type'=>$contractype])}}">{{$contractype}}</a>
                                          @endforeach
                                        @endif
                                </span>
                            </li>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.resource')</label>
                                <?php
                                $resource = _e($contract->metadata, 'resource', '-');
                                $resource = is_array($resource) ? $resource : [];
                                ?>
                                <span class="resource-list">
                                @foreach($resource as $res)
                                        <a href="{{route("resource.detail",['key'=>urlencode($res)])}}">{{$res}}</a>
                                    @endforeach
                            </span>
                            </li>
                        </ul>
                        @if(env('CATEGORY') =="olc")
                        <ul>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.land_matrix_id')</label>
                                <span>@if(isset($contract->metadata->matrix_page) && isset($contract->metadata->deal_number) && !empty($contract->metadata->matrix_page) && !empty($contract->metadata->deal_number))
                                        <a  target="_blank" href="{{ $contract->metadata->matrix_page }}">#{{$contract->metadata->deal_number}}</a>
                                    @else
                                        - @endif</span>
                            </li>
                        </ul>
                        @endif
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <div class="panel panel-default panel-wrap panel-annotation-wrap">
                    <div class="panel-body">
                        <div class="annotation-block">
                            <div class="title">@lang('global.annotations')</div>
                            <ul>
                                <?php $i = 0; ?>
                                @forelse($contract->annotationsGroup as $category=>$annotation)
                                
                                    @if($i < 5 )
                                        <li><a class="view-annotation-category"
                                               href="#{{str_slug($category,'-')}}">{{$category}}</a></li>
                                        <?php $i ++; ?>
                                    @endif
                                @empty
                                    <div class="no-data">@lang('contract.annotation_message')</div>
                                @endforelse
                            </ul>
                        </div>
                        <div class="view-all-annotations">
                            @if(count($contract->annotationsGroup)>0)
                                <a href="#annotations" class="view-annotation">@lang('global.view_annotations')</a>
                            @else
                                <a href="javascript:void();" class="view-annotation disabled">@lang('global.view_annotations')</a>
                            @endif

                        </div>
                    </div>
                </div>
            </div>
        </div>
        @if(isset($contract->metadata->note) && ($contract->metadata->note != ""))
        <div class="col-lg-12">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-body metadata-note">
                    <span>Note</span>
                   {{$contract->metadata->note}}
                </div>
            </div>
        </div>
        @endif
        <div class="col-lg-12">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-heading">
                @lang('contract.company')
            </div>
                @foreach($contract->metadata->participation as $company)
                    <div class="panel-body panel-col3-wrap">
                        <ul>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.company_name')</label>
                                <span>@if(isset($company->name) && !empty($company->company->name)) <a
                                            href="{{route("search",['company_name'=>$company->company->name])}}">{{$company->company->name}} </a> @else
                                        - @endif</span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.jurisdiction')</label>
                        <span>
                        <?php $ji = _e($company->company->identifier->creator, 'spatial', null);?>
                            @if(!is_null($ji))
                                {{trans('country')[strtoupper($ji)]}}
                            @else
                                -
                            @endif
                        </span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.open_corporate_ID')</label>
                                <span>@if(isset($company->company->opencorporates_link) && !empty($company->company->opencorporates_link))<a
                                            href="{{$company->company->opencorporates_link}}">{{str_limit($company->company->opencorporates_link,25)}}</a> @else
                                        - @endif</span>
                            </li>
                        </ul>
                        <ul>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.company_add')</label>
                                <span>{{_e($company->company,'address','-')}}</span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.company_number')</label>
                                <span>{{_e($company->company->identifier,'id','-')}}</span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.corporate_grouping')</label>
                                <span>@if(isset($company->company->corporate_grouping) && !empty($company->company->corporate_grouping))
                                        <a href="{{route("search",['corporate_group'=>$company->company->corporate_grouping])}}">{{$company->company->corporate_grouping}} </a> @else
                                        - @endif
                                </span>
                            </li>
                        </ul>
                        @if(env('CATEGORY') != 'olc' )
                        <ul>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.registration_agency')</label>
                                <span>{{_e($company->company->identifier->creator,'name','-')}}</span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.share')</label>
                                <span>
                                    <?php
                                    $ps = _e($company,'share','');
                                    echo ($ps =='') ? '-' : $ps*100 .'%';
                                    ?>
                                    </span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.operator')</label>
                        <span>@if(isset($company->is_operator))
                                @if($company->is_operator==1)
                                    Yes
                                @elseif($company->is_operator==0)
                                    No
                                @else
                                    -
                                @endif
                            @endif

                        </span>
                            </li>
                        </ul>
                            @endif
                    </div>
                @endforeach
            </div>
        </div>

        <div class="col-lg-12">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-heading">
                @lang('contract.associated_documents')
            </div>
                <div class="panel-body panel-table">
                    <table class="table table-responsive table-contract table-associated-contract">
                        <tbody>
                        <tr>
                            @foreach($contract->metadata->parent as $parentContract)

                                <td width="70%">
                                    @if($parentContract->is_published==1)
                                        <a href="{{route('contract.detail',['id'=>$parentContract->open_contracting_id])}}">{{$parentContract->name}}</a> &nbsp; (parent)
                                    @else
                                        {{$parentContract->name}} (parent)
                                    @endif
                                </td>
                            @endforeach
                        </tr>
                        <?php $supportingContracts = _e($contract->metadata, 'supporting', []);?>
                        @foreach($contract->metadata->supporting as $supportingContract)
                            <tr>
                                <td width="70%">
                                    @if($supportingContract->is_published==1)
                                        <a href="{{route('contract.detail',['id'=>$supportingContract->open_contracting_id])}}"> {{$supportingContract->name}}</a>
                                    @endif
                                </td>

                            </tr>
                        @endforeach

                        @if(empty($contract->metadata->parent) && empty($contract->metadata->supporting))
                            <tr>
                                <td class="no-data">
                                    @lang('contract.ass_doc_msg')
                                </td>
                            </tr>
                        @endif
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        @if(env('CATEGORY') != 'olc')
        <div class="col-lg-12">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-heading">
                @lang('contract.concession')
            </div>
                <div class="panel-body">
                    <ul>
                        <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <label for="">@lang('contract.project_title')</label>
                            <span>{{_e($contract->metadata->project,'name','-')}}</span>
                        </li>
                        <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <label for="">@lang('contract.project_identifier')</label>
                            <span>{{_e($contract->metadata->project,'identifier','-')}}</span>
                        </li>
                    </ul>
                    <ul>
                        <?php
                        $concessions = _e($contract->metadata, 'concession', []);
                        ?>
                        @foreach($concessions as $concession)
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('contract.license_name')</label>
                                <span>{{_e($concession,'name','-')}}</span>
                            </li>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('contract.license_identifier')</label>
                                <span>{{_e($concession,'identifier','-')}}</span>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
        @endif
        <div class="col-lg-12">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-heading">
                @lang('contract.source')
            </div>
                <div class="panel-body">
                    <ul>
                        <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <label for="">@lang('contract.source_url')</label>
                            <span>@if(!empty(_e($contract->metadata->url,'source')))<a
                                        href="{{$contract->metadata->url->source}}"
                                        target="_blank">{{str_limit($contract->metadata->url->source,50)}}</a>@else
                                    -@endif</span>
                        </li>
                        <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <label for="">@lang('contract.disclosure_mode')</label>
                            <span>{{_e($contract->metadata,'publisher_type','-')}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    @if(count($contract->annotationsGroup)>0)
        <div class="row annotation-list-wrapper" id="annotations">
            <div class="col-lg-12">
                <div class="panel panel-default panel-wrap panel-annotation-list-wrap">
                    <div class="panel-heading">Annotations</div>
                    <div class="panel-body">
                        <div class="annotation-category-cluster">
                            <ul>
                                <li><a class="view-annotation-cluster active" href="#cluster-all">All</a></li>
                                @foreach($contract->annotationsCluster as $cluster=>$value)
                                    <li><a class="view-annotation-cluster" href="#cluster-{{str_slug($cluster,40)}}">{{$cluster}}</a></li>
                                @endforeach
                            </ul>

                        </div>

                        @forelse($contract->annotationsCluster as $cluster  => $categories)
                            <div id="cluster-{{str_slug($cluster,'-')}}" class="cluster-wrap">
                                <div class="category-title">
                                    {{$cluster}}
                                </div>

                                    @foreach($categories as $category => $annotations)
                                    <div id="{{str_slug($category,'-')}}" class="sub-category">
                                        <a href="#{{str_slug($category,'-')}}"><i class='glyphicon glyphicon-link' style="display:none;"></i></a>
                                        {{$category}}
                                    </div>
                                    <ul class="row">
                                    @foreach($annotations as $text => $annots)
                                        <?php
                                            $a = explode('--',$text);
                                            $preamble =  isset($a[1]) ? $a[1] : '';
                                            $text=  isset($a[0]) ? $a[0] : '';
                                            ?>
                                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                <div class="pull-left">
                                                    <div class="annotation-text">
                                                        {{$text}}
                                                    </div>

                                                    <p class="annotation-preamle">
                                                    @if($preamble !='')
                                                        {{$preamble}}
                                                    @endif
                                                        <p>
                                                        @foreach($annots as $key => $annotation)
                                                            <?php $annotation_type = isset($annotation->shapes) ? 'pdf' : 'text'; ?>
                                                            <a  href="{{route('contract.detail',['id'=>$contract->metadata->open_contracting_id])}}#/{{$annotation_type}}/page/{{$annotation->page_no}}/annotation/{{$annotation->id}}">
                                                                Page {{_e($annotation,'page_no')}}</a>@if($key >= 0 && $key < (count($annots)-1)), @endif
                                                        @endforeach
                                                        </p>
                                                    </p>
                                                </div>
                                            </li>
                                        @endforeach
                                    </ul>
                                @endforeach
                            </div>
                        @empty

                            <div class="category-wrap">
                                <ul>
                                    <li class="no-data">@lang('contract.annotation_message')</li>
                                </ul>
                            </div>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>
        <script>
        var lang = <?php echo json_encode(trans('annotation'));?>;
        </script>
    @endif
@stop
