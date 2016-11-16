import React, {Component} from "react";
import ReactDOM from "react-dom";

import Config from '../config';

class Email extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            to: '',
            from: '',
            subject: '',
            body: '',
            url: '',
            errors: [],
            processing: false
        })
    }

    componentDidMount() {
        var pageTitle = document.title;
        var url = window.location.href;
        this.setState({url: url, subject: pageTitle});
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
    }

    handleSubmit(e) {
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
    }

    setError(key, err) {
        var errors = this.state.errors;
        errors.push({key: key, error: (<span className="required">{err}</span>)});
        this.setState({errors: errors});
    }

    getError(key) {
        var error = '';
        this.state.errors.map(function (v, k) {
            if (v.key == key) {
                error = v.error;
            }
        });

        return error;
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    isValidEmails(emails) {
        emails = emails.split(',');
        var valid = 0;
        var self = this;
        emails.map(function (val) {
            if (!self.validateEmail(val.trim())) {
                valid = valid + 1;
            }
        });

        return valid == 0;
    }

    validate() {
        if (this.state.to == '' || !this.isValidEmails(this.state.to)) {
            this.setError('to', 'Please enter valid email address.');
        }

        if (this.state.from == '' || !this.validateEmail(this.state.from)) {
            this.setError('from', 'Please enter valid email address.');
        }

        if (this.state.subject == '') {
            this.setError('subject', 'Subject is required');
        }

        if (this.state.body == '') {
            this.setError('body', 'Message is required');
        }

        return this.state.errors.length > 0;
    }

    postFormData(formData) {
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
            $('.email-result').append("<div class='alert alert-danger'>Something went wrong.</div>");
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
    }

    render() {
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
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label for="emailto">{langClip.to}</label>
                                    <input type="text" onChange={function(e) {self.setState({to:e.target.value})}}
                                           value={this.state.to} className="form-control"/>
                                    {this.getError('to')}
                                </div>
                                <div className="form-group">
                                    <label for="emailfrom">{langClip.from}</label>
                                    <input type="text"
                                           onChange={function(e) {self.setState({from:e.target.value})}}
                                           value={this.state.from} className="form-control"/>
                                    {this.getError('from')}
                                </div>
                                <div className="form-group">
                                    <label for="subject">{langClip.subject}</label>
                                    <input type="text" onChange={function(e) {self.setState({subject:e.target.value})}}
                                           value={this.state.subject} className="form-control"/>
                                    {this.getError('subject')}
                                </div>
                                <div className="form-group">
                                    <label for="emailbody">{langClip.message}</label>
                                    <textarea type="text" onChange={function(e) {self.setState({body:e.target.value})}}
                                              value={this.state.body} className="form-control"/>
                                    {this.getError('body')}
                                </div>
                                <div className="form-group url-wrap">
                                    URL : <a target="_blank" href={this.state.url}> {this.state.url}</a>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className="btn"
                                           value={this.state.processing ? langClip.sending : langClip.sendEmail}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    propTypes() {
        handleHideModal: React.PropTypes.func.isRequired
    }
}

export default Email;
