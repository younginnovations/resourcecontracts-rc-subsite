@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper search-top-wrapper">
            <div class="panel-top-content">
                <div class="pull-left">
                    <div class="panel-title">
                        <?php
                        $q = \Illuminate\Support\Facades\Input::get('q');
                        ?>
                        @lang('global.search_results')
                        <div id="search_query" style="font-weight: normal; display: inline"> @if($q)for @endif <span>{{$q}}</span></div>
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
            @if($contracts->total!=0)
                <div class="social-share">
                    <ul>
                        <li class="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u={{ url() }}" target="_blank">FB</a></li>
                        <li class="google-plus"><a href="https://plus.google.com/share?url={{ url() }}" target="_blank">G+</a></li>
                        <li class="twitter"><a href="https://twitter.com/share?text={{ meta($meta)->title }}" target="_blank">T</a></li>
                    </ul>
                </div>
                <div class="download-csv"><a href="{{route('contract.csv.download',$params)}}">@lang('search.download')</a></div>
            @endif

        </div>
        <div class="contract-number-wrap contract-search-number-wrap">
            <span>{{$contracts->total}}</span> {{ \Illuminate\Support\Facades\Lang::choice('global.documents' , $contracts->total) }}
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 country-list-wrapper search-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-body">
                    @include('contract.partials.contractlist')
                    @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
                </div>
            </div>
        </div>
    </div>
@stop

@section('js')
    <script>
        var lang = <?php echo json_encode(trans('annotation'));?>;
        var contractURL = '{{url('contract')}}';
        $(function () {
            $('.filter-country-wrap').show();
        })
    </script>
@stop
