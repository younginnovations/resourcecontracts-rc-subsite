<?php
if (!isset($summary)) {
    $api     = app('App\Http\Services\APIService');
    $summary = $api->sortSummaryCountry();
}
?>

<div id="sidebar-wrapper" class="sidebar-collapse in">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            @if(env("CATEGORY")=="rc")
                <a href="{{url()}}">Resource <span class="beta">Beta</span><span>Contracts</span></a>
            @else
                <a href="{{url()}}">OPENLAND <span class="beta">Beta</span><span>Contracts</span></a>
            @endif

        </li>
        <li class="contracts">
            <a href="{{url('contracts')}}">
                <span>@lang('sidebar.all_contracts')</span>

                <small class="label pull-right">{{$summary->contract_count}}</small>
            </a>
        </li>
        <li class="countries">
            <label>@lang('global.countries')</label>
            <ul>
                @foreach(array_slice($summary->country_summary, 0, 10, true) as $country)

                    <li>
                        <a href="{{route('country.detail', ['key'=>urlencode($country['key'])])}}">
                            <span>{{$country['name']}}</span>
                            <small class="label pull-right">{{$country['doc_count']}}</small>
                        </a>
                    </li>
                @endforeach
                @if(count($summary->country_summary)>10)
                <li><a  href="{{route('countries')}}">View all</a></li>
                @endif
            </ul>
        </li>
        <li class="resources">
            <label>@lang('global.resources')</label>
            <ul>
                @foreach(array_slice($summary->resource_summary,0,10,true) as $resource)
                    <li>
                        <a href="{{route('resource.detail', ['key'=>urlencode($resource->key)])}}">
                            <span>{{ucfirst($resource->key)}}</span>
                            <small class="label pull-right">{{$resource->doc_count}}</small>
                        </a>
                    </li>
                @endforeach
                @if(count($summary->resource_summary)>10)
                    <li><a href="{{route('resources')}}">View all</a></li>
                @endif
            </ul>
        </li>
        <li class="year">
            <label>@lang('global.year')</label>
            <ul>
                @foreach(array_slice($summary->year_summary, 0, 10, true) as $year)
                    <li>
                        <a href="{{route('contracts')}}?year={{$year->key}}">
                            <span>{{trans($year->key)}}</span>
                            <small class="label pull-right">{{$year->doc_count}}</small>
                        </a>
                    </li>
                @endforeach
            </ul>

            @if(count($summary->year_summary)>10)
                <ul id="year-more" style="display: none">
                    @foreach(array_slice($summary->year_summary, 10, null, true) as $year)
                        <li>
                            <a href="{{route('contracts')}}?year={{$year->key}}">
                                <span>{{$year->key}}</span>
                                <small class="label pull-right">{{$year->doc_count}}</small>
                            </a>
                        </li>
                    @endforeach
                </ul>
            @endif

            @if(count($summary->year_summary)>10)
                <div><a href="#year-more" class="toggle-all">More</a></div>
            @endif
        </li>

    </ul>
</div>