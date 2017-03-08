import React, {Component} from "react";
import { Link } from 'react-router'
import  Event from '../event';
import Contract from '../contract';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = ({activeTextClass: ''});
    }

    componentWillMount() {
        this.activeTab(Contract.getView());
    }

    componentDidMount() {
        this.subscription = Event.subscribe('route:location', view => {
            this.activeTab(view);
        });
    }

    activeTab(view) {
        if (view == 'text') {
            this.setState({activeTextClass: 'active'});
        } else {
            this.setState({activeTextClass: ''});
        }

        if (view == 'pdf') {
            this.setState({activePdfClass: 'active'});
        } else {
            this.setState({activePdfClass: ''});
        }
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    render() {
        return (
            <div className="navigation">
                <Link to="/text" data-target="view-container"
                      className={"tab tab-text " + this.state.activeTextClass }>{LANG.text}</Link>
                <Link to="/pdf" data-target="view-container"
                      className={"tab tab-pdf " + this.state.activePdfClass }>{LANG.pdf}</Link>
                <Link to="/annotations" data-target="annotations"
                      className="tab tab-annotations">{LANG.annotation_count}</Link>
                <Link to="/metadata" data-target="metadata"
                      className="tab tab-metadata">{LANG.metadata}</Link>
            </div>
        );
    }
}

export default Tab;