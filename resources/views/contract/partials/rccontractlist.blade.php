<table class="table table-responsive table-contract">
    <tbody>

    @forelse($contracts->results as $contract)
        <?php
        $api     = app('App\Http\Services\APIService');
        $annotations = $api->getAnnotations($contract->contract_id);

        ?>
        <tr>
            <td>
                <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                    {{ $contract->contract_name or ''}}
                </a>
                @if($annotations->total>0)
                    <div class="annotate-text"> Annotated </div>
                @endif
                <p class="country_name">- {{trans('country.'.strtoupper($contract->country_code))}}</p>
                <div class="resource-contract-list">
                    <div class="resource-type">
                        <label for="">Resources: </label>
                        @foreach($contract->resource as $resource)
                            {{$resource}}
                        @endforeach
                    </div>
                    <div class="contract-type">
                        <label for="">Contract Type:</label>
                        {{$contract->contract_type}}
                    </div>
                </div>
            </td>
            <td class="contract-date">{{$contract->signature_date}}</td>

        </tr>
    @empty
        <tr>
            <td colspan="2">{{'Contract result not found.'}}</td>
        </tr>
    @endforelse
    </tbody>
</table>