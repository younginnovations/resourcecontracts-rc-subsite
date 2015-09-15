var MetadataToggleButton = React.createClass({
    handleClick: function() {
        if(!this.props.contractApp.get("showMeta")) {
            this.props.contractApp.set({showMeta: true});
            location.hash="/meta/show";
            $('.metadata-toggle-button').addClass("metadata-shown");
            $('.pdf-viewer').css("width","50%");
            $(".text-annotator").css("width","50%");
        }
        else {
            this.props.contractApp.set({showMeta: false});
            location.hash="/meta/hide";
            $('.metadata-toggle-button').removeClass("metadata-shown");
            $('.pdf-viewer').css("width","72%");
            $(".text-annotator").css("width","72%");
        }
    },
    render: function() {
        return (
            <div className="metadata-toggle-button pull-right ">
                <span onClick={this.handleClick}>Meta</span>
            </div>
        );
    }
});
var MetadataView = React.createClass({
    componentDidMount: function() {
        var self = this;
        this.props.metadata.on("sync", function() {
            self.forceUpdate();
        });
    }, 
    render: function() {
        if(this.props.metadata.get("country")) {
            return (
                <div className="metadata-view">
                    <div>Metadata</div>
                    <div className="metadata-country">
                        <span>Country</span>
                        <span>{this.props.metadata.get("country").name}</span>
                    </div>
                    <div className="metadata-signature-year">
                        <span>Signature year</span>
                        <span>{this.props.metadata.get("signature_year")}</span>
                    </div>
                    <div className="metadata-type-contract">
                        <span>Type of Contract</span>
                        <span>{this.props.metadata.get("type_of_contract")}</span>
                    </div>
                    <div className="metadata-resource">
                        <span>Resources</span>
                        <span>{this.props.metadata.get("resource").join(",")}</span>
                    </div>
                    <div>
                    <a href={this.props.contractApp.getMetadataSummaryLink()}>See details</a>
                    </div>
                </div>
            );            
        } else {
            return (
                <div className="metadata-view">
                    <div>Metadata</div>
                    <span>Loading...</span>
                </div>
            );
        }

    }
});

var RelatedDocumentsView = React.createClass({
    render: function() {
        return (
            <div className="relateddocument-view">            
                
            </div>
        );        
    }
});

var RightColumnView = React.createClass({
    render: function() {
        return (
            <div className="right-column-view" style={this.props.style}>
                <MetadataView 
                    contractApp={this.props.contractApp}
                    metadata={this.props.metadata} />
                <RelatedDocumentsView
                    metadata={this.props.metadata} />
            </div>
        );
    }
});