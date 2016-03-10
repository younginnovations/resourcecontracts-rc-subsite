<?php
use \Illuminate\Support\Facades\Lang;

$url = app('request')->url();
?>
<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
            @if(env("CATEGORY")=="rc")
                <a class="navbar-brand" href="{{url()}}">@lang('global.resource') <span class="beta">Beta</span><span>{{Lang::choice('global.contracts' , 2)  }}</span></a>
            @else
                <a class="navbar-brand" href="{{url()}}">@lang('global.openland') <span class="beta">Beta</span><span>{{Lang::choice('global.contracts' , 2)}}</span></a>
            @endif
        </div>
        <div class="col-sm-12 col-md-9 col-lg-10 navbar-right">
            <a href="{{ $url }}?lang=en">English</a></li>
            <a href="{{ $url }}?lang=fr">French</a></li>

            @if(!isset($show_advance))
                @include('layout.partials.search')
            @endif

        </div>
    </nav>
</div>