@extends("layout.app")

@section('content')
    @include('layout.partials.search')
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="contract-name pull-left">
                {{$document['metadata']['contract_name']}}
                <div class="contract-actions">
                    <a target="_blank"
                       href="{{ isset($document['metadata']['file_url']) ? $document['metadata']['file_url'] : ''}}"
                       class="download">Download
                        <span class="size">{{getFileSize($document['metadata']['file_size'])}}
                    </a>
                    @if($annotations)
                        <div class="contract-annotations">
                            <a href="" class="view-annotations open-annotations">View Annotations</a>
                            <a href="" class="view-annotations close-annotations">Close Annotations</a>
                        </div>
                    @endif
                </div>
            </div>
            @if($pages)

                <div class="pull-right">
                    <a href="{{route('contract.pages',['id'=>$document['contract_id']])}}" class="btn btn-view">View
                        Document</a>
                </div>
            @endif
        </div>
        <div class="panel-body">
            <div class="table-contract-view">
                <table class="table table-responsive">
                    <tr>
                        <td>Contract Identifier</td>
                        <td>{{$document['metadata']['contract_identifier']}}</td>
                    </tr>
                    <tr>
                        <td>Language</td>
                        <td>{{$document['metadata']['language']}}</td>
                    </tr>

                    <tr>
                        <td>Country</td>
                        <td>{{$document['metadata']['country']['name']}}
                            @if(isset($document['metadata']['amla_url']) and !empty($document['metadata']['amla_url']))
                                <a href="{{$document['metadata']['amla_url']}}">Current mining legislation at AMLA</a>
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td>Government Entity</td>
                        <td>{{$document['metadata']['government_entity']}}</td>
                    </tr>
                    <tr>
                        <td>Government Identifier</td>
                        <td>{{$document['metadata']['government_identifier']}}</td>
                    </tr>
                    <tr>
                        <td>Type of Contract</td>
                        <td>{{$document['metadata']['type_of_contract']}}</td>
                    </tr>
                    <tr>
                        <td>Signature Date</td>
                        <td>{{$document['metadata']['signature_date']}}</td>
                    </tr>
                    <tr>
                        <td>Document Type</td>
                        <td>{{$document['metadata']['document_type']}}</td>
                    </tr>
                    <tr>
                        <td>Translation from original</td>
                        <td>{{$document['metadata']['translation_parent']}}</td>
                    </tr>
                    @if(isset($document['metadata']['participation_share']))
                        <tr>
                            <td>Participation Share</td>
                            <td>{{$document['metadata']['participation_share']}}</td>
                        </tr>
                    @endif
                </table>
                <h3>Company</h3>
                @foreach($document['metadata']['company'] as $company)

                    <table class="table table-responsive">
                        <tr>
                            <td>Company Name</td>
                            <td>{{$company['name']}}</td>
                        </tr>
                        <tr>
                            <td>Jurisdiction of Incorporation</td>
                            <?php $jurisdiction=isset($company['jurisdiction_of_incorporation'])?$jurisdiction =$company['jurisdiction_of_incorporation']:'';   ?>
                                @if(!empty($jurisdiction))
                                <td>{{trans('country')[$jurisdiction]}}</td>
                                 @endif

                        </tr>
                        <tr>
                            <td>Registration Agency</td>
                            <td>{{$company['registration_agency']}}</td>
                        </tr>
                        <tr>
                            <td>Company Address</td>
                            <td>{{$company['company_address']}}</td>
                        </tr>

                        <tr>
                            <td> Company Number</td>
                            <td>@if(isset($company['company_number'])){{$company['company_number']}}@endif</td>
                        </tr>
                        <tr>
                            <td>Parent Company</td>
                            <td>{{$company['parent_company']}}</td>
                        </tr>
                        <tr>
                            <td>Open Corporate Id</td>
                            <td>{{$company['open_corporate_id']}}</td>
                        </tr>
                    </table>
                @endforeach
                <h3>Concession / license and Project</h3>
                <table class="table table-responsive">
                    <tr>
                        <td>License Name</td>
                        <td>{{$document['metadata']['license_name']}}</td>
                    </tr>
                    <tr>
                        <td>License Identifier</td>
                        <td>{{$document['metadata']['license_identifier']}}</td>
                    </tr>
                    <tr>
                        <td>Project Title</td>
                        <td>{{$document['metadata']['project_title']}}</td>
                    </tr>
                    <tr>
                        <td>Project Identifier</td>
                        <td>{{$document['metadata']['project_identifier']}}</td>
                    </tr>

                </table>
                <h3>Source</h3>
                <table class="table table-responsive">
                    <tr>
                        <td>Source URL</td>
                        <td>@if(isset($document['metadata']['source_url'])){{$document['metadata']['source_url']}}@endif</td>
                    </tr>
                    @if(isset($document['metadata']['disclosure_mode']))
                        <tr>
                            <td>Disclosure Mode</td>
                            <td>{{$document['metadata']['disclosure_mode']}}</td>
                        </tr>
                    @endif
                </table>
            </div>
        </div>
        <div class="annotation-pop">
            <ul>
                @foreach($annotations as $anote)
                    <li>
                        <div class="pull-left page-num">{{$anote['page_no']}}</div>
                        <div class="pull-left">
                            <div class="annotation-text">{{$anote['text']}}</div>
                            <div class="quote">{{$anote['quote']}}</div>
                            <div class="tags">
                                @foreach($anote['tag'] as $tag)
                                    <span>{{$tag}}</span>
                                @endforeach
                            </div>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@endsection
