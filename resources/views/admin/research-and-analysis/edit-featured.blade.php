@extends('layout.admin')

@section('js')
    <script type="text/javascript" src="{{url('js/tinymce/tinymce.min.js')}}"></script>
    <script type="text/javascript" src="{{url('js/tinymce/tinymce-init.js')}}"></script>
@stop

@section('content')
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">@lang('admin.research_and_analysis.featured_links')</h3>
        </div>
        <div class="panel-body">
            <form action="{{route('admin.research-and-analysis.update-featured')}}" method="POST">
                @foreach(range(1,3) as $featureIndex)
                <div class="form-group">
                    <label for="featured-{{ $featureIndex }}">Featured {{$featureIndex}}</label>
                    <input type="hidden" name="featured[{{ $featureIndex }}][featured_index]" value="{{ $featureIndex }}">
                    <select name="featured[{{ $featureIndex }}][id]" id="featured-{{ $featureIndex }}" required>
                        <option value="" readonly="">Select featured</option>
                        @foreach($researches as $research)
                            <option value="{{ $research->id }}" @if($research->featured_index == $featureIndex) selected @endif>{{ $research->title->en }}</option>
                        @endforeach
                    </select>
                </div>
                @endforeach
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <a class="btn btn-default" href="{{route('admin.research-and-analysis.index')}}">@lang('global.cancel')</a>
                </div>
            </form>
        </div>
    </div>
@stop