<strong>{{$document['contract_name']}}</strong>
<table>
    <tr>
        <td>Contract Identifier</td>
        <td>{{$document['contract_identifier']}}</td>
    </tr>
    <tr>
        <td>Language</td>
        <td>{{$document['language']}}</td>
    </tr>

    <tr>
        <td>Country</td>
        <td>{{$document['country']}}</td>
    </tr>
    <tr>
        <td>Government Entity</td>
        <td>{{$document['government_entity']}}</td>
    </tr>
    <tr>
        <td>Government Identifier</td>
        <td>{{$document['government_identifier']}}</td>
    </tr>
    <tr>
        <td>Type of Contract</td>
        <td>{{$document['type_of_contract']}}</td>
    </tr>
    <tr>
        <td>Signature Date</td>
        <td>{{$document['signature_date']}}</td>
    </tr>
    <tr>
        <td>Document Type</td>
        <td>{{$document['document_type']}}</td>
    </tr>
    <tr>
        <td>Translation from original</td>
        <td>{{$document['translation_parent']}}</td>
    </tr>



</table>
<strong>Company</strong>
<table>
    <tr>
        <td>Company Name</td>
        <td>{{$document['company']['name']}}</td>
    </tr>
    <tr>
        <td>Jurisdiction of Incorporation</td>
        <td>{{$document['company']['jurisdiction_of_incorporation']}}</td>
    </tr>
    <tr>
        <td>Registration Agency</td>
        <td>{{$document['company']['registration_agency']}}</td>
    </tr>
    <tr>
        <td>Company Address</td>
        <td>{{$document['company']['company_address']}}</td>
    </tr>

    <tr>
        <td>Identifier at company register</td>
        <td>{{$document['company']['comp_id']}}</td>
    </tr>
    <tr>
        <td>Parent Company</td>
        <td>{{$document['company']['parent_company']}}</td>
    </tr>
    <tr>
        <td>Open Corporate Id</td>
        <td>{{$document['company']['open_corporate_id']}}</td>
    </tr>
</table>

<br>
Annotations
<br>
@foreach($annotations as $anote)
    page: {{$anote['no']}}<br>
    Text: {{$anote['text']}}<br>
    Quote: {{$anote['quote']}}<br>
    Tag: {{implode(",",$anote['tag'])}}<br>
    <br>
@endforeach