@extends('layout.app-full')

@section('css')
    <style>
        .pin-list{
            position: absolute;
            z-index: 1;
            background: #fff;
            padding: 15px;
            width: 350px;
            font-size: 13px;
            text-transform: initial;
            border: 1px solid #DADADA;}
        .pin-list p {
            margin-bottom: 10px;
            border-bottom: 1px solid #ECECEC;
            padding-bottom: 10px;
            margin-top: 10px;
        }
    </style>
    @stop

@section('content')
<div class="row">
    <div class="col-lg-12 panel-top-wrapper">
        <div class="panel-top-content">
            <div class="pull-left">
                <div class="breadcrumb-wrapper">
                    <ul>
                        <li><a href="{{url()}}">Home</a></li>
                        <li><a href="{{route('contracts')}}">Contracts</a></li>
                        <li>{{str_limit($contract->metadata->contract_name, 100)}}</li>
                    </ul>
                </div>

                <div class="panel-title">
                    {{$contract->metadata->contract_name}}
                </div>
            </div>
            <div class="pull-right action-links">
                <ul>
                    @if($contract->pages->total>0)<li class="pull-left"><a href="{{route('contract.text',['id'=>$contract->metadata->contract_id])}}">View Document</a></li>@endif
                </ul>
            </div>
        </div>
        <div class="filter-wrapper actions-wrapper">
            <div class="col-lg-12">
                <div class="view-main-pin-wrap">
                    <div class="view-pin-wrap">
                        <span>View Pins</span>
                    </div>
                    <div id="pinLists" style="display: none"></div>
                </div>
                <div class="download-main-wrap">
                    <div class="download-wrap">
                        <span>Download</span>
                    </div>

                    <ul class="dropdown-menu">
                        <li><a href="{{_e($contract->metadata, 'file_url')}}" target="_blank">Pdf</a></li>
                        @if(_e($contract->metadata, 'word_file') !='')
                            <li><a href="{{route('contract.download',['id'=> $contract->metadata->contract_id])}}" target="_blank">Word File</a></li>
                        @endif
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row contract-detail-wrapper">
    <div class="col-lg-12">
        <div class="col-lg-6">
            <div class="panel panel-default panel-wrap panel-contract-wrap">
                <div class="panel-body">
                    <ul>
                        <li>
                            <label for="">Language</label>
                            <span>{{strtoupper(_e($contract->metadata,'language','-'))}}</span>
                        </li>
                        <li>
                            <label for="">Country</label>
                            <span>{{ucfirst(_e($contract->metadata->country,'name','-'))}}
                                @if(isset($contract->metadata->amla_url) && !empty($contract->metadata->amla_url))<a href="{{$contract->metadata->amla_url}}" class="amla-link" target="_blank">AMLA</a>@endif</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <label for="">Government Entity</label>
                            <span>{{_e($contract->metadata,'government_entity','-')}}</span>
                        </li>
                        <li>
                            <label for="">Government Identifier</label>
                            <span>{{_e($contract->metadata,'government_identifier','-')}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <label for="">Signature Date</label>
                            <?php
                                $date = $contract->metadata->signature_date;
                                $date = strtotime($date);
                            ?>
                            <span>{{date('F',$date)}} {{date('d',$date)}}, {{date('Y',$date)}}</span>
                        </li>
                        <li>
                            <label for="">Document Type</label>
                            <span>{{_e($contract->metadata,'document_type','-')}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <label for="">Type of Contract</label>
                            <span>{{_e($contract->metadata,'type_of_contract','-')}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="panel panel-default panel-wrap panel-annotation-wrap">
                <div class="panel-body">
                    <div class="annotation-block">
                        <div class="title">Annotations</div>
                        <ul>
                              <?php $i=0; ?>
                               @forelse($contract->annotationsGroup as $category=>$annotation)
                                        @if($i < 5 )
                                            <li><a>{{str_limit($category,32)}}</a></li>
                                        <?php $i++; ?>
                                        @endif
                                @empty
                                    <div class="no-data">Not Available</div>
                                @endforelse
                        </ul>
                    </div>
                    <div class="view-all-annotations">
                        <a href="#annotation" class="view-annotation">View all Annotations</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="panel panel-default panel-wrap panel-contract-wrap">
            <div class="panel-heading">
                Company
            </div>
            @foreach($contract->metadata->company as $company)
            <div class="panel-body panel-col3-wrap">
                <ul>
                    <li>
                        <label for="">Company Name</label>
                        <span>{{_e($company,'name','-')}}</span>
                    </li>
                    <li>
                        <label for="">Jurisdiction of Incorporation</label>
                        <span>{{_e($company,'jurisdiction_of_incorporation','-')}}</span>
                    </li>
                    <li>
                        <label for="">Registration Agency</label>
                        <span>{{_e($company,'registration_agency','-')}}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <label for="">Company Address</label>
                        <span>{{_e($company,'company_address','-')}}</span>
                    </li>
                    <li>
                        <label for="">Company Number</label>
                        <span>{{_e($company,'company_number','-')}}</span>
                    </li>
                    <li>
                        <label for="">Parent Company</label>
                        <span>{{_e($company,'parent_company','-')}}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <label for="">Open Corporate ID</label>
                        <span>@if(isset($company->open_corporate_id) && !empty($company->open_corporate_id))<a href="{{$company->open_corporate_id}}">{{str_limit($company->open_corporate_id,25)}}</a> @else - @endif</span>
                    </li>
                    <li>
                        <label for="">Participation Share</label>
                        <span>{{_e($company,'participation_share','-')}}</span>
                    </li>
                    <li>
                        <label for="">Operator</label>
                        <span>{{_e($company,'operator','-')}}</span>
                    </li>
                </ul>
            </div>
            @endforeach
        </div>
    </div>

    <div class="col-lg-12">
        <div class="panel panel-default panel-wrap panel-contract-wrap">
            <div class="panel-heading">
                Associated Documents
            </div>
            <div class="panel-body panel-table">
                <div class="panel-sub-heading">Parent Document</div>
                <table class="table table-responsive table-contract table-associated-contract">
                    <tbody>
                    <?php $parentContract = _e($contract->metadata, 'parent_document', []);?>


                    @if(!empty($parentContract[0]))
                        <?php $parentContract = $parentContract[0];?>
                        <tr>
                            <td width="70%">
                                @if($parentContract->status=="published")
                                    <a href="{{route('contract.detail',['id'=>$parentContract->id])}}">{{$parentContract->contract_name}}</a>
                                @else
                                    {{$parentContract->contract_name}}
                                @endif
                            </td>
                        </tr>
                    @else
                        <tr>
                            <td class="no-data">
                                There is no parent contract.
                            </td>
                        </tr>
                    @endif
                    </tbody>
                </table>
            </div>
            <div class="panel-body panel-table">
                <div class="panel-sub-heading">Supporting Documents</div>
                <table class="table table-responsive table-contract table-associated-contract">
                <tbody>
                <?php $supportingContracts = _e($contract->metadata, 'supporting_contracts', []);?>
                @forelse($contract->metadata->supporting_contracts as $supportingContract)
                    <tr>
                        <td width="70%">
                            @if($supportingContract->status=="published")
                                <a href="{{route('contract.detail',['id'=>$supportingContract->id])}}">{{$supportingContract->contract_name}}</a>
                            @else
                                {{json_decode($supportingContract->contract_name)}}
                            @endif
                        </td>

                    </tr>
                @empty
                    <tr>
                        <td class="no-data">
                            There are no supporting contracts associated.
                        </td>
                    </tr>
                @endforelse
                </tbody>
            </table>
            </div>
        </div>
    </div>

    <div class="col-lg-12">
        <div class="panel panel-default panel-wrap panel-contract-wrap">
            <div class="panel-heading">
                CONCESSION / LICENSE AND PROJECT
            </div>
            <div class="panel-body">
                <ul>
                    <li>
                        <label for="">Project Title</label>
                        <span>{{_e($contract->metadata,'project_title','-')}}</span>
                    </li>
                    <li>
                        <label for="">Project Identifier</label>
                        <span>{{_e($contract->metadata,'project_identifier','-')}}</span>
                    </li>
                    <?php
                        $concessions = _e($contract->metadata,'concession', []);
                    ?>
                    @foreach($concessions as $concession)
                        <li>
                            <label for="">License Name</label>
                            <span>{{_e($concession,'license_name','-')}}</span>
                        </li>
                        <li>
                            <label for="">License Identifier</label>
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
                Source
            </div>
            <div class="panel-body">
                <ul>
                    <li>
                        <label for="">Source URL</label>
                        <span>@if(!empty(_e($contract->metadata,'source_url')))<a href="{{$contract->metadata->source_url}}" target="_blank">{{str_limit($contract->metadata->source_url,50)}}</a>@endif</span>
                    </li>
                    <li>
                        <label for="">Disclosure Mode</label>
                        <span>{{_e($contract->metadata,'disclosure_mode','-')}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="row annotation-list-wrapper" id="annotation">
    <div class="col-lg-12">
        <div class="panel panel-default panel-wrap panel-annotation-list-wrap">
            <div class="panel-heading">Annotations</div>
            <div class="panel-body">

                @forelse($contract->annotationsGroup as $category=>$annotations)
                    <div class="category-wrap">
                        <div class="category-title">
                            {{$category}}
                        </div>
                        <ul>
                            @foreach($annotations as $annotation)

                                <li>
                                    <div class="page-num pull-left">Pg {{_e($annotation,'page_no')}}</div>
                                    <div class="pull-left">
                                        <div class="annotation-text">{{_e($annotation,'text')}}</div>
                                        <div class="quote">{{_e($annotation,'quote')}}</div>
                                        <div class="tags">
                                            @foreach($annotation->tags as $tag)
                                                <a href="{{route('contract.pages',['id'=>$contract->metadata->contract_id,'page'=>$annotation->page_no])}}">{{$tag}}</a>
                                            @endforeach
                                        </div>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @empty
                    <div class="category-wrap">
                        <ul>
                            <li>Not Available</li>
                        </ul>
                    </div>
                @endforelse

            </div>
        </div>
    </div>
</div>
@stop

@section('js')
    <script src="{{ url('js/lib/underscore.js') }}"></script>
    <script src="{{ url('js/lib/backbone.js') }}"></script>
    <script src="{{ url('js/lib/backbone.localstorage.js') }}"></script>
    <script src="{{ url('js/lib/backbone.exportcsv.js') }}"></script>
    
    <script src="{{ url('js/custom/rc.pinning.js') }}"></script>

    <script type="text/template" id="pin-list-template">
    <div id="pinList" class="pin-list">
        <div class="pull-right pin-buttons">
            <div id="no-pin-message"></div>
        </div>
    </div>
    </script>
    <script type="text/template" id="pin-template">
        <p><%= pintext %></p>
    </script>
    <script type="text/javascript">
    //pinning module
    var contractEvents = {};
    _.extend(contractEvents, Backbone.Events);
    var pinCollection = new PinCollection();

    pinCollection.fetch({reset: true});
    //console.log("contract pins",pinCollection.byContract("16"));
    //var contractPins = pinCollection.byContract("16");
    var pinListView = new PinListView({
        el: '#pinLists',
        collection: pinCollection,
        eventsPipe: contractEvents
    }).render();
    var pinButtonView = new PinButtonView({
        el: '.view-pin-wrap',
        collection: pinCollection,
        pinListView: pinListView,
        eventsPipe: contractEvents
    }).render();    
    </script>
@stop