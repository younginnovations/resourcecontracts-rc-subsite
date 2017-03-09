import React, {Component} from "react";
import {nl2br} from '../../helper';
import Link from './link';
import {scrollToAnnotation,transCategory} from '../../helper';
import _sortBy from 'lodash/sortBy';
import _groupBy from 'lodash/groupBy';
import _toArray from 'lodash/toArray';
import ClipButton from '../clip/button';
import Config from '../../config';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            maxWords: 20,
            text: '',
            shortText: '',
            showEllipse: '',
            showMoreFlag: '',
            active: false,
            parent: {},
            key: null,
            sortBy: null,
            annotation: []
        });
    }

    componentWillReceiveProps(props) {
        this.setupAnnotation(props);
    }

    componentWillMount() {
        this.setupAnnotation(this.props);
    }

    setupAnnotation(props) {
        var parent = props.annotation[0];
        var text = parent.text ? parent.text.trim() : '';
        var showEllipse = this.shallShowEllipse(text);
        var shortText = "";
        if (showEllipse) {
            shortText = this.truncate(text);
        }
        this.setState(
            {
                text: text,
                shortText: shortText.trim(),
                showEllipse: showEllipse,
                showMoreFlag: props.active,
                active: props.active,
                annotation: props.annotation,
                parent: parent,
                key: props.key,
                sortBy: props.sortBy
            }
        );
    }

    getCategory() {
        return transCategory(this.state.parent.category_key, this.state.parent.category);
    }

    shallShowEllipse(text) {
        var words = (text).split(' ');

        if (words.length >= (this.state.maxWords + 10)) {
            return true;
        }

        return false;
    }

    truncate(text) {
        var words = (text + "").split(" ");
        words = words.splice(0, this.state.maxWords);
        return words.join(" ");
    }

    getPages() {
        var annotation = _sortBy(this.state.annotation, function (a) {
            return a.page_no;
        });
        var annotationGroupByPage = _groupBy(annotation, function (a) {
            return a.page_no;
        });
        annotationGroupByPage = _toArray(annotationGroupByPage);
        var length = annotationGroupByPage.length;
        return annotationGroupByPage.map(function (annotation, index) {
            var page = annotation[0].page_no;
            var last = false;
            if (index < (length - 1)) {
                last = true;
            }
            var count = annotation.length;
            var ref = annotation.map(function (annotation, index) {
                var l = false;
                if (index < (count - 1)) {
                    l = true;
                }
                var article_reference = (annotation.article_reference != '') ? annotation.article_reference : '';
                return (<Link annotation={annotation} last={l} page={page} article_reference={article_reference}/>)
            });

            return (
                <span className="page-num-wrapper"> {LANG.page} {page} ({ref}){last ? ', ' : ''}</span>
            );
        });
    }

    handleEllipsis(e) {
        e.preventDefault();
        this.setState({showMoreFlag: !this.state.showMoreFlag});
        scrollToAnnotation(this.state.parent.id);
    }

    getShowText() {
        if (this.state.text == '') {
            return null;
        }

        var ellipsis_text = "";
        var showText = this.state.text;
        if (this.state.showEllipse) {
            showText = this.state.text + ' ';
            ellipsis_text = LANG.less;
            if (!this.state.showMoreFlag) {
                ellipsis_text = LANG.more;
                showText = this.state.shortText + '... ';
            }
        }
        showText = {__html: nl2br(showText)};
        return (
            <span className="annotation-item-content active">
                <span dangerouslySetInnerHTML={showText}/>
                <nobr>
                    <a className="annotation-item-ellipsis" href="#" onClick={this.handleEllipsis.bind(this)}>
                        {ellipsis_text}
                    </a>
                </nobr>
            </span>
        );
    }

    getPageClasses() {
        var className = "";
        this.state.annotation.forEach(function (annotation) {
            className += ' p-' + annotation.id;
        });

        return className;
    }

    getCluster() {
        var str = this.state.parent.cluster;
        if (str.length < 1) {
            return '';
        }
        return str.toLowerCase().trim().replace(' ', '_');
    }

    render() {
        let currentAnnotationClass = (this.state.active) ? "annotation-item selected-annotation" : "annotation-item";
        let category = this.getCategory();
        //let clipButton = Config.isClipOn ? <ClipButton id={this.state.parent.annotation_id}/> : null;
        return (
            <div className={currentAnnotationClass +' ' +this.getCluster() + this.getPageClasses()}
                 id={this.state.parent.annotation_id}>
                <ClipButton id={this.state.parent.annotation_id}/>
                <p className="category">{category}</p>
                <p className="annotated-text">{this.getShowText()}</p>
                <div className="annotation-page">{this.getPages()}</div>
            </div>
        )
    }
}

export default Item;