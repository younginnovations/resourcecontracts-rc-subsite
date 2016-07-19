<?php $local = app('App\Http\Services\LocalizationService'); ?>
<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger"></span>
            @include('layout.partials.logo')
        </div>
        <div class="right-header-section navbar-right">
                @include('layout.partials.searchdropdown')
        </div>
       @include('layout.partials.language')
    </nav>

</div>