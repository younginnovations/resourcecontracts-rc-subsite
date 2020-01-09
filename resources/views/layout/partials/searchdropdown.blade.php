<div class="form-group">
	<button type="submit" class="btn btn-navbar-search pull-left"></button>
	<input type="text" autocomplete="off" name="q" id="query" class="form-control pull-left"
		   placeholder='@lang('search.search_placeholder')'>
</div>
<span class="adv_search_toogle" id="open_adv_search"  @if(!$isSearchPage) style="display: inline" @endif>@lang('search.show_search')</span>
<span class="adv_search_toogle" id="close_adv_search" @if($isSearchPage) style="display: inline" @endif>@lang('search.hide_search')</span>
