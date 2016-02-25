<?php
$currentPath = Illuminate\Support\Facades\Request::path();
$currentPath = explode('/', $currentPath);
?>
<div class="row">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        @if($currentPath[0] == "admin")
            <div class="navbar-header admin-navbar-header">
                @else
                    <div class="navbar-header">
                        @endif
                        <span data-toggle="collapse-sidebar" data-target=".sidebar-collapse" data-target-2=".sidebar-collapse-container" class="pull-left trigger">trigger</span>
                        @if(env("CATEGORY")=="rc")
                            <a class="navbar-brand" href="{{url()}}">Resource <span class="beta">Beta</span><span>Contracts</span></a>
                        @else
                            <a class="navbar-brand" href="{{url()}}">OPENLAND <span class="beta">Beta</span><span>Contracts</span></a>
                        @endif
                    </div>
                    <div class="col-sm-12 col-md-9 col-lg-10 navbar-right">
                        @if(!isset($show_advance))
                            @include('layout.partials.search')
                        @endif
                    </div>
    </nav>
</div>