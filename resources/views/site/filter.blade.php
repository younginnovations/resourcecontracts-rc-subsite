@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper search-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="panel-title">
                        <?php
                            $q=\Illuminate\Support\Facades\Input::get('q');
                        ?>
                        Search results @if($q)for @endif <span>{{$q}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="filter-wrapper advance-filter-wrapper" style="min-height: 135px">
            <div class="col-lg-12">
                <div class="filter-country-wrap" style="display: none">
                  @include('layout.partials.search', ['searchPage' => true])
              </div>
            </div>
            <?php
                $params = Request::all();
                $params['download'] = true;
            ?>
                <div class="download-csv"><a href="{{route('contract.csv.download',$params)}}">Download search results as csv</a></div>

        </div>
        <div class="contract-number-wrap contract-search-number-wrap">
            <span>{{$contracts->total}}</span> @if($contracts->total == 1)contract @else Contracts @endif
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 country-list-wrapper search-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-body">
                    <div style="display: none" id="compare-block">
                        <h2>Compare</h2>
                        <ul>
                        </ul>
                        <button class="btn btn-compare">Compare</button>
                    </div>

                    @include('contract.partials.contractlist')
                    @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
                </div>
            </div>
        </div>
    </div>
@stop

@section('js')
    <script src="{{url('js/jquery.cookie.js')}}"></script>
    <script>
    var contractURL = '{{url('contract')}}';
        $(function(){
            $('.filter-country-wrap').show();
        })
    </script>
    <script src="{{url('js/compare.js')}}"></script>
@stop
