<table class="table table-responsive table-contract table-contract-list">
    <thead>
        <th></th>
        <th width="50%">Document</th>
        <th></th>
        <th width="20%">Country</th>
        <th>Year</th>
        <th width="15%">Resource Type</th>
        <th width="15%">Contract Type</th> 
    </thead>
    <tbody>
    @forelse($contracts->results as $contract)
        <?php
        $api = app('App\Http\Services\APIService');
        $annotations = $api->getAnnotations($contract->contract_id);
        ?>
        <tr>
            <td></td>
            <td>
                @if(isset($show_advanc))<input type="checkbox" class="compare" name="compare[]" value="{{$contract->contract_id}}" />@endif
                <a class="title-{{$contract->contract_id}}" href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                    {{ $contract->contract_name or ''}}
                </a>

                @if($annotations->total>0)
                    <div class="annotate-text"> Annotated </div>
                @endif

                <div class="search-text">
                    @if(isset($contract->text ) && $contract->text !='')
                        <p>{!!$contract->text.'...'!!}</p>
                    @endif

                    @if(isset($contract->annotations ) && $contract->annotations !='')
                        <p>{!!$contract->annotations.'...'!!}</p>
                    @endif

                    @if(isset($contract->metadata ) && $contract->metadata !='')
                            <p>{!! $contract->metadata.'...' !!}</p>
                    @endif
                </div>
                @if($annotations->total>0)
                    @if(\Illuminate\Support\Facades\Input::has('annotation_category'))
                        <?php $annotation_categories = \Illuminate\Support\Facades\Input::get(
                                'annotation_category'
                        )?>
                        @foreach($annotation_categories as $category)
                            <?php
                            $annotation = searchInArray(
                                    $annotations->result,
                                    'category',
                                    $category
                            );
                            ?>
                            @if($annotation)
                                <?php $annotation_type = isset($annotation['shapes']) ? 'pdf' : 'text'; ?>
                                {{str_limit($category,50)}}-<span
                                        style="color: #404040;">{{str_limit($annotation['text'],50)}}</span>
                                <a style="float: none" href="{{route('contract.detail',['id'=>$contract->contract_id])}}#/{{$annotation_type}}/page/{{$annotation['page_no']}}/annotation/{{$annotation['id']}}">
                                    [Pg {{$annotation['page_no']}}]</a>
                                <br>
                            @endif
                        @endforeach

                    @endif
                @endif
                @if(isset($contract->group) && count($contract->group)>0)
                    <div class="contract-group">
                        <label for="">Found in: </label>
                        @foreach($contract->group as $group)
                            <a>{{$group}}</a>
                        @endforeach
                    </div>
                @endif
            </td>
            <td>
                <div class="contract-info-section">
                    <div class="download-main-wrap">
                        <div class="download-wrap">
                            <span>Download</span>
                        </div>
                        <ul class="dropdown-menu">
                            <li><a href="{{route('contract.download.pdf',['id'=> $contract->contract_id])}}" >Pdf</a></li>
                            @if(env('CATEGORY')!="olc")
                                <li><a href="{{route('contract.download',['id'=> $contract->contract_id])}}" >Word File</a></li>
                            @endif
                        </ul>
                    </div>
                </div>
            </td>
            @if($contract->country_code !='')
                <td>
                    <img style="width: 24px ; height: auto" src="{{getFlagUrl($contract->country_code)}}" />
                    <span class="country-name-title">{{@trans('country')[$contract->country_code]}}</span>
                </td>
            @else
                <td></td>
            @endif
            @if($contract->signature_year !='')
                <td>{{$contract->signature_year}}</td>
            @else
                <td></td>
            @endif
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
            <td colspan="2" class="search-not-found">{{'Search result not found.'}}</td>
        </tr>
    @endforelse
    </tbody>
</table>