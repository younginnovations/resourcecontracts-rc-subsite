@extends("layout.app")

@section('content')
@include('layout.partials.search') 
 <div class="panel panel-default">
        <div class="panel-heading">
        	<div class="contract-name pull-left">
        		{{$document['metadata']['contract_name']}}
                <div class="contract-actions">
                    <a href="" class="download">Download<span class="size">(1.24mb)</a>
                    <a href="" class="view-annotations open-annotations">View Annotations</a>
                    <a href="" class="view-annotations close-annotations">close Annotations</a>
                </div>
    		</div>
    		<div class="pull-right">
        		<a href="#" class="btn btn-view">View Document</a>
        	</div>
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
                        <td>{{$document['metadata']['country']['name']}}</td>
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
                </table>
                <h3>Company</h3>
                <table class="table table-responsive">
                    <tr>
                        <td>Company Name</td>
                        <td>{{$document['metadata']['company'][0]['name']}}</td>
                    </tr>
                    <tr>
                        <td>Jurisdiction of Incorporation</td>
                        <td>{{$document['metadata']['company'][0]['jurisdiction_of_incorporation']}}</td>
                    </tr>
                    <tr>
                        <td>Registration Agency</td>
                        <td>{{$document['metadata']['company'][0]['registration_agency']}}</td>
                    </tr>
                    <tr>
                        <td>Company Address</td>
                        <td>{{$document['metadata']['company'][0]['company_address']}}</td>
                    </tr>

                    <tr>
                        <td>Identifier at company register</td>
                        <td>{{$document['metadata']['company'][0]['comp_id']}}</td>
                    </tr>
                    <tr>
                        <td>Parent Company</td>
                        <td>{{$document['metadata']['company'][0]['parent_company']}}</td>
                    </tr>
                    <tr>
                        <td>Open Corporate Id</td>
                        <td>{{$document['metadata']['company'][0]['open_corporate_id']}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="annotation-pop">
            <ul>
            @foreach($annotations as $anote)
            <li>
                <div class="pull-left page-num">pg{{$anote['no']}}</div>
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