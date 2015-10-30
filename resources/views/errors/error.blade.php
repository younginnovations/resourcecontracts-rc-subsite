@include('layout.partials.head')

<div class="row">
    <div class="col-lg-12 not-found-wrapper">
        <div class="not-found-container">
            <div class="not-found-content service-not-found-content" style="padding-top: 200px;">
                @if(env('CATEGORY') == 'olc')
                    <h1><strong>OpenLandContracts.org is temporarily unavailable</strong></h1>
                    <p style="font-size: 25px;width: 600px">
                        We are working to fix this. Please contact resourcecontracts@yipl.com.np if the problem persists.
                    </p>
                @endif

                @if(env('CATEGORY') == 'rc')
                    <h1><strong>ResourceContracts.org is temporarily unavailable</strong></h1>
                    <p style="font-size: 25px;width: 600px">
                        We are working to fix this. Please contact resourcecontracts@yipl.com.np if the problem persists.
                    </p>
                @endif
            </div>
        </div>
    </div>
</div>

</body>
</html>

