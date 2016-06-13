'use strict';
import React from "react";
import Event from "./Event";

const Zoom = React.createClass({
    getInitialState() {
        return {minScale: 0.50, maxScale: 2, currentScale: 1};
    },

    out(e){
        e.preventDefault();
        this.setScale(this.state.currentScale + 0.25);
    },

    in(e){
        e.preventDefault();
        this.setScale(this.state.currentScale - 0.25);
    },

    setScale(num)
    {
        if (num >= this.state.minScale && num <= this.state.maxScale) {
            this.setState({currentScale: num});
            Event.publish('zomm.scale', {scale: num})
        }
    },

    getPercentage()
    {
        return this.state.currentScale * 100 + '%';
    },

    render()
    {
        return (
            <div>
                <a className="btn btn-default" href="#" onClick={this.out}>+</a>
                <span>{this.getPercentage()}</span>
                <a className="btn btn-default" href="#" onClick={this.in}>-</a>
            </div>
        )
    }
});

export default Zoom;
