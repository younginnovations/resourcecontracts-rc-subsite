import React, {Component} from "react";
import Contract from '../../contract';

var Link = React.createClass({
    getInitialState () {
        return {
            type: '',
            annotation: {},
            last: false,
            page: 0,
            article_reference: ''
        }
    },
    componentWillReceiveProps(props) {
        this.setPageState(props);
    },
    componentWillMount() {
        this.setPageState(this.props);
    },
    setPageState (props) {
        var type = "text";

        if (props.annotation.shapes) {
            type = "pdf";
        }

        this.setState({
            annotation: props.annotation,
            type: type,
            last: props.last,
            page: props.page,
            article_reference: props.article_reference
        });
    },
    getLink () {

    },
    clickHandler(e)
    {
        e.preventDefault();

        var link = '#/text/page/' + this.state.annotation.page_no + '/annotation/' + this.state.annotation.id;

        if (this.state.type == "pdf") {
            link = '#/pdf/page/' + this.state.annotation.page_no + '/annotation/' + this.state.annotation.id;
        }

        if (Contract.getView() == this.state.type && this.state.type == 'pdf') {
            if (Contract.getCurrentPage() == this.state.annotation.page_no && this.state.annotation.id == Contract.getCurrentAnnotation()) {
                Contract.showPopup(this.state.annotation.id);
            } else if (Contract.getCurrentPage() == this.state.annotation.page_no) {
                window.location.href = link;
                Contract.showPopup(this.state.annotation.id);
            } else {
                window.location.href = link;
            }
        } else {
            if (Contract.getCurrentPage() == this.state.annotation.page_no) {
                Contract.showPopup(this.state.annotation.id);
            }
            window.location.href = link;
        }

    },
    render () {
        var displayText = this.state.page;

        if (this.state.article_reference != '') {
            displayText = this.state.article_reference;
        }

        return (
            <span className="page-gap">
                <a onClick={this.clickHandler} href="#"  data-target="view-container">{displayText}</a>
                {this.state.last ? ', ' : ''}
            </span>
        )
    }
});

export default Link