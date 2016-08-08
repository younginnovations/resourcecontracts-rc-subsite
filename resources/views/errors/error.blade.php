@include('layout.partials.head')

<div class="row">
	<div class="col-lg-12 not-found-wrapper">
		<div class="not-found-container">
			<div class="not-found-content service-not-found-content" style="padding-top: 200px;">
				<h1><strong>{{site()->meta('title')}} @lang('global.temporarily_unavailable')</strong></h1>
				<p style="font-size: 20px; width: 600px">
					@lang('global.fix_message') {{ site()->contactEmail() }} @lang('global.if_problem_persists')
					@lang('global.apologize')
				</p>
			</div>
		</div>
	</div>
</div>

</body>
</html>
