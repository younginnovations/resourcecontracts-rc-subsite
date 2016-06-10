@extends('layout.app')

@section('css')
    @if(!empty($image))
        <style>
            .row-top-wrap {
                background-image: url({{$image}});
            }
        </style>
    @endif
@stop

@section('content')
    <div class="login-container">
        <div class="row row-top-wrap">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title panel-login-title">@lang('admin.sign_in')</h3>
                    </div>
                    <div class="panel-body">
                        @if(Session::has('error'))
                            <div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert">
                                    <span aria-hidden="true">&times;</span>
                                    <span class="sr-only">@lang('admin.close')</span>
                                </button>
                                {{ Session::get('error') }}
                            </div>
                        @endif
                        <form role="form" action="{{route('login.post')}}" method="post">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" required placeholder=@lang('admin.email')  value=""  name="email" type="email" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" required placeholder=@lang('admin.password') name="password" type="password" value="">
                                </div>
                                <button type="submit" class="btn btn-lg btn-block btn-login-block">@lang('admin.login')</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop