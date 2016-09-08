@if(site()->isClipEnabled())
    <div class="clip-head">
        <a href="{{route('clip.index')}}" id="annotation-count" style="display: none"></a>
        <a href="#" class="" id="hide-annotation" style="display: none">@lang('clip.hide')</a>
    </div>
@endif