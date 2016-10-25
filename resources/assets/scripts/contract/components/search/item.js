import React, {Component} from "react";
import Contract from "../../contract";
import {nl2br} from "../../helper";
import Event from '../../event';

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            maxWords: 30,
            shortText: '',
            text: '',
            showEllipse: '',
            showMoreFlag: ''
        });
    }

    componentWillMount() {
        var text = this.props.result.text;
        var showEllipse = this.shallShowEllipse(text);
        var shortText = "";
        if (showEllipse) {
            shortText = this.truncate(text);
        }

        this.setState({
            text: text,
            showEllipse: showEllipse,
            shortText: shortText,
            showMoreFlag: true
        });
    }

    handleClick() {
        if (this.props.result.type == 'annotation') {
            Contract.setIsSearch(true);
            location.hash = "#/" + this.props.result.annotation_type + "/page/" + this.props.result.page_no + "/annotation/" + this.props.result.annotation_id;
        } else if (Contract.getView() == 'pdf' && this.props.result.type == 'text') {
            Contract.setIsSearch(true);
            Contract.setCurrentPage(this.props.result.page_no);
            location.hash = "#/text";
        } else {
            Contract.setIsSearch(true);
            Event.publish('pagination:change', this.props.result.page_no);
            Contract.setIsSearch(false);
        }
    }

    truncate(text) {
        var words = (text + "").split(" ");
        words = words.splice(0, this.state.maxWords);

        return words.join(" ");
    }

    shallShowEllipse(text) {
        var words = (text + "").split(' ');
        if (words.length >= (this.state.maxWords + 10)) {
            return true;
        }
        return false;
    }

    handleClickLessMore(e) {
        e.preventDefault();
        this.setState({showMoreFlag: !this.state.showMoreFlag});
    }

    annotationText() {
        var more = '';
        var texToShow = "";
        var text = this.props.result.text;

        if (this.state.showMoreFlag && this.state.shortText.length > 0) {
            texToShow = this.state.shortText + '...';
            more = LANG.more;
        }
        if (!this.state.showMoreFlag && text.length > 0) {
            texToShow = text;
            more = LANG.less;
        }
        if (texToShow.length == 0) {
            texToShow = text;
        }
        more = (<a onClick={this.handleClickLessMore.bind(this)}> {more}</a>);
        return (
            <span className="link">
                <span onClick={this.handleClick.bind(this)}
                      dangerouslySetInnerHTML={{__html: texToShow}}/>
                {more}
            </span>
        );
    }

    pdfText() {
        return (
            <span className="link" onClick={this.handleClick.bind(this)}>
                <strong>Pg {this.props.result.page_no} </strong>
                <span dangerouslySetInnerHTML={{__html: this.props.result.text}}/>
            </span>
        );
    }

    getText() {

        if (this.props.result.type == 'annotation') {
            return this.annotationText();
        }

        if (this.props.result.type == 'text') {
            return this.pdfText();
        }
    }

    getType() {
        var titleText = (this.props.result.type == 'text') ? LANG.text : LANG.annotation;
        var className = (this.props.result.type == 'text') ? 'text' : 'annotations';

        return (<span className={className} title={titleText}></span>);
    }

    render() {
        return (
            <div className="search-result-row">
                {this.getText()}
                {this.getType()}
            </div>
        );
    }
}

export default Item;