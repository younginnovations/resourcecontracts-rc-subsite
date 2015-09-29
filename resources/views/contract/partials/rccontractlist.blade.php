<table class="table table-responsive table-contract">
    <thead>
        <th></th>
        <th>Document</th>
        <th>Year</th>
        <th>Resource Type</th>
        <th>Contract Type</th> 
    </thead>
    <tbody>
    @forelse($contracts->results as $contract)
        <?php
        $api     = app('App\Http\Services\APIService');
        $annotations = $api->getAnnotations($contract->contract_id);

        ?>
        <tr>
            <td></td>
            <td>
                <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                    {{ $contract->contract_name or ''}}
                </a>
                @if($annotations->total>0)
                    <div class="annotate-text"> Annotated </div>
                @endif
                <p class="country_name">- {{trans('country.'.strtoupper($contract->country_code))}}</p>
            </td>
            <td class="contract-date">{{$contract->signature_date}}</td>
            <td>
                <ul>
                     @foreach($contract->resource as $resource)
                         <li>{{$resource}}</li>
                     @endforeach
                </ul>
            </td>
            <td>
                {{$contract->contract_type}}
            </td>
        </tr>
    @empty
        <tr>
            <td colspan="2">{{'Contract result not found.'}}</td>
        </tr>
    @endforelse
    </tbody>
</table>