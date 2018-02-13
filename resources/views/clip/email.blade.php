<p>Message from {{$from}}:</p>

<p>{{$body}}</p>

<p>{{$url}}</p>

<hr/>
<p>
	This message was sent to you by {{$from}} at
	{{\Carbon\Carbon::now()}}
	{{date_default_timezone_get()}}
	via <a href="{{generate_url()}}">{{site()->meta('title')}}</a>,
	{{site()->meta('email_subtitle')}}
</p>