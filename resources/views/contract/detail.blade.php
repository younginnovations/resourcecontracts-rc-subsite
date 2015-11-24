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
                            <li>{{str_limit($contract->metadata->contract_name, 100)}}</li>
                        </ul>
                    </div>

                    <div class="panel-title contract-panel-title">
                    {{$contract->metadata->contract_name}}
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
                            <li><a href="{{_e($contract->metadata, 'file_url')}}" target="_blank">Pdf</a></li>
                            @if(_e($contract->metadata, 'word_file') !='' && env('CATEGORY')!="olc")
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
                                            @if(isset($contract->metadata->amla_url) && !empty($contract->metadata->amla_url))
                                                <span class="amla-link">See <a href="{{$contract->metadata->amla_url}}"
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
                                        @if(isset($governmentEntity->entity) && isset($governmentEntity->identifier) && !empty($governmentEntity->entity))
                                                {{$governmentEntity->entity}} @if($governmentEntity->identifier)
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
                                $date = $contract->metadata->signature_date;
                                $date = strtotime($date);
                                ?>
                                <span>@if($date){{date('F',$date)}} {{date('d',$date)}}, {{date('Y',$date)}}@else
                                        - @endif</span>
                            </li>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.document_type')</label>
                                <span>{{_e($contract->metadata,'document_type','-')}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.type_contract')</label>
                                <span>@if(isset($contract->metadata->type_of_contract) && !empty($contract->metadata->type_of_contract))
                                        <a href="{{route("search",['contract_type'=>$contract->metadata->type_of_contract])}}">{{_e($contract->metadata,'type_of_contract','-')}}</a>@else
                                        - @endif</span>
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
                        <ul>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.note')</label>
                                <span>@if(isset($contract->metadata->contract_note) && !empty($contract->metadata->contract_note))
                                    {{ $contract->metadata->contract_note }}
                                    @else
                                        - @endif</span>
                            </li>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('global.land_matrix_id')</label>
                                <span>@if(isset($contract->metadata->matrix_page) && isset($contract->metadata->deal_no) && !empty($contract->metadata->matrix_page) && !empty($contract->metadata->deal_no))
                                        <a href="{{ $contract->metadata->matrix_page }}">#{{$contract->metadata->deal_no}}</a>
                                    @else
                                        - @endif</span>
                            </li>

                        </ul>

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
        <div class="col-lg-12">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-heading">
                @lang('contract.company')
            </div>
                @foreach($contract->metadata->company as $company)
                    <div class="panel-body panel-col3-wrap">
                        <ul>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.company_name')</label>
                                <span>@if(isset($company->name) && !empty($company->name)) <a
                                            href="{{route("search",['company_name'=>$company->name])}}">{{$company->name}} </a> @else
                                        - @endif</span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.jurisdiction')</label>
                        <span>
                        <?php $ji = _e($company, 'jurisdiction_of_incorporation', null);?>
                            @if(!is_null($ji))
                                {{trans('country')[strtoupper($ji)]}}
                            @else
                                -
                            @endif
                        </span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.registration_agency')</label>
                                <span>{{_e($company,'registration_agency','-')}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.company_add')</label>
                                <span>{{_e($company,'company_address','-')}}</span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.company_number')</label>
                                <span>{{_e($company,'company_number','-')}}</span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.corporate_grouping')</label>
                                <span>@if(isset($company->parent_company) && !empty($company->parent_company)) <a
                                            href="{{route("search",['corporate_group'=>$company->parent_company])}}">{{$company->parent_company}} </a> @else
                                        - @endif                          </span>
                            </li>
                        </ul>
                        <ul>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.open_corporate_ID')</label>
                                <span>@if(isset($company->open_corporate_id) && !empty($company->open_corporate_id))<a
                                            href="{{$company->open_corporate_id}}">{{str_limit($company->open_corporate_id,25)}}</a> @else
                                        - @endif</span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.share')</label>
                                <span>
                                    <?php
                                    $ps = _e($company,'participation_share','');
                                    echo ($ps =='') ? '-' : $ps*100 .'%';
                                    ?>
                                    </span>
                            </li>
                            <li class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <label for="">@lang('contract.operator')</label>
                        <span>@if(isset($company->operator))
                                @if($company->operator==1)
                                    Yes
                                @elseif($company->operator==0)
                                    No
                                @else
                                    -
                                @endif
                            @endif

                        </span>
                            </li>
                        </ul>
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
                            @foreach($contract->metadata->parent_document as $parentContract)

                                <td width="70%">
                                    @if($parentContract->status=="published")
                                        <a href="{{route('contract.detail',['id'=>$parentContract->open_contracting_id])}}">{{$parentContract->contract_name}}</a> &nbsp; (parent)
                                    @else
                                        {{$parentContract->contract_name}} (parent)
                                    @endif
                                </td>
                            @endforeach
                        </tr>
                        <?php $supportingContracts = _e($contract->metadata, 'supporting_contracts', []);?>
                        @foreach($contract->metadata->supporting_contracts as $supportingContract)
                            <tr>
                                <td width="70%">
                                    @if($supportingContract->status=="published")
                                        <a href="{{route('contract.detail',['id'=>$supportingContract->id])}}"> {{$supportingContract->contract_name}}</a>
                                    @endif
                                </td>

                            </tr>
                        @endforeach

                        @if(empty($contract->metadata->parent_document) && empty($contract->metadata->supporting_contracts))
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

        <div class="col-lg-12">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-heading">
                @lang('contract.concession')
            </div>
                <div class="panel-body">
                    <ul>
                        <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <label for="">@lang('contract.project_title')</label>
                            <span>{{_e($contract->metadata,'project_title','-')}}</span>
                        </li>
                        <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <label for="">@lang('contract.project_identifier')</label>
                            <span>{{_e($contract->metadata,'project_identifier','-')}}</span>
                        </li>
                    </ul>
                    <ul>
                        <?php
                        $concessions = _e($contract->metadata, 'concession', []);
                        ?>
                        @foreach($concessions as $concession)
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('contract.license_name')</label>
                                <span>{{_e($concession,'license_name','-')}}</span>
                            </li>
                            <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <label for="">@lang('contract.license_identifier')</label>
                                <span>{{_e($concession,'license_identifier','-')}}</span>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-heading">
                @lang('contract.source')
            </div>
                <div class="panel-body">
                    <ul>
                        <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <label for="">@lang('contract.source_url')</label>
                            <span>@if(!empty(_e($contract->metadata,'source_url')))<a
                                        href="{{$contract->metadata->source_url}}"
                                        target="_blank">{{str_limit($contract->metadata->source_url,50)}}</a>@else
                                    -@endif</span>
                        </li>
                        <li class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <label for="">@lang('contract.disclosure_mode')</label>
                            <span>{{_e($contract->metadata,'disclosure_mode','-')}}</span>
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
