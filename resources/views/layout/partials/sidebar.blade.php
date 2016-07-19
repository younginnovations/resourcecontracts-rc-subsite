<?php
if (!isset($summary)) {
    $api     = app('App\Http\Services\APIService');
    $summary = $api->sortSummaryCountry();
}
?>

<div id="sidebar-wrapper" class="sidebar-collapse in">
    <ul class="sidebar-nav">
        <li class="sidebar-brand">
            @if(env("CATEGORY")=="rc")
                <a href="{{url()}}">Resource <span class="beta">Beta</span><span>Contracts</span></a>
            @else
                <a href="{{url()}}">OPENLAND <span class="beta">Beta</span><span>Contracts</span></a>
            @endif

        </li>

        <li><a href="{{url('/')}}"> @lang('sidebar.home') </a></li>
        <li><a href="{{url('contracts')}}">@lang('sidebar.all_contracts')</a> </li>
        <li><a href="{{url('countries')}}">@lang('sidebar.view_by_country')</a> </li>
        <li><a href="{{url('resources')}}">@lang('sidebar.view_by_resource')</a> </li>
        <li><a href="{{url('about')}}">@lang('sidebar.about_resource_contracts')</a> </li>
        <li><a href="{{url('glossary')}}">@lang('sidebar.glossary')</a> </li>
        <li><a href="{{url('guides')}}">@lang('sidebar.guides')</a> </li>
    </ul>
</div>
<script>
    var localization = [];
    localization.more = "@lang('global.more')";
    localization.less = "@lang('global.less')";
</script>
