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
                    <input type="text" autocomplete="off" value="{{\Illuminate\Support\Facades\Input::get('q')}}" name="q" class="form-control pull-left" placeholder="Search for contracts...">
                </div>
                <div class="search-input-wrapper">
                    <div class="col-lg-12">
                        <div class="col-lg-3 input-wrapper">
                            <label for="year">Year</label>
                            <select name="year[]" id="year" multiple="multiple">
                                @foreach($summary->year_summary as $year)
                                    <option  @if(isset($filter['year']) && in_array($year->key, $filter['year']))
                                        selected="selected" @endif    value="{{$year->key}}">{{$year->key}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-lg-3 input-wrapper">
                            <label for="">Country</label>
                            <select name="country[]" id="" multiple="multiple">
                                @foreach($summary->country_summary as $country)
                                    <option @if(isset($filter['country']) && in_array($country->key, $filter['country']))
                                        selected="selected"
                                        @endif value="{{$country->key}}">{{trans('country.'.strtoupper($country->key))}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-lg-3 input-wrapper">
                            <label for="sortby">Order by</label>
                            <select name="sortby" id="sortby">
                                <option value="">Select</option>
                                <option @if(isset($filter['sortby']) && $filter['sortby'] == 'country')
                                    selected="selected" @endif value="country">Country
                                </option>
                                <option @if(isset($filter['sortby']) && $filter['sortby'] == 'year') selected="selected"
                                                                                                     @endif value="year">
                                    Year
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-3 input-wrapper">
                            <label for="order">Sort by</label>
                            <select name="order" id="order">
                                <option value="">Select</option>
                                <option @if(isset($filter['order']) && $filter['order'] == 'asc') selected="selected"
                                                                                                  @endif value="asc">ASC
                                </option>
                                <option @if(isset($filter['order']) && $filter['order'] == 'desc') selected="selected"
                                                                                                   @endif value="desc">
                                    DESC
                                </option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-form-search">Search</button>
                </div>
            </form>
        </div>
    </nav>
</div>