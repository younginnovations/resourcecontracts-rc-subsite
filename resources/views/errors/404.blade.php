@extends('layout.app')
@section('content')
    <div class="row">
        <div class="col-lg-12 not-found-wrapper">
            <div class="not-found-container">
                <div class="not-found-content">
                    <div class="error-text">404!</div>
                    <p>@lang('global.page_doesnt_exist')</p>
                    <p>{!! trans('global.if_you_are_looking') !!}</p>
                </div>
            </div>
        </div>
    </div>
    <script>
        var lang = <?php echo json_encode(trans('annotation'));?>;
    </script>
 @stop