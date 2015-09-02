<?php $totalPages = ceil($contracts->total / $contracts->per_page); ?>

<div class="text-center">
    <ul class="pagination pagination-sm">
        @if($currentPage > 1)
            <li><a href="{{ route('contracts') }}?page=1">First</a></li>
            <li><a href="{{ route('contracts') }}?page={{ $currentPage > 1 ? $currentPage - 1 : 1 }}"><
                    <prev
                </a></li>
        @endif

        @if(($currentPage - 6) > 0)
            <li><a href="javascript:void();">...</a></li>
        @endif
        @if(($currentPage - 5) > 0)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage - 5 }}">{{ $currentPage - 5 }}</a></li>
        @endif
        @if(($currentPage - 4) > 0)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage - 4 }}">{{ $currentPage - 4 }}</a></li>
        @endif
        @if(($currentPage - 3) > 0)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage - 3 }}">{{ $currentPage - 3 }}</a></li>
        @endif
        @if(($currentPage - 2) > 0)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage - 2 }}">{{ $currentPage - 2 }}</a></li>
        @endif
        @if(($currentPage - 1) > 0)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage - 1 }}">{{ $currentPage - 1 }}</a></li>
        @endif
        <li class="active"><a href="javascript:void()">{{ $currentPage }}</a></li>
        @if(($currentPage + 1) <= $totalPages)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage + 1 }}">{{ $currentPage + 1 }}</a></li>
        @endif
        @if(($currentPage + 2) <= $totalPages)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage + 2 }}">{{ $currentPage + 2 }}</a></li>
        @endif
        @if(($currentPage + 3) <= $totalPages)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage + 3 }}">{{ $currentPage + 3 }}</a></li>
        @endif
        @if(($currentPage + 4) <= $totalPages)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage + 4 }}">{{ $currentPage + 4 }}</a></li>
        @endif
        @if(($currentPage + 5) <= $totalPages)
            <li><a href="{{ route('contracts') }}?page={{ $currentPage + 5 }}">{{ $currentPage + 5 }}</a></li>
        @endif
        @if(($currentPage + 6) < $totalPages)
            <li><a href="javascript:void()">...</a></li>
        @endif

        @if($currentPage < $totalPages)
            <li>
                <a href="{{ route('contracts') }}?page={{ $currentPage < $totalPages ? $currentPage + 1 : $currentPage }}">next>></a>
            </li>
            <li><a href="{{ route('contracts') }}?page={{ $totalPages }}">Last</a></li>
        @endif
    </ul>
</div>