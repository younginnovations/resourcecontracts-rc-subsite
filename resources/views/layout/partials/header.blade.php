<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-brand" href="{{url()}}">Resource <span>Contracts</span></a>
        </div>
        <div class="navbar-right">
            <form action="{{url('search')}}" method="get" class="search-form">
                <div class="form-group">
                    <button type="submit" class="btn btn-navbar-search pull-left"></button>
                    <input type="text" name="q" class="form-control pull-left" placeholder="Search for contracts...">
                </div>
            </form>
        </div>
    </nav>
</div>