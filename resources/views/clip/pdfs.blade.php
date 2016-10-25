
@foreach($annotations->result as $annotation)

    <div></div><ul  style="list-style: none;padding: 0;">
        <li style='margin-bottom: 5px;'><b style='font-size: large'>  {{$annotation->name}}  </b></li>
        <li style='margin-bottom: 8px;'>  {{$annotation->text}}  </li>
        <li style='margin-bottom: 5px;'><b>Category:</b>   {{$annotation->category}}  </li>
        <li> <b>Year : </b>  {{$annotation->year}}  , <b>Country: </b>  {{$annotation->country}}  , <b>Resource: </b>  {{join(',',$annotation->resource)}}  </li>
    </ul>
    </div>
    <hr>
@endforeach