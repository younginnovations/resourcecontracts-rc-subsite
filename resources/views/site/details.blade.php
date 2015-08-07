@extends("layout.app")

@section('content')
    @include('layout.partials.search')
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
                               <a target="_blank"
                                   href="{{ $contract->metadata->word_file}}"
                                   class="download">Word
                               </a>
                           </li>
                       </ul>
                   </div>

                    @if($contract->annotations)
                        <div class="contract-annotations">
                            <a href="" class="view-annotations open-annotations">View Annotations</a>
                            <a href="" class="view-annotations close-annotations">Close Annotations</a>
                        </div>
                    @endif
                </div>
                <div class="amla-link pull-left">
                    @if($contract->metadata->amla_url !='')
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
                    @if($contract->metadata->concession)
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
                    @if($contract->metadata->disclosure_mode)
                        <tr>
                            <td>Disclosure Mode</td>
                            <td>{{$contract->metadata->disclosure_mode or ''}}</td>
                        </tr>
                    @endif
                </table>
            </div>
        </div>
        @if(!is_null($annotations ))
        <div class="annotation-pop">
            <ul>
                @foreach($annotations->result as $annotation)
                    <li>
                        <div class="pull-left page-num">{{$annotation->page_no}}</div>
                        <div class="pull-left">
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
@endsection
