<?php
$api = app('App\Http\Services\APIService');
$summary = $api->sortSummaryCountry();
$attributes = $api->searchAttributed();
$category = $api->getAnnotationsCategory();
?>

<div class="form-group">
	<button type="submit" class="btn btn-navbar-search pull-left"></button>
	<input type="text" autocomplete="off" name="q" id="query" class="form-control pull-left"
		   placeholder='@lang('search.search_placeholder')'>
</div>
<span class="adv_search_toogle">Advanced search <i class="fa fa-caret-down"></i></span>
<script>
	var lang = <?php echo json_encode(trans('annotation'));?>;
</script>
