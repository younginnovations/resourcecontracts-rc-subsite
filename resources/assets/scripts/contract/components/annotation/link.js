import React, {Component} from "react";

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
        if (this.state.type == "pdf") {
            return '#/pdf/page/' + this.state.annotation.contract_id + '/annotation/' + this.state.annotation.id;
        }

        return '#/text/page/' + this.state.annotation.contract_id + '/annotation/' + this.state.annotation.id;
    },
    render () {
        var displayText = this.state.page;

        if (this.state.article_reference != '') {
            displayText = this.state.article_reference;
        }

        return (
            <span className="page-gap">
                <a href={this.getLink()}>{displayText}</a>
                {this.state.last ? ', ' : ''}
            </span>
        )
    }
});

export default Link