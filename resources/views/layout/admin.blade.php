@include('layout.partials.head')
@include('layout.partials.sidebar')
@include('layout.partials.header')
<div class="container" style="margin-top: 20px;">

	@if(Session::has('error'))
		<div class="alert alert-danger alert-dismissable">
			<button type="button" class="close" data-dismiss="alert">
				<span aria-hidden="true">&times;</span>
				<span class="sr-only">Close</span>
			</button>
			{!! Session::get('error') !!}
		</div>
	@endif

	@if(Session::has('success'))
		<div class="alert alert-success alert-dismissable">
			<button type="button" class="close" data-dismiss="alert">
				<span aria-hidden="true">&times;</span>
				<span class="sr-only">Close</span>
			</button>
			{!! Session::get('success') !!}
		</div>
	@endif
	<?php $url = \Request::getPathInfo();?>
	<div class="row">
		<div class="col-sm-4 col-md-3">
			<div class="list-group">
				<a href="{{route('admin.page')}}"
				   class="@if($url == '/admin' || strpos($url, 'page') != false) active @endif  list-group-item">
					<i class="fa fa-file-archive-o"></i> @lang('admin.manage_pages')
				</a>

				<a href="{{route('admin.image')}}"
				   class="@if(strpos($url, 'image') != false) active @endif list-group-item">
					<i class="fa fa-image"></i> @lang('admin.manage_image')
				</a>
				@if(!site()->isCountrySite())
					<a href="{{route('admin.link')}}"
					   class="@if(strpos($url, 'link') != false) active @endif list-group-item">
						<i class="fa fa-link"></i> @lang('admin.manage_link')
					</a>
				@endif
				<a href="{{route('admin.text')}}"
				   class="@if(strpos($url, 'text') != false) active @endif list-group-item">
					<i class="fa fa-file-text-o"></i> @lang('admin.manage_text')
				</a>
				@if(!site()->isCountrySite())
					<a href="{{route('admin.partner')}}"
					   class="@if(strpos($url, 'partner') != false) active @endif list-group-item">
						<i class="fa fa-users"></i> @lang('admin.manage_partners')
					</a>
				@endif

				<a href="{{route('admin.language')}}"
				   class="@if(strpos($url, 'language') != false) active @endif list-group-item">
					<i class="fa fa-language"></i> @lang('admin.manage_language')
				</a>
				<a href="{{ route('logout') }}" class="list-group-item"><i
							class="fa fa-sign-out"></i> @lang('admin.logout') ({{ auth()->user()->name }})</a>
			</div>
		</div>
		<div class="col-lg-8">
			@yield('content')
		</div>
	</div>
</div>

@include('layout.partials.footer')

