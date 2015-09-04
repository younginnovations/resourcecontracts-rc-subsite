<?php
$total_page  = ceil($total_item / $per_page);
$no_of_pages = 6;
$current_url = \Illuminate\Support\Facades\Input::url();
$queries     = \Illuminate\Support\Facades\Input::get();
$queries = array_except($queries,['page']);
$current_url .= "?";
$current_url .= (http_build_query($queries) == '') ? '' : http_build_query($queries) . '&';
?>

@if($total_page > 1 && $current_page <= $total_page)
<div class="text-center">
    <ul class="pagination pagination-sm">
        @if($current_page > 1)
            <li><a href="{{ $current_url }}page=1">First</a></li>
            <li><a href="{{ $current_url }}page={{ $current_page > 1 ? $current_page - 1 : 1 }}">
                    Prev
                </a></li>
        @endif

        @if(($current_page - $no_of_pages) > 0)
            <li><a href="javascript:void();">...</a></li>
        @endif

        @for($i=$no_of_pages; $i>0; $i--)
            @if(($current_page - $i) > 0)
                <li><a href="{{ $current_url }}page={{ $current_page - $i }}">{{ $current_page - $i }}</a></li>
            @endif
        @endfor

        <li class="active"><a href="javascript:void()">{{ $current_page }}</a></li>

        @for($i =1; $i<=$no_of_pages; $i++)
            @if(($current_page + $i) <= $total_page)
                <li><a href="{{ $current_url }}page={{ $current_page + $i }}">{{ $current_page + $i }}</a></li>
            @endif
        @endfor

        @if(($current_page + $no_of_pages) < $total_page)
            <li><a href="javascript:void()">...</a></li>
        @endif

        @if($current_page < $total_page)
            <li>
                <a href="{{ $current_url }}page={{ $current_page < $total_page ? $current_page + 1 : $current_page }}">Next</a>
            </li>
            <li><a href="{{ $current_url }}page={{ $total_page }}">Last</a></li>
        @endif
    </ul>
</div>
@endif