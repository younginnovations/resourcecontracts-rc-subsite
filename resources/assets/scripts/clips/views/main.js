var ClipView = React.createClass({
    render: function () {
        return (
            <div>
                <DownloadManager clipCollection={this.props.clipCollection}/>
                <Listing clipCollection={this.props.clipCollection}/>
            </div>
        );
    }
});