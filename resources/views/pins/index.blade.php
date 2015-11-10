@extends('layout.app-full')
@section('css')
@stop
@section('content')
    <div id="content"></div>
@endsection
@section('js')
    <script src="{{ url('scripts/lib/underscore.js') }}"></script>
    <script src="{{ url('scripts/lib/backbone.js') }}"></script>
    <script type="text/javascript" src="{{ url('scripts/lib/backbone.localstorage.js') }}"></script>
    <script type="text/javascript" src="{{ url('scripts/lib/backbone.exportcsv.js') }}"></script>
    <script src="{{ url('scripts/lib/react/react-with-addons.js') }}"></script>
    <script src="{{ url('scripts/lib/react/JSXTransformer.js') }}"></script>
    <script type="text/jsx" src="{{ url('scripts/contract.view.custom/views/react.waypoint.js') }}"></script>
    <script src="{{ url('js/pinning.js') }}"></script>
    <script type="text/jsx">
        var pinCollection = new PinCollection();
        pinCollection.fetch();
        console.log(pinCollection)
        var ContractPinList = React.createClass({
            render: function() {
                return (
                        <div className="contract-pin-list">
                            <div className="pin-list-title">Pin List</div>
                            <ContractPinBox />
                        </div>
                );
            }
        });

        var ContractPinBox = React.createClass({
            render: function() {
                return (
                        <div className="contract-pin-box">Contract title
                            <PinList/>
                        </div>

                );
            }
        });
        var PinList = React.createClass({
            render: function() {
                return (
                        <div className="contract name">pin data</div>
                );
            }
        });
        React.render(
                <ContractPinList/>,
                document.getElementById('content')
        );
    </script>
@stop




