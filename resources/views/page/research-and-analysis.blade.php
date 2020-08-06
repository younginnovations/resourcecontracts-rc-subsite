@extends('layout.app')
<?php
$editingMode = auth()->isloggedIn();
$pageVersion = app('request')->get('v');
?>
@section('content')

    <div class="content-static-wrap">
        {{-- Page Heading and title --}}
        <h1 id="title">{{$page['title']['en']}}</h1>
        <div id="content">{{$page['description']['en']}}</div>
    </div>

    <div class="research-and-analysis-featured-box row">
        <h1 class="col-md-12">featured</h1>
        <table class="col-md-8 col-md-offset-2">
            <tbody>
            {{-- Featured boxes --}}
            @foreach($featured as $research)
                <tr>
                    <td><a href="{{ $research->url }}">{{ $research->title->en }}</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    <div class="row">
        <h2 class="col-md-12">More links</h2>
        <table class="col-md-8 col-md-offset-2">
            <tbody>
            {{-- Research links --}}
            @foreach($researches as $research)
                <tr>
                    <td><a href="{{ $research->url }}">{{ $research->title->en }}</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {{-- Pagination links --}}
        {!! $researches !!}
    </div>
@stop