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
        return this.state.twitter_url + this.getShareUrl();
    },
    handleHideModal: function () {
        console.log("show modal");
        this.setState({view: {showModal: false}})
    },
    handleShowModal: function () {
        this.setState({view: {showModal: true}})
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
            <div>
                <ul className="social-toggle" style={style}>
                    <li className="facebook"><a href={ this.getFacebookShare()} target="_blank">Facebook </a></li>
                    <li className="twitter"><a href={ this.getTwitterShare()} target="_blank"> Twitter </a></li>
                    <li className="email"><a onClick={this.handleShowModal}>Email</a></li>
                </ul>
                {this.state.view.showModal ? <Email url={this.getShareUrl()} handleHideModal={this.handleHideModal}/> : null}
            </div>
        );
    }
});

var Email = React.createClass({
    getInitialState: function () {
        return {
            to: '',
            from: '',
            subject: langClip.subjectClip,
            body: '',
            url: '',
            errors: [],
            processing: false
        };
    },
    componentDidMount: function () {
        this.setState({url: this.props.url});
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var formData = {
            to: this.state.to,
            from: this.state.from,
            subject: this.state.subject,
            body: this.state.body,
            url: this.state.url
        };
        this.state.errors = [];
        $('div.alert').remove();
        this.postFormData(formData, e.target);
    },
    setError: function (key, err) {
        var errors = this.state.errors;
        errors.push({key: key, error: (<span className="required">{err}</span>)});
        this.setState({errors: errors});
    },
    getError: function (key) {
        var error = '';
        this.state.errors.map(function (v, k) {
            if (v.key == key) {
                error = v.error;
            }
        });

        return error;
    },
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    isValidEmails: function (emails) {
        emails = emails.split(',');
        var valid = 0;
        var self = this;
        emails.map(function (val) {
            if (!self.validateEmail(val.trim())) {
                valid = valid + 1;
            }
        });

        return valid == 0;
    },
    validate: function () {
        if (this.state.to == '' || !this.isValidEmails(this.state.to)) {
            this.setError('to', langClip.emailError);
        }

        if (this.state.from == '' || !this.validateEmail(this.state.from)) {
            this.setError('from', langClip.emailError);
        }

        if (this.state.subject == '') {
            this.setError('subject', langClip.subjectError);
        }

        if (this.state.body == '') {
            this.setError('body', langClip.messageError);
        }

        return this.state.errors.length > 0;
    },
    postFormData: function (formData) {
        if (this.validate() || this.state.processing) {
            return false;
        }
        this.setState({errors: [], processing: true});
        var self = this;
        $.ajax({
            type: "POST",
            url: app_url + '/clip/email',
            data: formData
        }).error(function () {
            $('.email-result').append("<div class='alert alert-danger'>{langClip.wrongError}</div>");
            self.setState({
                processing: false
            });
        }).success(function (res) {
            if (res.status) {
                $('.email-result').append("<div class='alert alert-success'>" + res.message + "</div>");
            } else {
                $('.email-result').append("<div class='alert alert-danger'>" + res.message + "</div>");
            }
            self.setState({
                to: '',
                processing: false
            });
        })
    },
    render: function () {
        var self = this;
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">{langClip.shareViaEmail}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="email-result"></div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label for="to">{langClip.to}</label>
                                    <input id="to" type="text"
                                           onChange={function(e) {self.setState({to:e.target.value})}}
                                           value={this.state.to} className="form-control"/>
                                    {this.getError('to')}
                                </div>
                                <div className="form-group">
                                    <label for="from">{langClip.from}</label>
                                    <input id="from" type="text"
                                           onChange={function(e) {self.setState({from:e.target.value})}}
                                           value={this.state.from} className="form-control"/>
                                    {this.getError('from')}
                                </div>
                                <div className="form-group">
                                    <label for="subject">{langClip.subject}</label>
                                    <input type="text" id="subject"
                                           onChange={function(e) {self.setState({subject:e.target.value})}}
                                           value={this.state.subject} className="form-control"/>
                                    {this.getError('subject')}
                                </div>
                                <div className="form-group">
                                    <label for="body">{langClip.message}</label>
                                    <textarea id="body" type="text"
                                              onChange={function(e) {self.setState({body:e.target.value})}}
                                              value={this.state.body} className="form-control"/>
                                    {this.getError('body')}
                                </div>
                                <div className="form-group url-wrap">
                                    URL : <a target="_blank" href={this.state.url}> {this.state.url}</a>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className="btn" disabled={this.state.processing}
                                           value={langClip.sendEmail}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    propTypes: function () {
        handleHideModal: React.PropTypes.func.isRequired
    }
});