@extends('layout.app-full')
@section('content')
<?php 
    $i = 0;
    $order = \Illuminate\Support\Facades\Input::get('order', '');
    $sortBy = \Illuminate\Support\Facades\Input::get('sortby', '');
    $showYear = true;
?>

<div class="row">
    <div class="col-lg-12 country-list-wrapper">
        <div class="panel panel-default panel-wrap country-list-wrap">
            <div class="panel-body">
              
                @include('contract.partials.group_search_list')

                @include('contract.partials.pagination', ['total_item' => $contracts->result_total, 'per_page'=>
                $contracts->per_page, 'current_page' => $contracts->current_page ])
            </div>
        </div>
    </div>
</div>

@stop