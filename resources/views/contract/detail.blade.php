@extends('layout.app-full')

@section('content')

<div class="row">
    <div class="col-lg-12 panel-top-wrapper">
        <div class="panel-top-content">
            <div class="pull-left">
                <div class="breadcrumb-wrapper">
                    <ul>
                        <li><a href="{{url()}}">Home</a></li>
                        <li><a href="{{route('contracts')}}">Contracts</a></li>
                        <li>{{$contract->metadata->contract_name}}</li>
                    </ul>
                </div>

                <div class="panel-title">
                    {{$contract->metadata->contract_name}}
                </div>
            </div>
            <div class="pull-right action-links">
                <ul>
                    <li class="pull-left"><a href="{{route('contract.pages',['id'=>$contract->metadata->contract_id])}}">View Document</a></li>
                    <li class="pull-left"><a href="#annotation" class="view-annotation">View Annotations</a></li>
                </ul>
            </div>
        </div>
        <div class="filter-wrapper actions-wrapper">
            <div class="col-lg-12">
                <div class="view-main-pin-wrap">
                    <div class="view-pin-wrap">
                        <span>View Pins</span>
                    </div>
                    <ul id="pinList" class="dropdown-menu">
                    </ul>
                    <div id="no-pin-message"></div>
                </div>
                <div class="download-main-wrap">
                    <div class="download-wrap">
                        <span>Download</span>
                    </div>

                    <ul class="dropdown-menu">
                        <li><a href="{{_e($contract->metadata, 'file_url')}}">Pdf</a></li>
                        @if(_e($contract->metadata, 'word_file') !='')
                            <li><a href="{{_e($contract->metadata, 'word_file')}}">Word File</a></li>
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
                            <span>{{ucfirst(_e($contract->metadata->country,'name','-'))}}</span>
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
                            <span>{{_e($contract->metadata->document_type,'document_type','-')}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <label for="">Type of Contract</label>
                            <span>{{_e($contract->metadata,'contract_type','-')}}</span>
                        </li>
                        <li>
                            <label for="">Translation from Original</label>
                            <span>{{_e($contract->metadata,'translation_parent','-')}}</span>
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
                                    Not Available
                                @endforelse
                        </ul>
                        <div class="no-data">Not Available</div>
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
                        <span>{{_e($company,'open_corporate_id','-')}}</span>
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
                Associated Contracts
            </div>
            <div class="panel-body panel-table">
                <div class="no-data">There are no contracts associated</div>
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
                                <td>
                                    There are no contracts associated.
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
                        <span>@if(!empty(_e($contract->metadata,'source_url')))<a href="{{$contract->metadata->source_url}}">Link</a>@endif</span>
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
</div>
<div class="row annotation-list-wrapper" id="annotation">
    <div class="col-lg-12">
        <div class="panel panel-default panel-wrap panel-annotation-list-wrap">
            <div class="panel-heading">Annotations</div>
            <div class="panel-body">

                @foreach($contract->annotationsGroup as $category=>$annotations)
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
                @endforeach

            </div>
        </div>
    </div>
</div>
@stop

@section('js')
    <script src="{{ url('js/annotation/lib/underscore.js') }}"></script>
    <script src="{{ url('js/annotation/lib/backbone.js') }}"></script>
    <script src="{{ url('js/annotation/lib/backbone.localstorage.js') }}"></script>
    <script src="{{ url('js/annotation/lib/backbone.exportcsv.js') }}"></script>

    <script src="{{ url('js/annotation/custom/rc.pinning.js') }}"></script>

    <script type="text/template" id="pin-template">
        <li><a href="#"><%= pintext %></a></li>
    </script>
    <script type="text/javascript">
    //pinning module
    var contractEvents = {};
    _.extend(contractEvents, Backbone.Events);
    var pinCollection = new PinCollection();

    pinCollection.fetch({reset: true});
    console.log("contract pins",pinCollection.byContract("16"));
    //var contractPins = pinCollection.byContract("16");
    var pinListView = new PinListView({
        el: '#pinList',
        collection: pinCollection,
        eventsPipe: contractEvents
    });
    </script>
@stop