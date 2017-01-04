import React, {Component} from "react";

class Cluster extends Component {
    constructor(props) {
        super(props);
        this.state = ({show: false})
    }

    handleClick(cluster, e) {
        e.preventDefault();
        var selected = cluster;
        if (selected == 'All') {
            $('.annotation-item').show();
        } else {
            $('.annotation-item').hide();
            $('.' + selected).show();
        }
        $(".annotations-topic-list > span").removeClass("selected-topic");
        $(e.target).addClass("selected-topic");
    }

    render() {
        return (
            <div className="annotations-topic-list">
                <span className="selected-topic"
                    onClick={this.handleClick.bind(this,'All')}
                    data-toggle="popover"
                    data-title={langGlossary.contract_view.see_all}>
                    {LANG.all}</span>
                <span onClick={this.handleClick.bind(this,'general')}
                    data-toggle="popover"
                    data-title={langGlossary.contract_view.general}>
                    {LANG.general}</span>
                <span onClick={this.handleClick.bind(this,'environment')}
                    data-toggle="popover"
                    data-title={langGlossary.contract_view.environment}>
                    {LANG.environment}</span>
                <span onClick={this.handleClick.bind(this,'fiscal')}
                    data-toggle="popover"
                    data-title={langGlossary.contract_view.fiscal}>
                    {LANG.fiscal}</span>
                <span onClick={this.handleClick.bind(this,'operations')}
                      data-toggle="popover"
                      data-title={langGlossary.contract_view.operations}>
                      {LANG.operations}</span>
                <span onClick={this.handleClick.bind(this,'social')}
                      data-toggle="popover"
                      data-title={langGlossary.contract_view.social}>
                      {LANG.social}</span>
                <span onClick={this.handleClick.bind(this,'legal_rules')}
                      data-toggle="popover"
                      data-title={langGlossary.contract_view.legal_rules}>
                      {LANG.legal_rules}</span>
            </div>
        );
    }
}

export default Cluster;