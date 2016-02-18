@extends('layout.admin')

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Manage Color for {{ get_country('name') }}</h3>
        </div>

        <div class="panel-body">
            <p><strong>Primary Color</strong></p>
            <form action="#" method="POST">
                <input type="color" name="primary" value="#0096E0">

                <hr>
                <p><strong>Secondary Color</strong></p>
                <input type="color" name="secondary" value="#00AAFF">

                <hr>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>

@stop
