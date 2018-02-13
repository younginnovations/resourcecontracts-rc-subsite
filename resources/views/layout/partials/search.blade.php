<?php
$api = app('App\Http\Services\APIService');
$summary = $api->sortSummaryCountry();
$attributes = $api->searchAttributed();
$category = $api->getAnnotationsCategory();
$SearchPage = isset($searchPage) && $searchPage ? true : false;
?>
<div class="search-input-wrapper">
	<div class="col-lg-12">
		@if(!site()->isCountrySite())
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
				<label for="">@lang('global.country')</label>
				<select name="country[]" id="country" multiple="multiple">
					@foreach($summary->country_summary as $country)
						<option @if(isset($filter['country']) && in_array(strtoupper($country['key']), array_map('strtoupper',$filter['country'])))selected="selected"
								@endif value="{{$country['key']}}">{{$country['name']}}</option>
					@endforeach
				</select>
			</div>
		@endif
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
			<label for="">@lang('global.resource')</label>

			<select name="resource[]" id="resource" multiple="multiple">
				@foreach($summary->resource_summary as $resource)

					<option @if(isset($filter['resource']) && in_array($resource->key, $filter['resource']))selected="selected"
							@endif value="{{$resource->key}}">{{_l("resources",$resource->key)}}</option>
				@endforeach
			</select>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
			<label for="">@lang('search.year_signed')</label>
			<select name="year[]" id="year" multiple="multiple">
				@foreach($summary->year_summary as $year)
					<option @if(isset($filter['year']) && in_array($year->key, $filter['year'])) selected="selected"
							@endif value="{{$year->key}}">{{$year->key}}</option>
				@endforeach
			</select>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
			<label for="">@lang('search.company_name')</label>
			<select name="company_name[]" id="company" multiple="multiple">
				<?php $company_array = array_map('trim', (array) $attributes->company_name);
				sort($company_array);
				?>
				@foreach($company_array as $company)
					<option @if(isset($filter['company_name']) && in_array($company, $filter['company_name'])) selected="selected"
							@endif value="{{$company}}">{{$company}}</option>
				@endforeach
			</select>
		</div>
		@if(site()->isRC())
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
				<label for="">@lang('search.corporate_group')</label>
				<select name="corporate_group[]" id="corporate_group" multiple="multiple">
					@foreach($attributes->corporate_grouping as $group)
						<option @if(isset($filter['corporate_group']) && in_array($group, $filter['corporate_group'])) selected="selected"
								@endif value="{{$group}}">{{$group}}</option>
					@endforeach
				</select>
			</div>
		@endif
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
			<label for="">@lang('search.language')</label>
			<select name="language[]" id="language" multiple="multiple">
				@foreach(array_filter($attributes->language) as $language)
					<option @if(isset($filter['language']) && in_array($language, $filter['language'] )) selected="selected"
							@endif value="{{$language}}">{{trans('codelist/language')[$language]}}</option>
				@endforeach
			</select>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
			<label for="">@lang('search.document_type')</label>
			<select name="document_type[]" id="document_type" multiple="multiple">
				@foreach(array_filter($attributes->document_type) as $type)
					<option @if(isset($filter['document_type']) && in_array($type, $filter['document_type'])) selected="selected"
							@endif value="{{$type}}">{{_l('codelist/document_type',$type)}}</option>
				@endforeach
			</select>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
			<label for="">@lang('search.contract_type')</label>
			<select name="contract_type[]" id="contract_type" multiple="multiple">
				@foreach(array_filter($attributes->contract_type) as $type)
					<option @if(isset($filter['contract_type']) && in_array($type, $filter['contract_type'])) selected="selected"
							@endif value="{{$type}}">{{_l('codelist/contract_type',$type)}}</option>
				@endforeach
			</select>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
			<label for="">@lang('search.annotations_category')</label>
			<?php $annotation_category = array_map('trim', (array) $category->results);
			sort($annotation_category);
			?>
			<select name="annotation_category[]" id="annotation_category" multiple="multiple">
				@foreach(array_filter($annotation_category) as $cat)
					<option @if(isset($filter['annotation_category']) && in_array($cat,
                        $filter['annotation_category'])) selected="selected"
							@endif value="{{$cat}}">{{_l('codelist/annotation.search',$cat)}}</option>
				@endforeach
			</select>
		</div>
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2 input-wrapper">
			<label for="">@lang('search.annotated')</label>
			<input type="checkbox" name="annotated" value="1" class="form-control"
				   @if(isset($filter['annotated']) && $filter['annotated']==1) checked @endif>
		</div>
	</div>
	<div class="col-lg-12">
		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2">
			<button type="submit" class="btn btn-form-search">@lang('global.search')</button>
		</div>

		<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2">
			@if($SearchPage)
				<a href="{{generate_url('search')}}" class="btn btn-form-search btn-form-reset">
					@lang('search.reset')
				</a>
			@else
				<button type="reset" id="searchclear" class="btn btn-form-search btn-form-reset">
					@lang('search.reset')
				</button>
			@endif
		</div>

		@if(!$SearchPage)
			<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2">
				<button type="button" class="btn btn-form-search search-close">@lang('global.hide')</button>
			</div>
		@endif
	</div>
</div>
