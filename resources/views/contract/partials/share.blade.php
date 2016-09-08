<ul class="social-toggle">
    <li class="facebook"><a class="share-link" href="https://www.facebook.com/sharer/sharer.php?u={{ \Request::fullUrl() }}"
                             target="_blank">Facebook</a></li>
    <li class="google-plus"><a class="share-link" href="https://plus.google.com/share?url={{ \Request::fullUrl() }}"
                                target="_blank">Google</a></li>
    {{--<li class="twitter"><a class="share-link" href="https://twitter.com/share?text={{ meta()->title }}"
                            target="_blank">Twitter</a></li>--}}
    <li class="email" data-toggle="modal" data-target="#emailModel"><a>Email</a></li>
</ul>
