import React, {Component} from "react";
import Contract from "../contract";

class Title extends Component {

    constructor(props) {
        super(props);
        this.state = ({title: ''});
    }

    componentWillMount() {
        this.setState({title:Contract.metadata.name});
    }

    render() {
        return (
            <div className="col-lg-12 panel-top-wrapper attached-top-wrapper">
                <div className="panel-top-content">
                    <div className="pull-left clearfix left-top-content">
                        <div className="back back-button">Back</div>
                        <div className="panel-title" id="show-full-title">
                            {this.state.title}
                        </div>
                    </div>

                    <div className="pull-right action-links">
                        <ul>
                            <li><a href={Contract.getSummaryUrl()} className="view-summary-btn" >{LANG.see_summary}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Title;