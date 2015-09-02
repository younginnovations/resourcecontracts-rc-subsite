<?php
if (!isset($summary)) {
    $api     = app('App\Http\Services\APIService');
    $summary = $api->summary();
}
?>

<div id="sidebar-wrapper" class="sidebar-collapse in">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            <a href="{{url()}}">Resource <span>Contracts</span></a>
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
                <li><a  href="{{route('countries')}}">View all</a></li>
            </ul>
        </li>
        <li class="year">
            <label>Year</label>
            <ul>
                @foreach($summary->year_summary as $year)
                    <li>
                        <a href="{{route('contracts')}}?year={{$year->key}}">
                            <span>{{$year->key}}</span>
                            <small class="label pull-right">{{$year->doc_count}}</small>
                        </a>
                    </li>
                @endforeach

            </ul>
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
                    <li><a href="{{route('resources')}}">View all</a></li>
            </ul>
        </li>
    </ul>
</div>