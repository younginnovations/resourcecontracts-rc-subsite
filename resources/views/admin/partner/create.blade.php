@extends('layout.admin')

@section('content')
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">@lang('admin.partner.create')</h3>
		</div>
		<div class="panel-body">
			<form method="post" action="{{route('admin.partner.store')}}"
				  enctype='multipart/form-data'>
				<p><strong>Url</strong></p>
				<p>
					<input class="form-control" type="text" value="{{old('link')}}" name="link" id="link"/>
				</p>
				<span>
					@if(isset($errors))
						sdfsdfsdfsdfsdf
					{{dd($errors)}}
					@endif
				</span>

				<p><strong>Image</strong></p>
				<p>
					<input type="file" name="image"/>
					<small>Image size must be minimum 280 X 170px</small>
				</p>

				<button type="submit" class="btn btn-primary">@lang('admin.submit')</button>
			</form>
		</div>
	</div>
@stop