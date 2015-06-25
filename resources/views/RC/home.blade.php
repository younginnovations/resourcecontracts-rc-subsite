@include('RC.sidebar')

<br><br>

@foreach($result as $data)
    <table>
        <tr>
            <td><a href="">{{$data['name']}}</a></td>
        </tr>
    </table>
@endforeach