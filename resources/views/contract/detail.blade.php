@extends('layout.app-full')
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
                    <li class="pull-left"><a href="#">View Document</a></li>
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
                            <span>{{$contract->metadata->signature_year}}</span>
                        </li>
                        <li>
                            <label for="">Document Type</label>
                            <span>Contract</span>
                        </li>
                        <li>
                            <label for="">Type of Contract</label>
                            <span>Exploration Permit/License</span>
                        </li>
                        <li>
                            <label for="">Translation from Original</label>
                            <span>-</span>
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
                            <li><a href="#">General information</a></li>
                            <li><a href="">Country</a></li>
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
            <div class="panel-body panel-col3-wrap">
                <ul>
                    <li>
                        <label for="">Company Name</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">Jurisdiction of Incorporation</label>
                        <span>Kenya</span>
                    </li>
                    <li>
                        <label for="">Registration Agency</label>
                        <span>Kenya</span>
                    </li>
                    <li>
                        <label for="">Company Address</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">Company Number</label>
                        <span>2</span>
                    </li>
                    <li>
                        <label for="">Parent Company</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">Open Corporate ID</label>
                        <span>-</span>
                    </li>
                </ul>
            </div>
            <div class="panel-body panel-col3-wrap">
                <ul>
                    <li>
                        <label for="">Company Name</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">Jurisdiction of Incorporation</label>
                        <span>Kenya</span>
                    </li>
                    <li>
                        <label for="">Registration Agency</label>
                        <span>Kenya</span>
                    </li>
                    <li>
                        <label for="">Company Address</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">Company Number</label>
                        <span>2</span>
                    </li>
                    <li>
                        <label for="">Parent Company</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">Open Corporate ID</label>
                        <span>-</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-lg-12">
        <div class="panel panel-default panel-wrap panel-contract-wrap">
            <div class="panel-heading">
                Associated Contracts
            </div>
            <div class="panel-body panel-table">
                <table class="table table-responsive table-contract table-associated-contract">
                    <tbody>
                    <tr>
                        <td width="70%">
                            <a href="http://192.168.1.60:8000/contract/129">
                                Iraqi Kurdistan Akri-Bijeel-Block  Kalegran LTD PSC
                            </a> - Iraq, 2007
                            <span class="label label-default">EN</span>
                        </td>
                        <td align="right">10.37 MB</td>
                        <td align="right">June 30, 2015</td>
                    </tr>
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
                        <label for="">License Name</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">License Identifier</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">Project Title</label>
                        <span>-</span>
                    </li>
                    <li>
                        <label for="">Project Identifier</label>
                        <span>-</span>
                    </li>
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
                        <span>xxx</span>
                    </li>
                    <li>
                        <label for="">Disclosure</label>
                        <span>corporate</span>
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



    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="contract-name pull-left">
                <div class="contract-name-title">{{$contract->metadata->contract_name}}</div>
                <div class="contract-actions pull-left">
                   <div class="btn-group">
                       <button type="button" class=" download btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           Download <span class="caret"></span>
                       </button>
                       <ul class="dropdown-menu">
                           <li><a target="_blank"
                              href="{{ $contract->metadata->file_url}}"
                              class="download">PDF
                            <span class="size">{{getFileSize($contract->metadata->file_size)}}</span>
                           </a></li>
                           <li>
                               @if(isset($contract->metadata->word_file))
                               <a target="_blank"
                                   href="{{ $contract->metadata->word_file}}"
                                   class="download">Word
                               </a>
                               @endif
                           </li>
                       </ul>
                   </div>
                    @if($contract->annotations->total > 0 )
                        <div class="contract-annotations">
                            <a href="" class="view-annotations open-annotations">View Annotations</a>
                            <a href="" class="view-annotations close-annotations">Close Annotations</a>
                        </div>
                    @endif
                </div>
                <div class="amla-link pull-left">
                    @if(isset($contract->metadata->amla_url) and $contract->metadata->amla_url !='' )
                        <a href="{{$contract->metadata->amla_url}}">Current mining legislation at AMLA</a>
                    @endif
                </div>
            </div>

            @if($contract->metadata->total_pages > 0)

                <div class="pull-right">
                    <a href="{{route('contract.pages',['id'=>$contract->metadata->contract_id])}}" class="btn btn-view">View
                        Document</a>
                </div>
            @endif
        </div>
        <div class="panel-body">
            <div class="table-contract-view">
                <table class="table table-responsive">
                    <tr>
                        <td>Contract Identifier</td>
                        <td>{{$contract->metadata->contract_identifier or ''}}</td>
                    </tr>
                    <tr>
                        <td>Language</td>
                        <td>{{$contract->metadata->language or ''}}</td>
                    </tr>

                    <tr>
                        <td>Country</td>
                        <td>{{$contract->metadata->country->name or ''}}

                        </td>
                    </tr>
                    <tr>
                        <td>Government Entity</td>
                        <td>{{$contract->metadata->government_entity or ''}}</td>
                    </tr>
                    <tr>
                        <td>Government Identifier</td>
                        <td>{{$contract->metadata->government_identifier or ''}}</td>
                    </tr>
                    <tr>
                        <td>Type of Contract</td>
                        <td>{{$contract->metadata->type_of_contract or ''}}</td>
                    </tr>
                    <tr>
                        <td>Signature Date</td>
                        <td>{{$contract->metadata->signature_date or ''}}</td>
                    </tr>
                    <tr>
                        <td>Document Type</td>
                        <td>{{$contract->metadata->document_type or ''}}</td>
                    </tr>
                    <tr>
                        <td>Translation from original</td>
                        <td>{{$contract->metadata->translation_parent or ''}}</td>
                    </tr>

                </table>
                <h3>Company</h3>
                @foreach($contract->metadata->company as $company)

                    <table class="table table-responsive">
                        <tr>
                            <td>Company Name</td>
                            <td>{{$company->name or ''}}</td>
                        </tr>
                        @if(isset($company->participation_share))
                            <tr>
                                <td>Participation Share</td>
                                <td>{{$company->participation_share or ''}}</td>
                            </tr>
                        @endif
                        <tr>
                            <td>Jurisdiction of Incorporation</td>
                            <?php $jurisdiction=isset($company->jurisdiction_of_incorporation)?$company->jurisdiction_of_incorporation:'';   ?>
                                @if(!empty($jurisdiction))
                                <td>{{trans('country')[$jurisdiction]}}</td>
                                 @endif

                        </tr>
                        <tr>
                            <td>Registration Agency</td>
                            <td>{{$company->registration_agency or ''}}</td>
                        </tr>
                        <tr>
                            <td>Company Address</td>
                            <td>{{$company->company_address or ''}}</td>
                        </tr>

                        <tr>
                            <td> Company Number</td>
                            <td>{{$company->company_number or ''}}</td>
                        </tr>
                        <tr>
                            <td>Parent Company</td>
                            <td>{{$company->parent_company or ''}}</td>
                        </tr>
                        <tr>
                            <td>Open Corporate Id</td>
                            <td>{{$company->open_corporate_id or ''}}</td>
                        </tr>
                        @if(isset($company->operator))
                            <tr>
                                <td>Operator</td>
                                <td>@if($company->operator==1) Yes @else No @endif</td>
                            </tr>
                        @endif
                    </table>
                @endforeach
                <h3>Concession / license and Project</h3>
                <table class="table table-responsive">
                    @if(isset($contract->metadata->concession))
                        @foreach($contract->metadata->concession as $concession)
                        <tr>
                            <td>License Name</td>
                            <td>{{$concession->license_name}}</td>
                        </tr>
                        <tr>
                            <td>License Identifier</td>
                            <td>{{$concession->license_identifier}}</td>
                        </tr>
                        <tr>
                        @endforeach
                    @endif
                        <td>Project Title</td>
                        <td>{{$contract->metadata->project_title or ''}}</td>
                    </tr>
                    <tr>
                        <td>Project Identifier</td>
                        <td>{{$contract->metadata->project_identifier or ''}}</td>
                    </tr>

                </table>
                <h3>Source</h3>
                <table class="table table-responsive">
                    <tr>
                        <td>Source URL</td>
                        <td>{{$contract->metadata->source_url or ''}}</td>
                    </tr>

                        <tr>
                            <td>Disclosure Mode</td>
                            <td>{{$contract->metadata->disclosure_mode or ''}}</td>
                        </tr>
                </table>
            </div>
        </div>
        @if($contract->annotations->total >0))
        <div class="annotation-pop">
            <ul>
                @foreach($contract->annotations->result as $annotation)
                    <li>
                        <div class="pull-left page-num">{{$annotation->page_no}}</div>
                        <div class="pull-lefct">
                            <div class="annotation-text">{{$annotation->text}}</div>
                            <div class="quote">{{$annotation->quote}}</div>
                            <div class="tags">
                                @foreach($annotation->tags as $tag)
                                    <span>{{$tag}}</span>
                                @endforeach
                            </div>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
        @endif

    </div>
