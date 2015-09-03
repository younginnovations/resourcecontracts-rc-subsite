<?php
if (!isset($summary)) {
    $api     = app('App\Http\Services\APIService');
    $summary = $api->summary();
}
?>

<div id="sidebar-wrapper" class="sidebar-collapse in">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            @if(env("CATEGORY")=="rc")
                <a href="{{url()}}">Resource <span>Contracts</span></a>
            @else
                <a href="{{url()}}">OPENLAND <span>Contracts</span></a>
            @endif

        </li>
        <li class="contracts active">
            <a href="{{url('contracts')}}">
                <span>All Contracts</span>

                <small class="label pull-right">{{$summary->contract_count}}</small>
            </a>
        </li>
        <li class="countries">
            <label>Countries</label>
            <ul>
                @foreach(array_slice($summary->country_summary, 0, 10, true) as $country)
                    <li>
                        <a href="{{route('country.detail', ['key'=>$country->key])}}">
                            <span>{{trans('country.'.strtoupper($country->key))}}</span>
                            <small class="label pull-right">{{$country->doc_count}}</small>
                        </a>
                    </li>
                @endforeach
                @if(count($summary->country_summary)>10)
                <li><a  href="{{route('countries')}}">View all</a></li>
                @endif
            </ul>
        </li>
        <li class="year">
            <label>Year</label>
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
        <li class="resources">
            <label>Resources</label>
            <ul>
                @foreach(array_slice($summary->resource_summary,0,10,true) as $resource)
                    <li>
                        <a href="{{route('resource.detail', ['key'=>$resource->key])}}">
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
    </ul>
</div>