<div id="sidebar-wrapper">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            <a href="#">Resource <span>Contracts</span></a>
        </li>
        <li class="contracts active">
            <a href="#">
                <span>All Contracts</span>
                <small class="label pull-right">{{$summary['contract_count']}}</small>
            </a>
        </li>
        <li class="countries">
            <label for="">Countries</label>
                <ul>
                    @foreach($summary['country_summary'] as $country)
                    <li>
                        <a href="{{route('filter')}}?country={{$country['key']}}">
                            <span>{{ucfirst($country['key'])}}</span>
                            <small class="label pull-right">{{$country['doc_count']}}</small>
                        </a>
                    </li>
                     @endforeach
                </ul>
           
            <div class="load-more">
                <a href="#" class="load-more">See all countries</a>
            </div>
        </li>
        <li class="year">
            <label for="">Year</label>
                <ul>
                    @foreach($summary['year_summary'] as $year)
                    <li>
                        <a href="{{route('filter')}}?year={{$year['key']}}">
                            <span>{{$year['key']}}</span>
                            <small class="label pull-right">{{$year['doc_count']}}</small>
                        </a>
                    </li>
                     @endforeach
                </ul>
        </li>
        <li class="resources">
            <label for="">Resources</label>
              <ul>
                    @foreach($summary['resource_summary'] as $resource)
                    <li>
                        <a href="{{route('filter')}}?resource={{$resource['key']}}">
                            <span>{{$resource['key']}}</span>
                            <small class="label pull-right">{{$resource['doc_count']}}</small>
                        </a>
                    </li>
                     @endforeach
                </ul>
            {{--<div class="load-more">--}}
                {{--<a href="#" class="load-more">See all resources</a>--}}
            {{--</div>--}}
        </li>
    </ul>
</div>
