<div id="sidebar-wrapper">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            <a href="#">Resource <span>Contracts</span></a>
        </li>
        <li class="contracts active">
            <a href="#">
                <span>All Contracts</span>
                <small class="label pull-right">367</small>
            </a>
        </li>
        <li class="countries">
            <label for="">Countries</label>
                <ul>
                    @foreach($summary['country_summary'] as $country=>$value)
                    <li>
                        <a href="#">
                            <span>{{$country}}</span>
                            <small class="label pull-right">{{$value}}</small>
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
                    @foreach($summary['year_summary'] as $year=>$value)
                    <li>
                        <a href="#">
                            <span>{{$year}}</span>
                            <small class="label pull-right">{{$value}}</small>
                        </a>
                    </li>
                     @endforeach
                </ul>
        </li>
        <li class="resources">
            <label for="">Resources</label>
              <ul>
                    @foreach($summary['resource_summary'] as $resource=>$value)
                    <li>
                        <a href="#">
                            <span>{{$resource}}</span>
                            <small class="label pull-right">{{$value}}</small>
                        </a>
                    </li>
                     @endforeach
                </ul>
            <div class="load-more">
                <a href="#" class="load-more">See all resources</a>
            </div>
        </li>
    </ul>
</div>
