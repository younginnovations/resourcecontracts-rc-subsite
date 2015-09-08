<?php
$api     = app('App\Http\Services\APIService');
$summary = $api->summary();
$attributes = $api->searchAttributed();
$category=$api->getAnnotationsCategory();
?>
<form action="{{url('search')}}" method="get" class="search-form @if(isset($show_advance)) search-page-form @endif" id="search-form">
    <div class="form-group">
        <button type="submit" class="btn btn-navbar-search pull-left"></button>
        <input type="text" autocomplete="off" value="{{\Illuminate\Support\Facades\Input::get('q')}}" name="q" class="form-control pull-left" placeholder="Search for contracts...">
    </div>
    <div  class="search-input-wrapper @if(isset($show_advance)) search-page-input-wrapper @endif">
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
                        <option @if(isset($filter['country']) && in_array(strtoupper($country->key), array_map('strtoupper',$filter['country'])))
                            selected="selected"
                            @endif value="{{$country->key}}">{{trans('country.'.strtoupper($country->key))}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-lg-3 input-wrapper">
                <label for="">Resource</label>
                <select name="resource[]" id="" multiple="multiple">
                    @foreach($summary->resource_summary as $resource)
                        <option @if(isset($filter['resource']) && in_array($resource->key, $filter['resource']))
                            selected="selected"
                            @endif value="{{$resource->key}}">{{$resource->key}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-lg-3 input-wrapper">
                <label for="">Company Name</label>
                <select name="company_name[]" id="" multiple="multiple">
                    @foreach($attributes->company_name as $company)
                        <option @if(isset($filter['company_name']) && in_array($company, $filter['company_name']))
                            selected="selected"
                            @endif value="{{$company}}">{{$company}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="col-lg-3 input-wrapper">
                <label for="">Corporate Group</label>
                <select name="corporate_group[]" id="" multiple="multiple">
                    @foreach($attributes->corporate_grouping as $group)
                        <option @if(isset($filter['corporate_group']) && in_array($group, $filter['corporate_group']))
                            selected="selected"
                            @endif value="{{$group}}">{{$group}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-lg-3 input-wrapper">
                <label for="">Contract Type</label>
                <select name="contract_type[]" id="" multiple="multiple">
                    @foreach(array_filter($attributes->contract_type) as $type)
                        <option @if(isset($filter['contract_type']) && in_array($type, $filter['contract_type']))
                            selected="selected"
                            @endif value="{{$type}}">{{$type}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-lg-3 input-wrapper">
                <label for="">Annotations Category</label>
                <select name="annotation_category[]" id="" multiple="multiple">
                    @foreach(array_filter($category->results) as $cat)
                        <option @if(isset($filter['annotation_category']) && in_array($cat, $filter['annotation_category']))
                            selected="selected"
                            @endif value="{{$cat}}">{{$cat}}</option>
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
        </div>
        <div class="col-lg-12">
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
            <div class="col-lg-4">
                <button type="submit" class="btn btn-form-search">Search</button>
                <button type="button" class="btn btn-form-search search-close">Cancel</button>
            </div>
    </div>
</form>