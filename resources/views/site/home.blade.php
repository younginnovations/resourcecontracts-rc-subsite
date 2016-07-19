<?php
use \Illuminate\Support\Facades\Lang as Lang;
?>
@extends('layout.app-full')

@section('css')
    @if(!empty($image))
        <style xmlns="http://www.w3.org/1999/html">m
            /*.hero-image {
                background-image: url({{$image}});
            }*/
        </style>
    @endif
@stop
@section('content')
    <?php $local = app('App\Http\Services\LocalizationService');
    ?>
    @if(config('localisation'))
        <div class="dropdown language-selector" >
            <button class="btn  dropdown-toggle"  data-toggle="dropdown" id="dropdownMenu2" aria-expanded="false">
                <img style="width: 16px ; height: 16px; margin-right: 6px;" src="{{getCountryByLang(app('translator')->getLocale())}}"/>{{config('language')[app('translator')->getLocale()]['name']}}
                <span class="caret"></span>
            </button>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style="min-width: 110px;">

                @foreach (config('language') as $locale => $language)
                    @if(app('translator')->getLocale()!=$locale)
                        <li>
                            <a href={{ url(Request::url().'?lang='.$locale)}}>
                                <img style="width: 16px ; height: 16px; margin-right: 6px;" src="{{getCountryByLang($locale)}}"/>
                                {{$language['name']}}
                            </a>
                        </li>
                    @endif
                @endforeach

            </ul>
        </div>
    @endif
    <div class="row front-row-top-wrap">
        <div class="bigger-block">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse"
                          data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
                    @if(env("CATEGORY")=="rc")
                        <a class="navbar-brand" href="{{url()}}">Resource <span
                                    class="beta">Beta</span><span>Contracts</span></a>
                    @else
                        <a class="navbar-brand" href="{{url()}}">OPENLAND <span
                                    class="beta">Beta</span><span>Contracts</span></a>
                    @endif
                </div>
            </nav>
        </div>
    </div>

    <section class="hero-image">
        <div class="petroleum-wrapper">
            <div class="section-wrap">
            <div class="petroleum-mineral">
                @if(env("CATEGORY")=="rc")
                    <p class="repo-description">@lang('global.a_repository_of')</p>
                    <div class="large-title"><span>@lang('global.petroleum_&')</span> @lang('global.mineral_contracts')</div>
                @else
                    <p class="repo-description">@lang('global.an_online_repository_of')</p>
                    <div class="large-title olc-title"><span>@lang('global.open_land_contracts')</span></div>
                @endif
                <div class="clearfix">
                    <form  action="{{route('search')}}" method="GET" class="search-form" role="search">
                        <div class="form-group clearfix">
                            <input type="text" name="q" class="form-control" placeholder= " @lang('global.search') {{$contracts}} @lang('global.associated_documents')">
                            <button type="submit" class="btn btn-default search-button">@lang('global.search')</button>
                        </div>
                    </form>
                    <div class="advance-search">
                        <a href="search">@lang('global.advanced_search')</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
          {{--  placeholder= "@lang('global.search') {{$contracts}} {{ Lang::choice('global.contracts' , $contracts) }} @if(env('CATEGORY') != 'olc') @lang('global.associated_documents')
--}}
            <div class="petroleum-list">
                <div class="col-md-12 col-sm-12 col-xs-12 text-center petroleum-list-inner">
                    <div class="row">
                        <div class="col-md-4 col-sm-4 col-xs-4 petroleum-list-each">
                            <h2 class="petroleum-list-title">1052</h2>
                            <small>documents</small>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-4 petroleum-list-each">
                            <h2 class="petroleum-list-title">72</h2>
                            <small>countries</small>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-4">
                            <h2 class="petroleum-list-title">41</h2>
                            <small>resources</small>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="list-item-wrap">
                    <div class="inner-list-item">
                        <label class="group-item-title">Explore contract terms:</label>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <a href="#">Arbitration and dispute resolution</a>
                            </li>
                            <li class="list-group-item">
                                <a href="#">Environmental impact assessment</a>
                            </li>
                            <li class="list-group-item">
                                <a href="#">Income tax: exemptions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

    </section>
    <section class="img-intro">
        <div class="img-intro-text">
            <p>The site applies extensive machine based processing of each PDF contract added to the site in order to it searchable and enable download as text based document. <a href="about">Learn More</a>
            </p>
        </div>
    </section>
    <section class="explore-contracts">
        <div class="wrapper map-wrapper">
            <h2 class="heading2">Explore Contracts</h2>
            <div id="map" class="map-wrap"></div>
            {{--<img src="img/map.png" class="img-responsive map">
            <img src="img/ic-zoom.png" class="img-responsive zooming">--}}
        </div>
    </section>

    <section class="country-partners">
        <div class="container wrapper country-partners-wrapper">
            <h2 class="heading2">Country Partners</h2>
            <div class="col-md-12 col-sm-12">
                <div class="countrypartner">
                    <div class="slider autoplay">
                        <div class="multiple"><img src="./images/img-countrypartner-1.png"></div>
                        <div class="multiple"><img src="./images/img-countrypartner-2.png"></div>
                        <div class="multiple"><img src="./images/img-countrypartner-3.png"></div>
                        <div class="multiple"><h3>4</h3></div>
                        <div class="multiple"><h3>5</h3></div>
                        <div class="multiple"><h3>6</h3></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@stop
