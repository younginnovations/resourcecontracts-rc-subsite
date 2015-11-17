@extends('layout.app-full')

@section('content')
    <div id="content"></div>
@endsection
@section('js')
    <script src="{{ url('scripts/lib/toastr.min.js') }}"></script>
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
        pinCollection.fetch()
        var PinListBox = React.createClass({
            componentDidMount: function() {
                this.props.pinCollection.on("change add remove", this.refresh);
            },
            refresh: function() {
                this.forceUpdate()
            },
            exportToCsv: function () {
                pinCollection.saveToCSV('pinlist');
            },
            render: function() {
                var pinContractGroups = this.props.pinCollection.groupBy(function(model) { return model.get('contract_id'); });

                var contractPinBoxes = []
                if(!this.props.pinCollection.length > 0){
                    return <div className="no-pin-msg">Pins not available</div>
                }
                if (pinContractGroups) {
                    for (var contractPinKey in  pinContractGroups) {
                        var contractName = pinContractGroups[contractPinKey][0].get('contract_title');
                        contractPinBoxes.push((<ContractPinBox
                                contractName={contractName}
                                pins={pinContractGroups[contractPinKey]}/>
                        ));
                    }
                }
                return (
                        <div className="pin-list-wrapper">
                            <a className="btn btn-primary pull pull-right" onClick={this.exportToCsv} >Export All</a>
                            <div className="contract-pin-list-box">
                                <div className="pin-list-title">Pin List</div>
                                {contractPinBoxes}
                            </div>
                        </div>
                );
            }
        });

        var ContractPinBox = React.createClass({
            render: function() {
                var divStyle = {
                    borderBottom: 'solid 1px'
                };
                var contractPins = []
                var pinList = this.props.pins
                if (pinList.length>0) {
                    for (var i = 0; i < pinList.length; i++) {
                        var pin = this.props.pins[i];
                        contractPins.push((<PinListRow
                                onDestroy={pin.destroy.bind(pin)}
                                pin={pin}/>
                        ));
                    }
                }
                return (
                        <div className="contract-pin-box">
                        <div className="contract-title" style={divStyle}>{this.props.contractName}</div>
                            {contractPins}
                        </div>

                );
            }
        });
        var PinListRow = React.createClass({
            destroy: function () {
                this.props.pin.destroy();
            },
            render: function() {
                return (
                        <div className="pin-list-row">
                            <div className="category">{this.props.pin.get('category')}</div>
                            <div className="text">{this.props.pin.get('text')}</div>
                            <button className="destroy" onClick={this.destroy}>X</button>
                        </div>

                );
            }
        });
        React.render(
                <PinListBox pinCollection={pinCollection}/>,
                document.getElementById('content')
        );
    </script>
@stop




