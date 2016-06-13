'use strict';
import React, {Component} from "react";
import Event from './Event';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = ({type: 'info', text: ''});
    }

    componentDidMount() {
        Event.subscribe('alert', value => {
            this.setState({type: value[0], text: value[1]});
        })
    }

    message() {
        return {__html: this.state.text};
    }

    render() {
        if (this.state.text != '') {
            return (
                <div className={'alert' + ' alert-'+this.state.type}><p dangerouslySetInnerHTML={this.message()}/></div>
            );
        }
        else {
            return null;
        }

    }
}

export default Alert;