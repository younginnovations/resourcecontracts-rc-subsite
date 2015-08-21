<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <span data-toggle="collapse-side" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
            <a class="navbar-brand" href="{{url()}}" >Resource <span>Contracts</span></a>
        </div>
        <div class="navbar-right">
            <form action="{{url('search')}}" method="get" class="search-form">
                <div class="form-group">
                    <button type="submit" class="btn btn-navbar-search pull-left"></button>
                    <input type="text" value="{{\Illuminate\Support\Facades\Input::get('q')}}" name="q" class="form-control pull-left" placeholder="Search for contracts...">
                </div>
                <div class="search-input-wrapper">
                    <div class="col-lg-12">
                        <div class="col-lg-3 input-wrapper">
                            <input type="date" placeholder="date">
                        </div>
                        <div class="col-lg-3 input-wrapper">
                            <select name="" id="">
                                <option value="">Country</option>
                                <option value="">Albania</option>
                                <option value="">Kenya</option>
                                <option value="">Nepal</option>
                            </select>
                        </div>
                        <div class="col-lg-3 input-wrapper">
                            <select name="" id="">
                                <option value="">Contract type</option>
                                <option value="">Kosmos Energy</option>
                                <option value="">Kosmos Energy</option>
                                <option value="">Kosmos Energy</option>
                            </select>
                        </div>
                        <div class="col-lg-3 input-wrapper">
                            <select name="" id="">
                                <option value="">Resource</option>
                                <option value="">Gold</option>
                                <option value="">Copper</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-form-search">Search</button>
                </div>
            </form>
        </div>
    </nav>
</div>