import React from "react";
import axios from "axios";

export default class ShareManager extends React.Component{

    constructor( props ){
        super( props );
        this.state = {
            url:'',
            subject:'Clipped Annotations from ResourceContracts.org',
            to: '',
            from: '',
            body: '',
            errors: [],
            processing: false,
            emailSent:false,
            showModal:true
        }
    }
    componentWillMount(){
        this.setState({
            url: app_url + '/clip/' + this.props.url
        });

    }

    componentDidMount(){
        $('#shareModal').on('hide.bs.modal', function (e) {
            this.setState({
                showModal:false
            })
        })
    }
    componentWillUnmount(){
        this.setState({
            to: '',
            from: '',
            showModal:true
        })
    }

    handleSubmit =( e )=>{
        e.preventDefault();


        if( this.state.processing ){
            return false
        }
        this.setState({
            errors: [],
            processing: true
        });

        let formData = {
            to: this.state.to,
            from: this.state.from,
            subject: this.state.subject,
            body: this.state.body,
            url: this.state.url
        };


        this.postFormData( formData );

    }

    postFormData=( formData )=>{
        this.setState({
            emailSent: false
        });
        if( !this.isValidData() ){
            this.setState({
                processing: false,
                emailSent: false
            });
            return false
        }

        let self = this;

        axios.post( app_url + '/clip/email' ,formData )
            .then( (response)=>{
                console.log( response );
                self.setState({
                    processing: false,
                    emailSent: true
                });
            })
            .catch( (error) =>{
                console.log( error );
            })
    }



    isValidData =()=>{
        return this.validate()?false:true;
    }
    validate =()=>{
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

        return this.state.errors.length;
    }

    isValidEmails=( emails )=>{
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

    validateEmail=( email )=>{
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    setError= ( key, err ) =>{
        var errors = this.state.errors;
        errors.push({key: key, error: (<span className="required">{err}</span>)});
        this.setState({errors: errors});
    }
    getError=(key) =>{
        var error = '';
        this.state.errors.map(function (v, k) {
            if (v.key == key) {
                error = v.error;
            }
        });

        return error;
    }

    render() {
        if( !this.state.showModal ){
            return null
        }
        return (
            <div className="modal fade" id="shareModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">{langClip.shareViaEmail}</h4>
                        </div>
                        <div className="modal-body">
                            { this.state.emailSent?<div className='alert alert-success'>Email Sent.</div>:"" }
                            <form onSubmit={ this.handleSubmit }>
                                <div className="form-group">
                                    <label for="to">{langClip.to}</label>
                                    <input id="to" type="text"
                                           className="form-control"
                                           onChange={ ( e )=>{ this.setState({ to: e.target.value })}}
                                    />
                                    {this.getError('to')}
                                </div>
                                <div className="form-group">
                                    <label for="from">{langClip.from}</label>
                                    <input id="from" type="text"
                                           className="form-control"
                                           onChange={ ( e )=>{ this.setState({ from: e.target.value })}}
                                    />
                                    {this.getError('from')}
                                </div>
                                <div className="form-group">
                                    <label for="subject">{langClip.subject}</label>
                                    <input type="text" id="subject"
                                           className="form-control"
                                           value={ this.state.subject }
                                           onChange={ ( e )=>{ this.setState({ subject: e.target.value })}}
                                    />
                                    {this.getError('subject')}
                                </div>
                                <div className="form-group">
                                    <label for="body">{langClip.message}</label>
                                    <textarea id="body" type="text"
                                              className="form-control"
                                              onChange={ ( e )=>{ this.setState({ body: e.target.value })}}
                                    />
                                    {this.getError('body')}
                                </div>
                                <div className="form-group url-wrap">
                                    URL : <a target="_blank">{ this.state.url }</a>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className="btn"
                                           disabled={ this.state.processing }
                                           value={ this.state.processing?"Processing...":langClip.sendEmail}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
