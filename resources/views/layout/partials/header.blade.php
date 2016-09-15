<?php $local = app('App\Http\Services\LocalizationService'); ?>
@include('layout.partials.clip')
<div class="row title-wrap clearfix">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger"></span>
            @include('layout.partials.logo')
        </div>
        <div class="right-header-section navbar-right hidden">
                @include('layout.partials.searchdropdown')
        </div>
    </nav>

</div>
