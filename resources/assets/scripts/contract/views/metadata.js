import React, {Component} from "react";
import Reflux from "reflux";
import MetadataAction from '../actions/metadataAction';
import MetadataStore from '../stores/metadataStore';
import Config from '../config';
import {getCountryName, truncate, isSite} from "../helper";

var Metadata = React.createClass({
    mixins: [Reflux.listenTo(MetadataStore, 'onChange')],
    getInitialState() {
        return {
            loading: true,
            showMoreText: false,
            metadata: {},
            maxWord: 20,
            MaxAllowedRelatedDocument: 3
        }
    },
    componentWillMount: function () {
        MetadataAction.getData();
    },
    onChange(action, data){
        if (action == 'metadata:loaded') {
            this.setState({metadata: data, loading: false});
        }
    },
    getCountry(more = false) {
        if (isSite('country')) {
            return null;
        }
        var code = this.state.metadata.country.code.toLowerCase();
        var link = Config.APP_URL + "/countries/" + code;
        if (more) {
            return (<div className="metadata-ocid">
                <span>{LANG.more_from} <a href={link}>{getCountryName(code)}</a></span>
            </div>);
        } else {
            return (<div className="metadata-ocid">
                <span>{LANG.country}</span>
                {getCountryName(code)}
            </div>);
        }
    },
    getSignatureYear()
    {
        var year = this.state.metadata.year_signed;
        if (year != '') {
            return year;
        }
        return '<span>-</span>';
    },
    getContractType()
    {
        var ct = this.state.metadata.contract_type;

        return ct.map(function (contractType, i) {
            var sep = '';
            if (i != ct.length - 1) {
                sep = ' | ';
            }
            return (<span>{contractType} {sep}</span>);
        });
    },
    handleMoreText(e) {
        e.preventDefault();
        this.setState({showMoreText: !this.state.showMoreText});
    },
    getNote(){
        var note = this.state.metadata.note;
        var noteHtml = '';
        if (note != "") {
            noteHtml += "<span class='metadata-note'>" + LANG.note + "</span>";
            if (!this.state.showMoreText) {
                var noteArray = note.split(' ');
                var more = '';
                if (noteArray.length > this.state.maxWord) {
                    note = noteArray.slice(0, this.state.maxWord).join(' ') + '... ';
                    more = (<a className="ellipsis" href="#"
                               onClick={this.handleMoreText}>{{__html: LANG.note_more}}</a>);
                }
            } else {
                more = (
                    <a className="ellipsis" href="#" onClick={this.handleMoreText}>{{__html: LANG.note_less}}</a>);
            }
            noteHtml += '<span class="note">' + note + '</span>';
            noteHtml = (<span className="note-inner-wrapper" dangerouslySetInnerHTML={{__html: noteHtml}}/>);
            return noteHtml;
        }

        return null;
    },
    getResource(more = false) {
        var resources = this.state.metadata.resource;
        var resourceCount = resources.length;
        return resources.map(function (value, index) {
            var link = Config.APP_URL + "/resource/" + encodeURIComponent(value);
            var text = LANG.resourceLang[value];
            var sep = '';
            if (index != resourceCount - 1) {
                sep = ' | ';
            }
            if (typeof text == 'undefined') {
                text = value;
            }
            if (more) {
                return (<span><a href={link}>{text}</a> {sep}</span>);
            }
            return (<span>{text} {sep}</span>);
        });
    },
    getAnnexesMissing(){
        var annexes_missing = null;
        if (this.state.metadata.is_annexes_missing) {
            annexes_missing = (<div className="metadata-ocid">
                <span>{LANG.annexes_missing}</span>
                <span>{LANG.yes}</span>
            </div>);
        }
        return annexes_missing;
    },
    getPagesMissing(){
        var pages_missing = null;
        if (this.state.metadata.is_pages_missing) {
            pages_missing = (<div className="metadata-ocid">
                <span>{LANG.pages_missing}</span>
                <span>{LANG.yes}</span>
            </div>);
        }
    },
    getAmlaLink () {
        var link = null;
        var amla_url = this.state.metadata.amla_url;
        if (amla_url != '' && (isSite('country') || isSite('rc'))) {
            link = LANG.see + '<a href="' + amla_url + '" target="_blank" > ' + LANG.legislation + ' </a> ' + LANG.african_mining;
            return (<span className="metadata-ocid" dangerouslySetInnerHTML={{__html: link}}/>);
        } else {
            return null;
        }
    },
    getLandMatrix()
    {
        var id = '-';

        if (this.state.metadata.deal_number) {
            id = '#' + this.state.metadata.deal_number;
        }

        if (isSite('olc')) {
            return (
                <div className="metadata-ocid">
                    <span>{LANG.land_matrix_id}</span>
                    <a target="_blank" href={this.state.metadata.matrix_page}>{id}</a>
                </div>
            );
        }
        else {
            return null;
        }
    },
    getRelatedDocuments: function () {
        var parentContracts = "",
            supportingContracts = [],
            moreContracts = "";
        if (!this.state.metadata.parent) {
            return null;
        }
        parentContracts = this.state.metadata.parent.map(function (doc) {
            var docUrl = Config.APP_URL + "/contract/" + doc.open_contracting_id;
            if (doc.is_published) {
                return (
                    <span className="parent-contract">
                            <a href={docUrl}>{doc.name}</a>
                    </span>
                );
            }
        });
        var MaxAllowed = this.state.MaxAllowedRelatedDocument;
        var maxDocs = (this.state.metadata.associated.length < MaxAllowed) ? this.state.metadata.associated.length : MaxAllowed;

        for (var i = 0; i < maxDocs; i++) {
            var doc = this.state.metadata.associated[i];
            if (doc.is_published) {
                var docUrl = app_url + "/contract/" + doc.open_contracting_id;
                supportingContracts.push(<span id={i} className="child-contract">
                        <a href={docUrl}>{truncate(doc.name)}</a>
                    </span>);
            }
        }
        if (this.state.metadata.associated.length > MaxAllowed) {
            supportingContracts.push(<span><a
                href={Config.APP_URL + "/contract/" + this.state.metadata.open_contracting_id}>{LANG.more}</a></span>);
        }

        if (parentContracts.length || supportingContracts.length) {
            return (
                <div className="relateddocument-view">
                    <div>{LANG.related_docs}</div>
                    <span>{parentContracts}</span>
                    {supportingContracts}
                    {moreContracts}
                </div>
            );
        }

        return null;
    },
    renderLoading() {
        return (
            <div id="metadata">
                <div className="metadata-view">
                    <div>
                        {LANG.metadata}
                    </div>
                    <span className="metadataLoading">{LANG.loading}</span>
                </div>
            </div>
        );
    },
    renderMetadata() {
        return (
            <div id="metadata">
                {this.getNote()}
                <div className="metadata-view">
                    <div>
                        {LANG.metadata}
                    </div>
                    {this.getCountry()}
                    <div className="metadata-ocid">
                        <span>{LANG.signature_year}</span>
                        {this.getSignatureYear()}
                    </div>
                    <div className="metadata-ocid">
                        <span>{LANG.resource}</span>
                        {this.getResource()}
                    </div>
                    <div className="metadata-ocid">
                        <span>{LANG.type_contract}</span>
                        {this.getContractType()}
                    </div>
                    <div className="metadata-ocid">
                        <span>{LANG.open_contracting_id}</span>
                        <span>{this.state.metadata.open_contracting_id}</span>
                    </div>
                    <div className="metadata-ocid">
                        <span>{LANG.disclosure_mode}</span>
                        <span>{this.state.metadata.publisher_type || "-"}</span>
                    </div>
                    {this.getAnnexesMissing()}
                    {this.getPagesMissing()}
                    {this.getAmlaLink()}
                    {this.getLandMatrix()}
                    {this.getCountry(true)}
                    <div className="metadata-ocid">
                        <span>{LANG.more_for} {this.getResource(true)}</span>
                    </div>
                    {this.getRelatedDocuments()}
                </div>
            </div>
        );
    },
    render() {
        if (this.state.loading) {
            return this.renderLoading();
        }

        return this.renderMetadata();
    }
});

export default Metadata;