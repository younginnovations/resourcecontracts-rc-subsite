@extends('layout.admin')

@section('content')
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Manage Images</h3>
		</div>
		<div class="panel-body">
			<p><strong>Favicon</strong></p>
			<form method="post" action="{{route('admin.image.upload' , ['type' => 'favicon'])}}"
				  enctype='multipart/form-data'>
				<p><input type="file" name="image"/></p>
				<p><img style="max-width: 50px" src="{{$image['favicon'] or ''}}"></p>
				<button type="submit" class="btn btn-primary upload"><i class="fa fa-upload"></i> Upload</button>
			</form>
			<hr/>
			<p><strong>Home Page (Main Background)</strong></p>
			<form method="post" action="{{route('admin.image.upload' , ['type' => 'bg'])}}"
				  enctype='multipart/form-data'>
				<p><input type="file" name="image"/>
					<small>Image size must be minimum 960X500px</small>
				</p>
				<p><img width="200" src="{{$image['bg'] or ''}}"></p>
				<button type="submit" class="btn btn-primary upload"><i class="fa fa-upload"></i> Upload</button>
			</form>
			<hr/>

			<hr/>
			<p><strong>Home Page (Intro section background)</strong></p>
			<form method="post" action="{{route('admin.image.upload' , ['type' => 'intro_bg'])}}"
				  enctype='multipart/form-data'>
				<p><input type="file" name="image"/>
					<small>Image size must be minimum 1024X200px</small>
				</p>
				<p><img height="100" src="{{$image['intro_bg'] or ''}}"></p>
				<button type="submit" class="btn btn-primary upload"><i class="fa fa-upload"></i> Upload</button>
			</form>
			<hr/>

			<p><strong>Sidebar</strong></p>
			<form method="post" action="{{route('admin.image.upload' , ['type' => 'sidebar'])}}"
				  enctype='multipart/form-data'>
				<p><input type="file" name="image"/>
					<small>Image size must be minimum 200X100px</small>
				</p>
				<p><img width="200" src="{{$image['sidebar'] or ''}}"></p>
				<button type="submit" class="btn btn-primary upload"><i class="fa fa-upload"></i> Upload</button>
			</form>
		</div>
	</div>
@stop