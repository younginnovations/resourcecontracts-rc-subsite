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
                                <td width="70%">
                                     <a href="{{route('contract.detail',['id'=>$contract->contract_id ])}}">
                                            {{ $contract->contract_name or ''}}
                                     </a>
                                    <span class="label label-default">{{strtoupper($contract->language)}}</span>

                                    @if($contract->country !='')
                                    - {{@trans('country')[$contract->country]}}
                                    @endif

                                    <div class="search-text">
                                        {!!$contract->text or ''!!}
                                        {!!$contract->annotations or ''!!}
                                        {!!$contract->metadata or ''!!}
                                    </div>
                                </td>
                                <td>{{$contract->signature_year}}</td>
                                <td align="right">{{getFileSize($contract->contract_type)}}</td>
                                <td align="right">
                                    @foreach($contract->resource as $resource)
                                        {{$resource}}
                                    @endforeach
                                </td>
                                @if(isset($contract->group))
                                    <td align="right">
                                        @foreach($contract->group as $group)
                                            <a>{{$group}}</a>
                                        @endforeach
                                    </td>
                                @endif
                                @if($annotations->total>0)
                                    <td align="right"> Annotated </td>
                                @endif
                            </tr>
                        @empty
                            <tr>
                                <td colspan="2">{{'Search result not found.'}}</td>
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
