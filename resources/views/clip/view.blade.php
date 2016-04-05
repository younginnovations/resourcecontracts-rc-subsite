@extends('layout.app-full')

@section('content')

   <div class="row">
       <div class="col-lg-12">
           <h2>Clipped Annotations</h2>
           <p id="annotation-count"></p>
           <div class="col-lg-12">
               <table class="table table-bordered">
                   <thead>
                   <tr>
                       <th>OpenContracting Id</th>
                       <th>Category</th>
                       <th>Text</th>
                       <th>Action</th>
                   </tr>
                   </thead>
                   <tbody id="annotationsresults">
                   </tbody>
               </table>
           </div>
       </div>
   </div>


@endsection