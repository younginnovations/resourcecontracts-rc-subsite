var MetadataToggleButton = React.createClass({
    getInitialState: function () {
        return {
            showMeta: true
        }
    },
    handleClick: function () {
        if (this.state.showMeta) {
            this.setState({showMeta: false});
            // this.props.contractApp.set({showMeta: true});
            $('.right-column-view').hide();
            $('.metadata-toggle-button').removeClass("metadata-shown");
            $('.pdf-viewer').css("width", "70%");
            $(".text-panel").css("width", "70%");
        }
        else {
            // this.props.contractApp.set({showMeta: false});
            // location.hash="/meta/hide";
            this.setState({showMeta: true});
            $('.metadata-toggle-button').addClass("metadata-shown");
            $('.right-column-view').show();
            $('.pdf-viewer').css("width", "50%");
            $(".text-panel").css("width", "50%");
        }
    },
    render: function () {
        return (
            <div className="metadata-toggle-button pull-right metadata-shown">
                <span onClick={this.handleClick}>Meta</span>
            </div>
        );
    }
});


var MetadataView = React.createClass({
    getInitialState: function () {
        return {
            showMoreMetadata: false,
            showMoreText: false
        }
    },
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    clickShowMoreMetadata: function (e) {
        e.preventDefault();
        this.setState({showMoreMetadata: !this.state.showMoreMetadata});
        if (!this.state.showMoreMetadata) {
            $(".metadata-view .show-more-meta").show(500);
        } else {
            $(".metadata-view .show-more-meta").hide(500);
        }
    },
    handleMoreText: function (e) {
        e.preventDefault();
        this.setState({showMoreText: !this.state.showMoreText});
    },
    getResourceLang: function (resources, anchor) {
        var resLang = [];
        var resLength = resources.length;
        var resLang = _.map(resources, function (value, index) {
            var link = app_url + '/resource/' + encodeURIComponent(value);
            var res = langResource[value] ? langResource[value] : value;
            var separator = (index != resLength - 1) ? ' | ' : '';
            if (anchor === true) {
                return (<span><a href={link}>{res}</a>{separator}</span>);
            } else {
                return (<nobr><nobr>{res}</nobr><nobr>{separator}</nobr></nobr>);
            }
        });

        return resLang;
    },
    getDisclosureMode:function()
    {
        var type = this.props.metadata.get("publisher").type;
        var note = this.props.metadata.get("publisher").note;
        var disclosure ="-";
        if(type !='')
        {
            disclosure = type;
            if(note !='')
            {
                disclosure=type + " ( " + note + " )";
            }
        }
        return disclosure;
    },
    getContractSigned:function()
    {
        var isConractSigned=this.props.metadata.get("is_contract_signed");
        var langContractNotSigned = contractLang['contract_not_signed'];

        if(!isConractSigned)
        {
            return (<span className="note-inner-wrapper" dangerouslySetInnerHTML={{__html:langContractNotSigned}}></span>);
        }
    },
    render: function () {
        var showLabel = lang.show_more;
        if (this.state.showMoreMetadata) {
            showLabel = lang.show_less;
        }

        if (this.props.metadata.get("country")) {
            var countryCode = this.props.metadata.get("country").code.toLowerCase();
            var countryLink = app_url + "/countries/" + countryCode;

            var sigYear = this.props.metadata.get("year_signed");
            var sigYearLink = app_url + "/contracts?year=" + sigYear;

            var ct = this.props.metadata.get("contract_type");
            var contractType = ct.map(function (contractType, i) {
                contractType = langContractType[contractType] ? langContractType[contractType] : contractType;
                var link = app_url + "/search?q=&contract_type%5B%5D=" + contractType;
                var separator = (i != ct.length - 1) ? ' | ' : '';
                return (<nobr><nobr>{contractType}</nobr><nobr>{separator}</nobr></nobr>);
            });

            var re = new RegExp(' ', 'g');

            var note = this.props.metadata.get("note");
            if (note != "") {
                var noteHtml = "<span class='metadata-note'>" + lang.note + "</span>";

                if (!this.state.showMoreText) {
                    var maxWord = 20;
                    var noteArray = note.split(' ');
                    var more = '';

                    if (noteArray.length > maxWord) {
                        note = noteArray.slice(0, maxWord).join(' ') + '... ';
                        more = (<a className="ellipsis" href="#"
                                   onClick={this.handleMoreText}>{{__html: lang.note_more}}</a>);
                    }
                } else {
                    more = (
                        <a className="ellipsis" href="#" onClick={this.handleMoreText}>{{__html: lang.note_less}}</a>);
                }
                noteHtml += '<span class="note">' + note + '</span>';
                noteHtml = (<span className="note-inner-wrapper" dangerouslySetInnerHTML={{__html: noteHtml}}></span>);
            }
            var annexes_missing = null;
            if (this.props.metadata.get("is_annexes_missing")) {
                annexes_missing = (<div className="metadata-ocid">
                    <span>{lang.annexes_missing}</span>
                    <span>{lang.yes}</span>
                </div>);
            }
            var pages_missing = null;
            if (this.props.metadata.get("is_pages_missing")) {
                pages_missing = (<div className="metadata-ocid">
                    <span>{lang.pages_missing}</span>
                    <span>{lang.yes}</span>
                </div>);
            }

            var countryBlock = null;
            var  countryMore =null;

            if(!isSite('country'))
            {
                countryBlock =(<div className="metadata-country">
                                    <span>{lang.country}</span>
                                            <span>
                                                {getCountryName(this.props.metadata.get("country").code)}
                                            </span>
                                </div>);
                countryMore =(<p><span></span><span>{lang.more_from}</span> <a href={countryLink}>{getCountryName(this.props.metadata.get("country").code)}</a></p>);
            }

            var disclosureMode = this.props.metadata.get("publisher_type");
            disclosureMode = langDisclosure[disclosureMode] ? langDisclosure[disclosureMode] : disclosureMode;
            return (
                <div id="metadata">
                    <div className="note-wrapper">
                        {noteHtml}
                        {more}
                    </div>
                    <div className="note-wrapper">
                        {this.getContractSigned()}
                    </div>
                    <div className="metadata-view">
                        <div>
                            {lang.metadata}
                        </div>
                        {countryBlock}
                        <div className="metadata-signature-year">
                            <span>{lang.signature_year}</span>
                            <span>
                                {this.props.metadata.get("year_signed") || "-"}
                            </span>
                        </div>
                        <div className="metadata-resource">
                            <span>{lang.resource}</span>
                            {this.getResourceLang(this.props.metadata.get("resource"), false)}
                        </div>
                        <div className="metadata-type-contract">
                            <span>{lang.type_contract}</span>
                            <p>{contractType}</p>
                        </div>
                        <div className="metadata-ocid">
                            <span>{lang.open_contracting_id}</span>
                            <span>{this.props.metadata.get("open_contracting_id")}</span>
                        </div>
                        <div className="metadata-ocid">
                            <span>{lang.disclosure_mode}</span>
                            <span>{this.getDisclosureMode()}</span>


                        </div>
                        {annexes_missing}
                        {pages_missing}
                        <AmlaUrl metadata={this.props.metadata}/>
                        <LandMatrixView metadata={this.props.metadata}/>
                        <div className="metadata-ocid">
                            {countryMore}
                            <p><span></span><span>{lang.more_for}</span> {this.getResourceLang(this.props.metadata.get("resource"), true)}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="metadata">
                    <div className="metadata-view">
                        <div>
                            {lang.metadata}
                        </div>
                        <span className="metadataLoading">{lang.loading}</span>
                    </div>
                </div>
            );
        }
    }
});


