var Filter = React.createClass({
    componentDidMount: function () {
        var self = this;
        this.props.clipCollection.on('data:change', function () {
            self.forceUpdate();
        })
    },

    render: function () {
        var filter = this.props.clipCollection.filterMetadata();
        return (
            <div className="row clip-search-row">
                <div className="col-md-2">
                    <label>langClip.year</label>
                    <Option multiple={true} name="year" clipCollection={this.props.clipCollection} options={filter.year}/>
                </div>
                <div className="col-md-2">
                    <label>langClip.country</label>
                    <Option multiple={true} name="country" clipCollection={this.props.clipCollection} options={filter.country}/>
                </div>
                <div className="col-md-2">
                    <label>langClip.resource</label>
                    <Option multiple={true} name="resource" clipCollection={this.props.clipCollection} options={filter.resource}/>
                </div>
                <div className="col-md-2">
                    <label>langClip.category</label>
                    <Option multiple={true} name="category" clipCollection={this.props.clipCollection} options={filter.category}/>
                </div>
            </div>
        );
    }
});

var Option = React.createClass({
    componentDidMount: function () {
        var self = this;
        $('.' + this.getClass()).on("change", function (e) {
            self.props.clipCollection.trigger('filter:change',{key:e.target.name, value: $(this).val()});
        });
    },
    getClass:function(){
        return 'filter-' + this.props.name;
    },
    render: function () {

        var options = this.props.options.map(function (item) {
            return '<option value="' + item + '">' + item + '</option>';
        });

        return (
            <select className={this.getClass()} dangerouslySetInnerHTML={{__html: options}} multiple={this.props.multiple} name={this.props.name}/>
        );
    }
});
