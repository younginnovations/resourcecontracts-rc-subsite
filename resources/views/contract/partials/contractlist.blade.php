<table class="table table-responsive table-contract table-contract-list">
    <tbody>
    @forelse($contracts->results as $contract)
        <?php
        $api = app('App\Http\Services\APIService');
        $annotations = $api->getAnnotations($contract->contract_id);
        ?>
        <tr>
            <td>
                @if(isset($show_advance))<input type="checkbox" class="compare" name="compare[]" value="{{$contract->contract_id}}" />@endif
                <a class="title-{{$contract->contract_id}}" href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                    {{ $contract->contract_name or ''}}
                </a>

                @if($annotations->total>0)
                    <div class="annotate-text"> Annotated </div>
                @endif

                <div class="search-text">
                    {!!$contract->text or ''!!}
                    {!!$contract->annotations or ''!!}
                    {!!$contract->metadata or ''!!}
                </div>
                <div class="contract-info-section">
                    <div class="download-main-wrap">
                        <div class="download-wrap">
                            <span>Download</span>
                        </div>
                        <ul class="dropdown-menu">
                            <li><a href="{{route('contract.download.pdf',['id'=> $contract->contract_id])}}" >Pdf</a></li>
                            <li><a href="{{route('contract.download',['id'=> $contract->contract_id])}}" >Word File</a></li>
                        </ul>
                    </div>
                    @if(isset($contract->group) && count($contract->group)>0)
                        <div class="contract-group">
                            <label for="">Found in: </label>
                            @foreach($contract->group as $group)
                                <a>{{$group}}</a>
                            @endforeach
                        </div>
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
                <div class="resource-contract-list">
                    <div class="resource-type">
                        <label for="">Resource: </label>
                        @foreach($contract->resource as $resource)
                            {{$resource}}
                        @endforeach
                    </div>
                    <div class="contract-type">
                        <label for="">Contract Type:</label>{{$contract->contract_type}}
                    </div>
                </div>
            </td>

            @if($contract->country_code !='')
                <td>{{$contract->signature_year}}</td>
                <td>
                    {{@trans('country')[$contract->country_code]}}
                </td>
            @endif
        </tr>
    @empty
        <tr>
            <td colspan="2" class="search-not-found">{{'Search result not found.'}}</td>
        </tr>
    @endforelse
    </tbody>
</table>