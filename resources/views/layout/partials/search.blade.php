<?php
$api = app('App\Http\Services\APIService');
$summary = $api->sortSummaryCountry();
$attributes = $api->searchAttributed();
$category = $api->getAnnotationsCategory();
?>
<form action="{{url('search')}}" method="get" class="search-form @if(isset($show_advance)) search-page-form @endif"
      id="search-form">
    <div class="form-group">
        <button type="submit" class="btn btn-navbar-search pull-left"></button>
        <input type="text" autocomplete="off" value="{{\Illuminate\Support\Facades\Input::get('q')}}" name="q"
               class="form-control pull-left" placeholder="@lang('search.search_message')">
    </div>
    <div class="search-input-wrapper @if(isset($show_advance)) search-page-input-wrapper @endif">
        <div class="col-lg-12">
            <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
                <label for="">@lang('search.year_signed')</label>
                <select name="year[]" id="year" multiple="multiple">
                    @foreach($summary->year_summary as $year)
                        <option  @if(isset($filter['year']) && in_array($year->key, $filter['year']))
                            selected="selected" @endif    value="{{$year->key}}">{{$year->key}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
                <label for="">@lang('global.country')</label>
                <select name="country[]" id="" multiple="multiple">
                    @foreach($summary->country_summary as $country)
                        <option @if(isset($filter['country']) && in_array(strtoupper($country['key']), array_map('strtoupper',$filter['country'])))
                            selected="selected"
                            @endif value="{{$country['key']}}">{{$country['name']}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
                <label for="">@lang('global.resource')</label>
                <select name="resource[]" id="" multiple="multiple">
                    @foreach($summary->resource_summary as $resource)
                        <option @if(isset($filter['resource']) && in_array($resource->key, $filter['resource']))
                            selected="selected"
                            @endif value="{{$resource->key}}">{{$resource->key}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
                <label for="">@lang('search.company_name')</label>
                <select name="company_name[]" id="" multiple="multiple">
                    <?php $company_array = array_map('trim', (array) $attributes->company_name);
                    sort($company_array);
                    ?>
                    @foreach($company_array as $company)
                        <option @if(isset($filter['company_name']) && in_array($company, $filter['company_name']))
                            selected="selected"
                            @endif value="{{$company}}">{{$company}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="col-lg-12">
            @if(env('CATEGORY')=="rc")
                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
                    <label for="">Corporate Group</label>
                    <select name="corporate_group[]" id="" multiple="multiple">
                        @foreach($attributes->corporate_grouping as $group)
                            <option @if(isset($filter['corporate_group']) && in_array($group, $filter['corporate_group']))
                                selected="selected"
                                @endif value="{{$group}}">{{$group}}</option>
                        @endforeach
                    </select>
                </div>
            @endif
            <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
                <label for="">@lang('search.contract_type')</label>
                <select name="contract_type[]" id="" multiple="multiple">
                    @foreach(array_filter($attributes->contract_type) as $type)
                        <option @if(isset($filter['contract_type']) && in_array($type, $filter['contract_type']))
                            selected="selected"
                            @endif value="{{$type}}">{{$type}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
                <label for="">@lang('search.annotations_category')</label>
                <?php $annotation_category = array_map('trim', (array) $category->results);
                sort($annotation_category);
                ?>
                <select name="annotation_category[]" id="" multiple="multiple">
                    @foreach(array_filter($annotation_category) as $cat)
                        <option @if(isset($filter['annotation_category']) && in_array($cat, $filter['annotation_category']))
                            selected="selected"
                            @endif value="{{$cat}}">{{$cat}}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-lg-4">
            <button type="submit" class="btn btn-form-search">@lang('global.search')</button>

            @if(!isset($searchPage))
                <button type="button" class="btn btn-form-search search-close">@lang('global.cancel')</button>
            @endif
        </div>
        </div>
    </div>
</form>