@extends('layout.app-full')
@section('content')
<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.html">Resource <span>Contracts</span></a>
        </div>
        <div class="navbar-right">
            <form action="" method="post" class="search-form">
                <div class="form-group">
                    <button type="submit" class="btn btn-navbar-search pull-left"></button>
                    <input type="text" class="form-control pull-left" placeholder="Search for contracts...">
                </div>
            </form>
        </div>
        <!-- /.navbar-header -->
    </nav>
</div>
<div class="row">
    <div class="col-lg-12 panel-top-wrapper">
        <div class="panel-top-content">
            <div class="pull-left">
                <div class="breadcrumb-wrapper">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Contracts</a></li>
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
                <div class="view-pin-wrap">
                    View Pins
                </div>
                <div class="download-wrap">
                    Download
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
                            <span>{{strtoupper($contract->metadata->language)}}</span>
                        </li>
                        <li>
                            <label for="">Country</label>
                            <span>{{ucfirst($contract->metadata->country->name)}}</span>
                        </li>
                        <li>
                            <label for="">Government Entity</label>
                            <span>{{!empty($contract->metadata->government_entity)?$contract->metadata->government_entity:'-'}}</span>
                        </li>
                        <li>
                            <label for="">Government Identifier</label>
                            <span>{{!empty($contract->metadata->government_identifier)?$contract->metadata->government_identifier:'-'}}</span>
                        </li>
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
                            <span>{{!empty($contract->metadata->document_type)?$contract->metadata->document_type:'-'}}</span>
                        </li>
                        <li>
                            <label for="">Type of Contract</label>
                            <span>{{!empty($contract->metadata->contract_type)?$contract->metadata->contract_type:'-'}}</span>
                        </li>
                        <li>
                            <label for="">Translation from Original</label>
                            <span>{{!empty($contract->metadata->translation_parent)?$contract->metadata->translation_parent:'-'}}</span>
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
                            @foreach($contract->annotations->result as $annotation)
                                <li><a>{{$annotation->category}}</a></li>
                            @endforeach
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
                        <span>{{!empty($company->name)?$company->name:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Jurisdiction of Incorporation</label>
                        <span>{{!empty($company->jurisdiction_of_incorporation)?$company->jurisdiction_of_incorporation:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Registration Agency</label>
                        <span>{{!empty($company->registration_agency)?$company->registration_agency:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Company Address</label>
                        <span>{{!empty($company->company_address)?$company->company_address:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Company Number</label>
                        <span>{{!empty($company->company_number)?$company->company_number:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Parent Company</label>
                        <span>{{!empty($company->parent_company)?$company->parent_company:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Open Corporate ID</label>
                        <span>{{!empty($company->open_corporate_id)?$company->open_corporate_id:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Participation Share</label>
                        <span>{{!empty($company->participation_share)?$company->participation_share:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Operator</label>
                        <span>{{$company->operator==1?$company->operator:'-'}}</span>
                    </li>
                </ul>
            </div>
            @endforeach

    </div>
    <div class="col-lg-12">
        <div class="panel panel-default panel-wrap panel-contract-wrap">
            <div class="panel-heading">
                Associated Contracts
            </div>
            <div class="panel-body panel-table">
                <table class="table table-responsive table-contract table-associated-contract">
                    <tbody>
                    @foreach($contract->metadata->supporting_contracts as $supportingContract)
                        <tr>
                            <td width="70%">
                                @if($supportingContract->status=="published")
                                    <a href="{{route('contract.detail',['id'=>$supportingContract->id])}}">{{$supportingContract->contract_name}}</a>
                                @else
                                    {{json_decode($supportingContract->contract_name)}}
                                @endif
                            </td>

                        </tr>
                    @endforeach
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
                        <span>{{!empty($contract->metadata->project_title)?$contract->metadata->project_title:'-'}}</span>
                    </li>
                    <li>
                        <label for="">Project Identifier</label>
                        <span>{{!empty($contract->metadata->project_identifier)?$contract->metadata->project_identifier:'-'}}</span>
                    </li>
                    @foreach($contract->metadata->concession as $consession)
                    <li>
                        <label for="">License Name</label>
                        <span>{{!empty($consession->license_name)?$consession->license_name:'-'}}</span>
                    </li>
                    <li>
                        <label for="">License Identifier</label>
                        <span>{{!empty($consession->license_identifier)?$consession->license_identifier:'-'}}</span>
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
                        <span><a href="{{!empty($contract->metadata->source_url)?$contract->metadata->source_url:'-'}}">Link</a></span>
                    </li>
                    <li>
                        <label for="">Disclosure Mode</label>
                        <span>{{!empty($contract->metadata->disclosure_mode)?$contract->metadata->disclosure_mode:'-'}}</span>
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
                <div class="category-wrap">
                    <div class="category-title">
                        Country
                    </div>
                    <ul>
                        <li>
                            <div class="page-num pull-left">Pg 1</div>
                            <div class="pull-left">
                                <div class="annotation-text">This integrated circuit was introduced in 1953</div>
                                <div class="quote">How true is this? Somebody verify if this is authetic.</div>
                                <div class="tags">
                                    <a href="#">environment</a>
                                    <a href="#">education</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="page-num pull-left">Pg 1</div>
                            <div class="pull-left">
                                <div class="annotation-text">This integrated circuit was introduced in 1953</div>
                                <div class="quote">How true is this? Somebody verify if this is authetic.</div>
                                <div class="tags">
                                    <a href="#">environment</a>
                                    <a href="#">education</a>
                                </div>
                                <div class="note">
                                    <em>in associated document</em>
                                    <span>SOCAR, BP, ELF, Lukoil, OIES, Statoil, TPAO &hellip;</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="category-wrap">
                    <div class="category-title">
                        General Information
                    </div>
                    <ul>
                        <li>
                            <div class="page-num pull-left">Pg 1</div>
                            <div class="pull-left">
                                <div class="annotation-text">This integrated circuit was introduced in 1953</div>
                                <div class="quote">How true is this? Somebody verify if this is authetic.</div>
                                <div class="tags">
                                    <a href="#">environment</a>
                                    <a href="#">education</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@stop