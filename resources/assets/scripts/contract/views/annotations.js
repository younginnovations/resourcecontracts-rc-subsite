import React, {Component} from "react";
import Contract from '../contract';
import {scrollToAnnotation} from '../helper';

import Header from '../components/annotation/heading';
import Sort from '../components/annotation/sort';
import Cluster from '../components/annotation/cluster';
import List from '../components/annotation/list';
import Reflux from "reflux";
import AnnotationStore from '../stores/annotationStore';
import AnnotationActions from '../actions/annotationAction';
import Event from '../event';

var Annotations = React.createClass({
    mixins: [Reflux.listenTo(AnnotationStore, 'onChange')],
    getInitialState() {
        return {
            isLoading: true,
            annotations: [],
            sortBy: 'cluster',
            selectedAnnotation: 0,
            total: 0,
            message: LANG.loading_annotations,
            display: false
        }
    },
    scrollToTop(e) {
        e.preventDefault();
        $('.annotations-viewer').animate({scrollTop: 0}, 500);
    },
    componentWillMount()
    {
        var name = Contract.getView();
        if (name == 'search') {
            this.setState({'display': false});
        } else {
            this.setState({'display': true});
        }
    },
    componentDidMount() {
        AnnotationActions.getList(Contract.getGuid());

        this.subscribeHightlight = Event.subscribe('annotation:highlight', annotation => {
            debug('annotation annotation:highlight listening', annotation);
            var id = annotation;
            if (typeof annotation == 'object') {
                id = annotation.id;
            }
            scrollToAnnotation(id);
            this.setState({selectedAnnotation: id});
        });

        this.subscribeSort = Event.subscribe('sort:change', type => {
            this.setState({sortBy: type});
            debug('annotation list sort:change listening', type);
        });

        this.subscribeLocation = Event.subscribe('route:location', name => {
            if (name == 'search') {
                this.setState({'display': false});
            } else {
                this.setState({'display': true});
            }
            AnnotationActions.getList(Contract.getGuid());
        });

        $(window).on('hashchange', () => {
            var hash = window.location.hash;
            var annotation_id = 0;
            if (hash != '' && typeof hash.split('annotation/')[1] !== 'undefined') {
                annotation_id = hash.split('annotation/')[1];
            }
            if (annotation_id > 0) {
                scrollToAnnotation(annotation_id);
                this.setState({selectedAnnotation: annotation_id});
            }
        });
    },
    componentWillUnmount(){
        this.subscribeHightlight.remove();
        this.subscribeSort.remove();
        this.subscribeLocation.remove();
    },
    onChange (event, response) {
        this.setState({annotations: response.result, total: response.total, isLoading: false})
    },
    render() {
        if (!this.state.display) {
            return null;
        }

        var sort = this.state.total > 0 ? (<Sort type={this.state.sortBy}/>) : null;
        return (
            <div id="annotations" className="annotations-viewer">
                <div className="annotation-inner-viewer" id="annotations-box">
                    <Header total={this.state.total}/>
                    {sort}
                    <List annotations={this.state.annotations} selectedAnnotation={this.state.selectedAnnotation}
                          sort={this.state.sortBy}/>
                </div>
                <a href="#" className="back-to-top btn btn-primary"><i className="fa fa-arrow-up"></i></a>
            </div>
        );
    }
});

export default Annotations;