<?php
use Illuminate\Support\Facades\Lang;

    $countryName = trans('country')[strtoupper($country)];
    $params = Request::all();
    $params['country'] = $country;
    $params['resource'] = '';
    $params['download'] = true;
?>
@extends('layout.app-full')

@section('content')
    <div class="row">
        <div class="attached-top-wrapper panel-top-wrapper attached-top-wrapper">
            <div class="panel-top-content">
                <div class="clearfix">
                    <div class="back back-button">Back</div>
                    <div class="panel-title">
                        <img src="{{getFlagUrl($country)}}"/>
                        {{@trans('country')[strtoupper($country)]}}
                        @if(env("CATEGORY")=="rc")
                            @if(!empty(@trans('amla')[strtoupper($country)]))<a href="{{@trans('amla')[strtoupper($country)]}}" class="country-amla-link">AMLA</a>@endif
                        @endif
                    </div>
                </div>
            </div>

            <div class="filter-wrapper">
                <div class="col-lg-12">
                    <div class="filter-country-wrap">
                        <form action="{{url('search')}}" method="GET" class="search-form filter-form">
                            <div class="form-group">
                                <button type="submit" class="btn btn-filter-search pull-left"></button>
                                <input type="text" name="q" class="form-control pull-left"
                                       placeholder="@lang('countriespage.find_contract' , ['tag' => $countryName])">

                                <input type="hidden" name="country" value="{{$country}}"/>
                            </div>
                        </form>
                    </div>

                    <div class="download-csv">
                        <a href="{{route('contract.metadata.download',$params)}}">@lang('global.download')</a>
                    </div>

                </div>
            </div>
            <div class="contract-number-wrap">
                <span>{{$contracts->total}}</span> {{ Lang::choice('global.documents', $contracts->total) }}
            </div>

        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 country-detail-wrapper">
            <div class="col-md-8 col-lg-8">
                <div class="panel panel-default panel-wrap country-contract-wrap">

                    <div class="panel-heading">@lang('countriespage.contracts_in') {{@trans('country')[strtoupper($country)]}}</div>
                    <div class="panel-body">
                        @include('contract.partials.rccontractlist')
                        @include('contract.partials.pagination', ['total_item' => $contracts->total, 'per_page'=>$contracts->per_page, 'current_page' => $currentPage ])
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-lg-4">
                <div class="panel panel-default panel-wrap country-resource-wrap">
                    <div class="panel-heading">@lang('countriespage.resources_in')  {{@trans('country')[strtoupper($country)]}}
                    </div>
                    <div class="panel-body">
                        <ul>
                            @foreach($resources as $resource)
                                <li>
                                    <span><a href="{{route("search")}}?q=&country%5B%5D={{$country}}&resource%5B%5D={{urlencode($resource->resource)}}">{{_l("resources",$resource->resource)}}</a></span>
                                    <span class="count pull-right">{{$resource->contract}}</span>
                                </li>
                            @endforeach
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>

@section('js')
    <script>
        {{--var lang = <?php echo json_encode(trans('annotation'));?>;--}}

        function isScrolledTo(elem) {
            var docViewTop = $(window).scrollTop(); //num of pixels hidden above current screen
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top; //num of pixels above the elem
            var elemBottom = elemTop + $(elem).height();

            return ((elemTop <= docViewTop));
        }

        var catcher = $('.contract-detail-wrapper');
        var sticky = $('.annotation-category-cluster');

        $(document).on("ready scroll", onScroll);
        $('.annotation-category-cluster a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('.annotation-category-cluster ul li a').removeClass('active');
            $(this).addClass('active');

            var target = this.hash,
                    $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top + 2
            }, 600, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });


        function onScroll() {
            var scrollPos = $(document).scrollTop();

            $('.annotation-category-cluster ul li a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
                    $('.annotation-category-cluster ul li a').removeClass("active");
                    currLink.addClass("active");
                    return false;
                }
                else if ($($('.annotation-category-cluster ul li a').eq(0).attr('href')).offset().top > scrollPos) {
                    $('.annotation-category-cluster ul li a').removeClass("active").eq(0).addClass("active");
                }
            });

            if (isScrolledTo(sticky)) {
                sticky.css({'position': 'fixed', 'left': '36px', 'top': '20px'});
            }
            var stopHeight = catcher.offset().top + catcher.height() + 240;
            if (stopHeight > sticky.offset().top) {
                sticky.css({'position': 'absolute', 'left': 0, 'top': 0});
            }
        }


        var isScrolledIntoView = function (elem) {
            var $elem = $(elem);
            var $window = $(window);

            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();

            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        };

        $(window).on('scroll', function () {
            $('.annotation-category-cluster').toggle(!isScrolledIntoView('footer'));
        });
    </script>
@stop
