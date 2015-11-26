@include('layout.partials.head')

<div class="row">
    <div class="col-lg-12 not-found-wrapper">
        <div class="not-found-container">
            <div class="not-found-content service-not-found-content" style="padding-top: 200px;">
                @if(env('CATEGORY') == 'olc')
                    <h1><strong>OpenLandContracts.org @lang('global.temporarily_unavailable')</strong></h1>
                    <p style="font-size: 25px;width: 600px">
                        @lang('global.fix_message') {{ env('CONTACT_MAIL') }} @lang('if_problem_persists')
                        @lang('global.apologize')
                    </p>
                @endif

                @if(env('CATEGORY') == 'rc')
                    <h1><strong>ResourceContracts.org @lang('global.temporarily_unavailable')</strong></h1>
                    <p style="font-size: 25px;width: 600px">
                        @lang('global.fix_message') {{ env('CONTACT_MAIL') }} @lang('if_problem_persists')
                        @lang('global.apologize')
                    </p>
                @endif
            </div>
        </div>
    </div>
</div>

</body>
</html>

