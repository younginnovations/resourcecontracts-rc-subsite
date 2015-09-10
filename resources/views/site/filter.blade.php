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
                  @include('layout.partials.search')
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
                            $api     = app('App\Http\Services\APIService');
                            $annotations = $api->getAnnotations($contract->contract_id);

                            ?>
                            <tr>
                                <td>
                                     <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                                            {{ $contract->contract_name or ''}}
                                     </a>  
                                      <div class="search-text">
                                        {!!$contract->text or ''!!}
                                        {!!$contract->annotations or ''!!}
                                        {!!$contract->metadata or ''!!}
                                    </div>      
                                    <div class="contract-type">{{$contract->contract_type}}</div>                          
                                    <ul>
                                    @if($contract->country !='')
                                    <li>
                                    {{@trans('country')[$contract->country]}}
                                    </li>
                                    @endif
                                     @if($annotations->total>0)
                                    <li class="annotate-text"> Annotated </li>
                                    @endif
                                    <li>{{$contract->signature_year}}</li>
                                   </ul>
                                    
                                </td>
                                <td>
                                  <span class="label label-default">{{strtoupper($contract->language)}}</span>
                                </td>
                                <td>
                                    @foreach($contract->resource as $resource)
                                        {{$resource}}
                                    @endforeach
                                </td>

                                @if(isset($contract->group))
                                    <td>
                                        @foreach($contract->group as $group)
                                            <a>{{$group}}</a>
                                        @endforeach
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
