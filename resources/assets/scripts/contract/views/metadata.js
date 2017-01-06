import React, {Component} from "react";
import Reflux from "reflux";
import MetadataAction from '../actions/metadataAction';
import MetadataStore from '../stores/metadataStore';
import Config from '../config';
import Contract from '../contract';
import {getCountryName, truncate, nl2br, isSite} from "../helper";

var Metadata = React.createClass({
    mixins: [Reflux.listenTo(MetadataStore, 'onChange')],
    getInitialState() {
        return {
            loading: true,
            showMoreText: false,
            metadata: {},
            maxWord: 20,
            MaxAllowedRelatedDocument: 2
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
        var link = `${Config.APP_URL}/countries/${code}`;
        if (more) {
            return (<div className="metadata-inline">
                <p className="key">{LANG.more_from}</p>
                <p className="value"><a href={link}>{getCountryName(code)}</a></p>
            </div>);
        } else {
            return (<div className="metadata-item">
                <p className="key">{LANG.country}</p>
                <p value="value">{getCountryName(code)}</p>
            </div>);
        }
    },
    getSignatureYear()
    {
        var year = this.state.metadata.year_signed;
        if (year != '') {
            return year;
        }
        return '-';
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
        if (note != "") {
            var ellipseText = '';
            if (!this.state.showMoreText) {
                var noteArray = note.split(' ');
                if (noteArray.length > (this.state.maxWord + 10)) {
                    note = noteArray.slice(0, this.state.maxWord).join(' ') + '... ';
                    ellipseText = LANG.note_more;
                }
            } else {
                ellipseText = LANG.note_less;
            }
            note = {__html: nl2br(note)};

            return (
                <span className="note-wrapper">
                  <span className='metadata-note'>{LANG.note}</span>
                    <span dangerouslySetInnerHTML={note}/>
                    {ellipseText ?
                        <a className="ellipsis" href="#" onClick={this.handleMoreText}>{ellipseText}</a> : null}
                </span>
            );
        }

        return null;
    },
    getResource(more = false) {
        var resources = this.state.metadata.resource;
        var resourceCount = resources.length;
        return resources.map(function (value, index) {
            var link = `${Config.APP_URL}/resource/${encodeURIComponent(value)}`;
            var text = LANG.resourceLang[value];
            var sep = '';
            if (index != resourceCount - 1) {
                sep = ' | ';
            }
            if (typeof text == 'undefined') {
                text = value;
            }
            if (more) {
                return (<nobr><a href={link}>{text}</a> {sep}</nobr>);
            }
            return (<span>{text} {sep}</span>);
        });
    },
    getAnnexesMissing(){
        var annexes_missing = null;
        if (this.state.metadata.is_annexes_missing) {
            annexes_missing = (<div className="metadata-item">
                <p className="key">{LANG.annexes_missing}</p>
                <p className="value">{LANG.yes}</p>
            </div>);
        }
        return annexes_missing;
    },
    getPagesMissing(){
        var pages_missing = null;
        if (this.state.metadata.is_pages_missing) {
            pages_missing = (<div className="metadata-item">
                <p className="key">{LANG.pages_missing}</p>
                <p className="value">{LANG.yes}</p>
            </div>);
        }
        return pages_missing;
    },
    getAmlaLink () {
        var amla_url = this.state.metadata.amla_url;
        if (amla_url != '' && (isSite('country') || isSite('rc'))) {
            return (
                <div className="metadata-item">
                    <p class="value">{LANG.see} <a href={amla_url}
                                                   target="_blank">{LANG.legislation}</a> {LANG.african_mining}</p>
                </div>
            );
        } else {
            return null;
        }
    },
    getLandMatrix()
    {
        var id = '-';

        if (this.state.metadata.deal_number) {
            id = `#${this.state.metadata.deal_number}`;
        }

        if (isSite('olc')) {
            return (
                <div className="metadata-item">
                    <p className="key">{LANG.land_matrix_id}</p>
                    <p className="value"><a target="_blank" href={this.state.metadata.matrix_page}>{id}</a></p>
                </div>
            );
        }
        else {
            return null;
        }
    },
    getRelatedDocuments: function () {
        var moreContracts = "";
        let parentContracts = [];
        this.state.metadata.parent.map(doc => {
            var docUrl = `${Config.APP_URL}/contract/${doc.open_contracting_id}/view`;
            if (doc.is_published) {
                parentContracts.push(
                    <div className="parent-contract">
                        <a href={docUrl}>{doc.name}</a>
                    </div>
                );
            }
        });
        var MaxAllowed = this.state.MaxAllowedRelatedDocument;
        var totalDoc = 0;
        let supportingContracts = [];
        this.state.metadata.associated.forEach((doc)=> {
            if (doc.is_published && totalDoc <= MaxAllowed) {
                totalDoc++;
                var docUrl = `${Config.APP_URL}/contract/${doc.open_contracting_id}/view`;
                supportingContracts.push(
                    <p id={totalDoc} className="child-contract">
                        <a href={docUrl}>{truncate(doc.name)}</a>
                    </p>
                );
            }
        });

        if (this.state.metadata.associated.length > MaxAllowed) {
            supportingContracts.push((<p><a href={Contract.getSummaryUrl()}>{LANG.more}</a></p>));
        }

        if (parentContracts.length || supportingContracts.length) {
            return (
                <div className="relateddocument-view">
                    <div className="relateddocument-title">{LANG.related_docs}</div>
                    {parentContracts}
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
                    <div className="metadata-heading">
                        {LANG.metadata}
                    </div>
                    <span className="metadataLoading">{LANG.loading}</span>
                </div>
            </div>
        );
    },
    disclosureMode(){
        let dm = '-';
        let type = this.state.metadata.publisher.type;

        if (type != '') {
            dm = LANG.disclosure[type] || type;
        }

        dm += this.state.metadata.publisher.note ? ' (' + this.state.metadata.publisher.note + ') ' : '';

        return dm;
    },
    renderMetadata() {

        let type_of_contract_link = langGlossary.contract_view.type_of_contract + ' <a href="'+ config.APP_URL + '/glossary" target="_blank">'+ langGlossary.contract_view.see_glossary + '</a>';
        return (
            <div id="metadata" className="right-column-view">
                {this.getNote()}
                <div className="metadata-view">
                    <div className="metadata-heading">
                        {LANG.metadata}
                    </div>
                    {this.getCountry()}
                    <div className="metadata-item">
                        <p className="key">{LANG.signature_year}</p>
                        <p className="value">{this.getSignatureYear()}</p>
                    </div>
                    <div className="metadata-item">
                        <p className="key">{LANG.resource}</p>
                        <p className="value"> {this.getResource()}</p>
                    </div>
                    <div className="metadata-item">
                        <p
                            className="key"
                            data-toggle="popover"
                            data-title={ type_of_contract_link }>
                            {LANG.type_contract}</p>
                        <p className="value">{this.getContractType()}</p>
                    </div>
                    <div className="metadata-item">
                        <p
                            className="key"
                            data-toggle="popover"
                            data-title={langGlossary.contract_view.open_contracting_identifier}>
                            {LANG.open_contracting_id}</p>
                        <p className="value">{this.state.metadata.open_contracting_id}</p>
                    </div>
                    <div className="metadata-item">
                        <p
                            className="key"
                            data-toggle="popover"
                            data-title={langGlossary.contract_view.disclosure_mode}>
                            {LANG.disclosure_mode}</p>
                        <p className="value">{this.disclosureMode()}</p>
                    </div>
                    {this.getAnnexesMissing()}
                    {this.getPagesMissing()}
                    {this.getAmlaLink()}
                    {this.getLandMatrix()}
                    {this.getCountry(true)}
                    <div className="metadata-inline">
                        <p className="key">{LANG.more_for}</p>
                        <p className="value">{this.getResource(true)}</p>
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