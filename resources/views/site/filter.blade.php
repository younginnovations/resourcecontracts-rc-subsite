@extends('layout.app-full')

@section('content')

    <div class="row">
        <div class="col-lg-12 panel-top-wrapper search-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="panel-title">
                        Search results for <span>{{\Illuminate\Support\Facades\Input::get('q')}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="filter-wrapper">
            <div class="col-lg-12">
                <div class="filter-country-wrap">
                  @include('layout.partials.search', ['searchPage' => true])
              </div>
            </div>
        </div>
        <div class="contract-number-wrap contract-search-number-wrap">
            <span>{{$contracts->total}}</span> @if($contracts->total > 1)contracts @else Contract @endif
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 country-list-wrapper search-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-body">
                    <table class="table table-responsive table-contract">
                        <tbody>
                        @forelse($contracts->results as $contract)
                            <?php
                            $api = app('App\Http\Services\APIService');
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
                                    <div class="search-text">
                                        {!!$contract->text or ''!!}
                                        {!!$contract->annotations or ''!!}
                                        {!!$contract->metadata or ''!!}
                                      </div>
                                    @if(isset($contract->group) && count($contract->group)>0)
                                        <div class="contract-group">
                                            <label for="">Found in: </label>
                                            @foreach($contract->group as $group)
                                                <a>{{$group}}</a>
                                            @endforeach
                                        </div>
                                    @endif

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
                                                <?php $annotation_type = isset($annotation['shapes']) ? 'pdf' : 'text'; ?>
                                                {{str_limit($category,50)}}-<span
                                                        style="color: #404040;">{{str_limit($annotation['text'],50)}}</span>
                                                <a style="float: none" href="{{route('contract.detail',['id'=>$contract->contract_id])}}#/{{$annotation_type}}/page/{{$annotation['page_no']}}/annotation/{{$annotation['id']}}">
                                                    [Pg {{$annotation['page_no']}}]</a>
                                                <br>
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
                                @if($contract->country !='')
                                    <td>{{$contract->signature_year}}</td>
                                    <td>
                                        {{@trans('country')[$contract->country]}}
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
                    @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
                </div>
            </div>
        </div>
    </div>

@stop
