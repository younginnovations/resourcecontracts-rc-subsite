@if(site()->isClipEnabled())
    <div class="clip-head clipToggleElems">
        <a href="{{route('clip.index')}}" id="annotation-count" >@lang('clip.view_all_clips') (<span class="clipSelectCount">0</span>)</a>
        <a href="#" class="" id="hide-annotation" >@lang('clip.hide')</a>
    </div>
@endif