import React, {Component} from "react";
import Config from '../config';

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            active: false
        })
    }

    clickHandler(e) {
        e.preventDefault();
        this.setState({active: !this.state.active})
    }

    componentDidMount() {
        let self = this;
        $(document).click(function (event) {
            if (!$(event.target).closest('.download-dropdown').length && !$(event.target).is('.download-dropdown')) {
                if ($('.download-dropdown').is(":visible")) {
                    self.setState({active: false});
                }
            }
        });
    }

    pdf() {
        if (Config.download.pdf == '') {
            return null;
        }
        return (<li><a href={Config.download.pdf}>{lang.pdf}</a></li>);
    }

    text() {
        if (Config.download.text == '') {
            return null;
        }
        return (<li><a href={Config.download.text}>{lang.word_file}</a></li>);
    }

    annotation() {
        if (Config.download.annotation == '') {
            return null;
        }
        return (
            <li>
                <a href={Config.download.annotation}>
                    <div dangerouslySetInnerHTML={{__html: annotationTerms.langAnnotation.annotations_excel}}/>
                </a>
            </li>);
    }

    render() {
        let show = {'display': 'block'};
        let hide = {'display': 'none'};
        let style = this.state.active ? show : hide;
        return (
            <div className="download-dropdown">
                <a href="#" onClick={this.clickHandler.bind(this)}><span>{lang.download}</span></a>
                <ul className="dropdown-menu" style={style}>
                    {this.pdf()}
                    {this.text()}
                    {this.annotation()}
                </ul>
            </div>
        );
    }
}

export default Download;


