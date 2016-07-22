@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="col-lg-12 panel-top-wrapper search-top-wrapper attached-top-wrapper">
            <div class="panel-top-content">
                <div class="clearfix">
                    <div class="back back-button">Back</div>

                    <div class="panel-title">
                        <?php
                        $q = \Illuminate\Support\Facades\Input::get('q');
                        $params = Request::all();
                        $showSearchQ=showSearchQuery($params,$filter);
                        ?>
                        @if($showSearchQ)
                                <div id="search_query" class="isolate" style="font-weight: normal; display: inline;">@lang('global.all_documents')</div>
                        @else
                                @lang('global.search_results')
                        <div id="search_query" style="font-weight: normal; display: inline"> @if($q)for @endif <span>{{$q}}</span></div>
                        @endif

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row relative--small-screen">
        <div class="filter-wrapper advance-filter-wrapper" style="min-height: 135px">
            @if(!$showSearchQ)
            <div class="col-lg-12 static-search">
                <div class="filter-country-wrap " style="display: none">
                    @include('layout.partials.search', ['searchPage' => true])
                </div>
            </div>
           @endif
            <?php
            $params['download'] = true;
            ?>
            @if($contracts->total!=0)
                <div class="social-share" id="social-toggler">
                    <a href="#"><span>@lang('contract.social_share')</span></a>
                    <ul class="social-toggle">
                        <li class="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u={{ url() }}" target="_blank">Facebook</a></li>
                        <li class="google-plus"><a href="https://plus.google.com/share?url={{ url() }}" target="_blank">Google</a></li>
                        <li class="twitter"><a href="https://twitter.com/share?text={{ meta($meta)->title }}" target="_blank">Twitter</a></li>
                    </ul>
                </div>
                <div class="download-csv">
                    <span data-toggle="popover"  class="tooltiptext" data-content="@lang('hovertext.download_hover')" style="display: inline;">
                        <a href="{{route('contract.csv.download',$params)}}">
                            @lang('search.download')
                        </a>
                    </span>
                </div>
            @endif

        </div>
        @if(!$showSearchQ)
            <div class="contract-number-wrap contract-search-number-wrap has-static-search">
                <span>{{$contracts->total}}</span> {{ \Illuminate\Support\Facades\Lang::choice('global.documents' , $contracts->total) }}
            </div>
            @else
            <div class="contract-number-wrap contract-search-number-wrap">
                <span>{{$contracts->total}}</span> {{ \Illuminate\Support\Facades\Lang::choice('global.documents' , $contracts->total) }}
            </div>
        @endif

    </div>

    <div class="row">
        <div class="col-lg-12 country-list-wrapper search-list-wrapper">
            <div class="panel panel-default panel-wrap country-list-wrap">
                <div class="panel-body">
                    @include('contract.partials.contractlist')
                    @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage,'contracts' => $contracts ])
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
        });
    </script>
    <script>
        var options = {
            placement: function (context, source) {
                var position = $(source).position();

                if (position.left > 515) {
                    return "left";
                }

                if (position.left < 515) {
                    return "right";
                }

                if (position.top < 110) {
                    return "bottom";
                }

                return "top";
            },
            trigger: "click hover"

        };
        var popup = $(".tooltiptext");
        if (popup.length) {
            popup.popover(options);
        }
    </script>
@stop
