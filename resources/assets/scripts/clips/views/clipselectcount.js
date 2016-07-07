var ClipSelectCount = React.createClass({
    getInitialState: function () {
        return {
            count: 0
        }
    },
    componentDidMount:function(){
            var self=this;
            this.props.clipCollection.on('selectedData', function (data) {
                self.setState({count: data.length});
            });

    },
    render : function(){
        if(this.state.count==0)
        {
            return (<div></div>);
        }
        else{
            return (
                <div className="count-select">
                    Selected: <span>{this.state.count}</span>
                </div>
            );
        }

    }
});