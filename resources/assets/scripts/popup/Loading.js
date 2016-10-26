'use strict';
import React, {Component} from "react";
import Event from './Event';
import {loading_image} from './Helper';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = ({loading: false, text: 'Loading...'});
    }

    componentDidMount() {
        Event.subscribe('loading', value => {
            if (typeof value == 'boolean') {
                this.setState({loading: value});
            } else {
                this.setState({loading: value[0], text: value[1]});
            }
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loading">
                    <p>
                        {this.state.text}
                    </p>
                </div>
            );
        }
        else {
            return null;
        }

    }
}

export default Loading;