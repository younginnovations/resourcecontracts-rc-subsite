var ClipView = React.createClass({
    render: function () {
        return (
            <div>
                <DownloadManager clipCollection={this.props.clipCollection} clipLocal={this.props.clipLocal}/>
                <Listing clipCollection={this.props.clipCollection}/>
            </div>
        );
    }
});