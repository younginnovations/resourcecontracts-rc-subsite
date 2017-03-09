var ShareManager = React.createClass({
    getInitialState: function () {
        return {
            dropdown: false,
            view: {showModal: false},
            facebook_url: 'https://www.facebook.com/sharer/sharer.php?u=',
            twitter_url: 'https://twitter.com/share?text=',
            clipKey: ''
        };
    },
    componentDidMount: function () {
        var self = this;
        this.setState({clipKey: this.props.clipKey});
        $(document).click(function (event) {
            if (!$(event.target).closest('.social-share').length && !$(event.target).is('.social-share')) {
                if ($('.social-share').is(":visible")) {
                    self.setState({dropdown: false});
                }
            }
        });
    },
    componentWillReceiveProps: function (props) {
        this.setState({clipKey: props.clipKey});
    },
    getShareUrl: function () {
        return app_url + '/clip/' + this.state.clipKey;
    },
    getFacebookShare: function () {
        return this.state.facebook_url + this.getShareUrl();
    },
    getTwitterShare: function () {
        return this.state.twitter_url + document.title + '&url=' + this.getShareUrl();
    },
    toggleDropdown: function () {
        this.setState({dropdown: !this.state.dropdown})
    },
    render: function () {
        var show = {'display': 'block'};
        var hide = {'display': 'none'};
        var style = this.props.showSharedropdown ? show : hide;

        if (this.state.clipKey == null) {
            return null;
        }
        return (
            <div className="clipShare">
                <ul className="social-toggle" style={style}>
                    <li className="facebook"><a href={ this.getFacebookShare()} target="_blank"></a></li>
                    <li className="twitter"><a href={ this.getTwitterShare()} target="_blank"></a></li>
                    <li className="email">
                        <a href="#email"
                           className="shareEmailToggler"
                           data-toggle="modal"
                           data-target="#emailModel"
                           data-title={ langClip.shareViaEmail }></a>
                    </li>
                </ul>

            </div>
        );
    }
});