var AmlaUrl = React.createClass({
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    getAmlaLink: function () {
        var link = null;
        var amla_url = this.props.metadata.get("amla_url");
        if (amla_url != '' && (isSite('country') || isSite('rc'))) {
            link = lang.see + '<a href="' + amla_url + '" target="_blank" > ' + lang.legislation + ' </a> ' + lang.african_mining;
        }

        return {__html: link};
    },
    render: function () {
        if (this.props.metadata.get("amla_url") == '') {
            return null;
        }
        return (
            <div className="amla-legislation" dangerouslySetInnerHTML={this.getAmlaLink()}/>
        );
    }
});


var LandMatrixView = React.createClass({
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        var id = '-';
        if (this.props.metadata.get("deal_number")) {
            id = '#' + this.props.metadata.get("deal_number");
        }

        if (isSite('olc')) {
            return (
                <div className="metadata-ocid">
                    <span>{lang.land_matrix_id}</span>
                    <a target="_blank" href={this.props.metadata.get('matrix_page')}>{id}</a>
                </div>
            );
        }
        else {
            return null;
        }
    }
});

var RelatedDocumentsView = React.createClass({
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        function truncate(text) {
            var words = (text + "").split(" ");
            var ellipsis = ""
            if (words.length > 10) {
                ellipsis = " ...";
            }
            words = words.splice(0, 10);
            return words.join(" ") + ellipsis;
        }

        var parentContracts = "",
            supportingContracts = [],
            moreContracts = "";
        if (this.props.metadata.get("parent")) {
            parentContracts = this.props.metadata.get("parent").map(function (doc) {
                var docUrl = app_url + "/contract/" + doc.open_contracting_id+"/view";
                if (doc.is_published) {
                    return (
                        <span className="parent-contract">
                            <a href={docUrl}>{doc.name}</a>
                        </span>
                    );
                }
            });
            var MaxAllowed = 3;
            var maxDocs = (this.props.metadata.get("associated").length < MaxAllowed) ? this.props.metadata.get("associated").length : MaxAllowed;

            for (var i = 0; i < maxDocs; i++) {
                var doc = this.props.metadata.get("associated")[i];
                if (doc.is_published) {
                    var docUrl = app_url + "/contract/" + doc.open_contracting_id+'/view';
                    supportingContracts.push(<span id={i} className="child-contract">
                        <a href={docUrl}>{truncate(doc.name)}</a>
                    </span>);
                }
            }
            if (this.props.metadata.get("associated").length > MaxAllowed) {
                supportingContracts.push(<span><a
                    href={this.props.contractApp.getMetadataSummaryLink()+'#associatedcontracts'}>More...</a></span>);
            }

            if (parentContracts.length || supportingContracts.length) {
                return (
                    <div className="relateddocument-view">
                        <div>{lang.related_docs}</div>
                        <span>{parentContracts}</span>
                        {supportingContracts}
                        {moreContracts}
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return null;
        }

    }
});
var RelatedDocumentsMoreView = React.createClass({
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        if (this.props.metadata.get("country")) {
            var countryCode = this.props.metadata.get("country").code.toLowerCase();
            var countryLink = app_url + "/countries/" + countryCode;
            var country = React.createElement('a', {href: countryLink}, getCountryName(countryCode));
            var resourceLinkBase = app_url + "/resources/";
            var resources = this.props.metadata.get("resource").map(function (resource, i) {
                return React.createElement('a', {href: app_url + "/resource/" + resource, key: i}, resource);
            });
            return (
                <div className="relateddocument-more-view">
                    <div>More</div>
                    <div>
                        <div>From {country}</div>
                        <div>For {resources}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="relateddocument-more-view">
                    <div>More</div>
                    <span>Loading...</span>
                </div>
            );
        }
    }
});
var OtherSourcesView = React.createClass({
    componentDidMount: function () {
        var self = this;
        this.props.metadata.on("sync", function () {
            self.forceUpdate();
        });
    },
    render: function () {
        if (this.props.metadata.get("company")) {
            var amla_url = this.props.metadata.get("url").amla;
            var amlaUrlLink = (<span>
                <a href={amla_url}>{this.props.metadata.get("country").name}</a>
                Legislation</span>);

            if (amla_url) {
                return (
                    <div className="other-sources-view">
                        <div>{lang.other_sources}</div>
                        <div>
                            <div>{amlaUrlLink}</div>
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return (
                <div className="other-sources-view">
                    <div>{lang.other_sources}</div>
                    <span>{lang.loading}</span>
                </div>
            );
        }
    }
});
var RightColumnView = React.createClass({
    render: function () {
        return (
            <div className="right-column-view">
                <MetadataView
                    contractApp={this.props.contractApp}
                    metadata={this.props.metadata}/>

                <RelatedDocumentsView
                    metadata={this.props.metadata}
                    contractApp={this.props.contractApp}/>
            </div>
        );
    }
});
