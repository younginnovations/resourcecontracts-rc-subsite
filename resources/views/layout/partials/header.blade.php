<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <span data-toggle="collapse-side" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
            <a class="navbar-brand" href="index.html" >Resource <span>Contracts</span></a>
        </div>
        <div class="navbar-right">
            <form action="{{url('search')}}" method="get" class="search-form">
                <div class="form-group">
                    <button type="submit" class="btn btn-navbar-search pull-left"></button>
                    <input type="text" value="{{\Illuminate\Support\Facades\Input::get('q')}}" name="q" class="form-control pull-left" placeholder="Search for contracts...">
                </div>
            </form>
        </div>
    </nav>
</div>



<div id="sidebar-wrapper" class="sidebar-collapse in">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            <a href="http://rc-site-demo.elasticbeanstalk.com/site/public">Resource <span>Contracts</span></a>
        </li>
        <li class="contracts active">
            <a href="http://rc-site-demo.elasticbeanstalk.com/site/public">
                <span>All Contracts</span>
                <small class="label pull-right">6</small>
            </a>
        </li>
        <li class="countries">
            <label for="">Countries</label>
            <ul>
                <li>
                    <a href="http://rc-site-demo.elasticbeanstalk.com/site/public/filter?country=as">
                        <span>American samoa</span>
                        <small class="label pull-right">2</small>
                    </a>
                </li>
            </ul>

        </li>
        <li class="year">
            <label for="">Year</label>
            <ul>
                <li>
                    <a href="http://rc-site-demo.elasticbeanstalk.com/site/public/filter?year=2015">
                        <span>2015</span>
                        <small class="label pull-right">3</small>
                    </a>
                </li>
            </ul>
        </li>
        <li class="resources">
            <label for="">Resources</label>
            <ul>
                <li>
                    <a href="http://rc-site-demo.elasticbeanstalk.com/site/public/filter?resource=base">
                        <span>Base</span>
                        <small class="label pull-right">3</small>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</div>