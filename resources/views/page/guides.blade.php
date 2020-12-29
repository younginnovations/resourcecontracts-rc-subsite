@extends('layout.app-page')
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.2.0/jspdf.umd.min.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

<?php
$editingMode = auth()->isloggedIn();
$pageVersion = app('request')->get('v');        
?>

@section('content')
@if($editingMode)
@if (!is_null($pageVersion))
<div class="edit-mode">
    <div>@lang('admin.editing_page_version', ['version' => 'v' . $pageVersion])
        <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}?v={{ $pageVersion }}">@lang('admin.click_here')</a> @lang('admin.to_edit') -
        <a href="{{ url('logout') }}">@lang('admin.logout')</a></div>
</div>
@else
<div class="edit-mode">
    <div>@lang('admin.editing')
        <a target="_blank" href="{{route('admin.page.edit', ['id'=>$page->id])}}">@lang('admin.click_here')</a> @lang('admin.to_edit') -
        <a href="{{url('logout')}}">@lang('admin.logout')</a></div>
</div>
@endif

@endif

<div class="content-static-wrap">
    {{--<div class="guide-wrapper">
            <h1>How to use Resource Contracts?</h1>
            <ul class="guide-nav">
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#how-to-guides">How to Guides</a></li>
                <li><a href="#training-library">Training Library</a></li>
            </ul>
            <div class="guide-introduction-wrapper page-break">
                <div id="introduction">
                    <h2>Introduction</h2>
                    <p>ResourceContracts is a repository of publicly available oil, gas, and mining contracts. The repository
                        features plain language summaries of each contract’s key social, environmental, human rights, fiscal,
                        and
                        operational terms, and tools for searching and comparing contracts. ResourceContracts.org promotes
                        greater
                        transparency of investments in the extractive industries, and facilitates a better understanding of the
                        contracts that govern them. Contracts that govern the relationship between governments and oil, gas, and
                        mining companies in the extraction and exploitation of natural resources are complex. The related
                        licenses,
                        leases, concessions, and other contractual arrangements affect everything from tax liabilities to local
                        content obligations to the protection of the environment. Despite the critical role these contracts play
                        in
                        setting the rules for investments in extractive industries, they are often difficult to discover. Even
                        when
                        publicly available, the tools to assess and compare the key provisions of such contracts are limited.
                        This
                        can result in a critical lack of knowledge for governments as they try to negotiate the best terms for
                        their
                        citizens, and can result in missed opportunities to learn from others’ past successes or missteps.</p>
                </div>
            </div>
            <div class="how-to-guide-wrapper page-break"  id="how-to-guides">
                <h2>How to Guides</h2>
                <div class="guide-steps">
                    <div class="img-wrap">
                        <img src="images/guide-step-1.svg" alt="image" width="" height="">
                    </div>
                    <div class="step-wrap">
                        <h3>Browse by category</h3>
                        <ol>
                            <li>To see any contract, click on the contract title to go to the View Document page.</li>
                            <li>You can scroll through the full PDF document page by page, or click the “TEXT” button to
                                switch
                                to a text- only view.</li>
                            <li>To search for specific words in the text, use the “Search in this document” box on the
                                left. Note that text versions are created automatically and may contain errors.</li>
                            <li>OpenLandContracts.org features Annotations (i.e. plain-language summaries) on the left
                                of the
                                page that explain key provisions throughout the document. See more about Annotations below.</li>
                            <li>To download or share the document, use the buttons above the right column.</li>
                            <li>To view key document details such as source website, Associated Documents and
                                metadata, switch to the Summary Page using the green button on the right.</li>
                        </ol>
                    </div>
                </div>
                <div class="guide-steps row-reverse">
                    <div class="img-wrap">
                        <img src="images/guide-step-2.svg" alt="image" width="" height="">
                    </div>
                    <div class="step-wrap">
                        <h3>Search for Documents</h3>
                        <ol>
                            <li>To search OpenLandContracts.org, enter any word or phrase in the Search Box at the top of
                                most pages.</li>
                            <li>To narrow your search, use the Advanced Search Tools to limit the results shown. Select from
                                the options in each
                                category (Country, Resource, Year Signed, etc.) and click the green Search button to narrow
                                your search. You can select
                                multiple categories—and multiple options within each category—to further limit the results.
                            </li>
                            <li>To show only recent documents (past 90 days) or only contracts containing Annotations, use
                                the checkboxes in the
                                Search Tools area. See more about Annotations below.</li>
                            <li>You can share the results of any search using the Share button above your results on the
                                right.</li>
                            <li>Use the gray Reset button to remove all previous search criteria and start a new
                                search.</li>
                            </li>
                            <li>Search results are based on matching terms in the text, title or Annotations of
                                documents on OpenLandContracts.org.</li>
                        </ol>
                    </div>
                </div>
                <div class="guide-steps">
                    <div class="img-wrap">
                        <img src="images/guide-step-3.svg" alt="image" width="" height="">
                    </div>
                    <div class="step-wrap">
                        <h3>View a Document</h3>
                        <ol>
                            <li>To see any contract, click on the contract title to go to the View Document page.</li>
                            <li>You can scroll through the full PDF document page by page, or click the “TEXT” button to
                                switch to a text- only view.</li>
                            <li>To search for specific words in the text, use the “Search in this document” box on the
                                left. Note that text versions are created automatically and may contain errors.</li>
                            <li>OpenLandContracts.org features Annotations (i.e. plain-language summaries) on the left
                                of the page that explain key provisions throughout the document. See more about Annotations below.</li>
                            <li>To download or share the document, use the buttons above the right column.</li>
                            <li>To view key document details such as source website, Associated Documents and
                                metadata, switch to the Summary Page using the green button on the right.</li>
                        </ol>
                    </div>
                </div>
                <div class="guide-steps row-reverse">
                    <div class="img-wrap">
                        <img src="images/guide-step-4.svg" alt="image" width="" height="">
                    </div>
                    <div class="step-wrap">
                        <h3>View Annotations</h3>
                        <ol>
                            <li>To see any contract, click on the contract title to go to the View Document page.</li>
                            <li>You can scroll through the full PDF document page by page, or click the “TEXT” button to
                                switch to a text- only view.</li>
                            <li>To search for specific words in the text, use the “Search in this document” box on the
                                left. Note that text versions are created automatically and may contain errors.</li>
                        </ol>
                    </div>
                </div>
                <div class="guide-steps">
                    <div class="img-wrap">
                        <img src="images/guide-step-3.svg" alt="image" width="" height="">
                    </div>
                    <div class="step-wrap">
                        <h3>Download and Share</h3>
                        <ol>
                            <li>To search OpenLandContracts.org, enter any word or phrase in the Search Box at the top of
                                most pages.</li>
                            <li>To narrow your search, use the Advanced Search Tools to limit the results shown. Select from
                                the options in each
                                category (Country, Resource, Year Signed, etc.) and click the green Search button to narrow
                                your search. You can select
                                multiple categories—and multiple options within each category—to further limit the results.
                            </li>
                            <li>To show only recent documents (past 90 days) or only contracts containing Annotations, use
                                the checkboxes in the
                                Search Tools area. See more about Annotations below.</li>
                            <li>You can share the results of any search using the Share button above your results on the
                                right.</li>
                            <li>Use the gray Reset button to remove all previous search criteria and start a new
                                search.</li>
                            </li>
                            <li>Search results are based on matching terms in the text, title or Annotations of
                                documents on OpenLandContracts.org.</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div id="training-library">
                <h2>Training Library</h2>
                <div class="guide-steps training-wrap">
                    <div class="img-wrap">
                        <img src="images/training-img.svg" alt="image" width="" height="">
                    </div>
                    <div class="step-wrap">
                        <ol>
                            <li>To search OpenLandContracts.org, enter any word or phrase in the Search Box at the top of
                                most pages.</li>
                            <li>To narrow your search, use the Advanced Search Tools to limit the results shown. Select from
                                the options in each
                                category (Country, Resource, Year Signed, etc.) and click the green Search button to narrow
                                your search. You can select
                                multiple categories—and multiple options within each category—to further limit the results.
                            </li>
                            <li>To show only recent documents (past 90 days) or only contracts containing Annotations, use
                                the checkboxes in the
                                Search Tools area. See more about Annotations below.</li>
                            <li>You can share the results of any search using the Share button above your results on the
                                right.</li>
                            <li>Use the gray Reset button to remove all previous search criteria and start a new
                                search.</li>
                            </li>
                            <li>Search results are based on matching terms in the text, title or Annotations of
                                documents on OpenLandContracts.org.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination-static">
            <div class="previous">
                <span class="font-bold">FAQ</span>
                <a href="faqs">Previous</a>
            </div>
            <div class="next">
                <span class="font-bold">Glossary</span>
                <a href="glossary">Next</a>
            </div>
        </div>--}}
    <!-- <div id="content">{!!$page->content(app('request')->query('v'))!!}</div> -->
    <div id="content">
        <p><button id="download-button" class="download-btn"><img src="../../images/download-2-line.svg" alt="" /> Download PDF</button></p>
        <div id="pdf-page" class="guide-wrapper">
            <h1 class='toDownload'>How to use Resource Contracts?</h1>
            <ul class="guide-nav" data-html2canvas-ignore="true">
                <li class="active"><a href="#introduction">Introduction</a></li>
                <li><a href="#how-to-guides">How to Guides</a></li>
                <li><a href="#training-library">Training Library</a></li>
            </ul>
            <div class="guide-introduction-wrapper page-break">
                <div id="introduction">
                    <h2>Introduction</h2>
                    <p>ResourceContracts temporary is a repository of publicly available oil, gas, and mining contracts. The repository features plain language summaries of each contract&rsquo;s key social, environmental, human rights, fiscal, and operational terms, and tools for searching and comparing contracts. ResourceContracts.org promotes greater transparency of investments in the extractive industries, and facilitates a better understanding of the contracts that govern them. Contracts that govern the relationship between governments and oil, gas, and mining companies in the extraction and exploitation of natural resources are complex. The related licenses, leases, concessions, and other contractual arrangements affect everything from tax liabilities to local content obligations to the protection of the environment. Despite the critical role these contracts play in setting the rules for investments in extractive industries, they are often difficult to discover. Even when publicly available, the tools to assess and compare the key provisions of such contracts are limited. This can result in a critical lack of knowledge for governments as they try to negotiate the best terms for their citizens, and can result in missed opportunities to learn from others&rsquo; past successes or missteps.</p>
                </div>
            </div>
            <div id="how-to-guides" class="how-to-guide-wrapper page-break">
                <h2>How to Guides</h2>
                <div id="find-documents" class="guide-steps">
                    <div class="img-wrap"><img src="../../images/guide-step-1.svg" alt="image" width="" height="" /></div>
                    <div class="step-wrap">
                        <h3><strong>Find Documents by Country or Resource</strong></h3>
                        <ul>
                            <li>To see any contract, click on the contract title to go to the View Document page.</li>
                            <li>You can scroll through the full PDF document page by page, or click the &ldquo;TEXT&rdquo; button to switch to a text- only view.</li>
                            <li>To search for specific words in the text, use the &ldquo;Search in this document&rdquo; box on the left. Note that text versions are created automatically and may contain errors.</li>
                            <li>OpenLandContracts.org features Annotations (i.e. plain-language summaries) on the left of the page that explain key provisions throughout the document. See more about Annotations below.</li>
                            <li>To download or share the document, use the buttons above the right column.</li>
                            <li>To view key document details such as source website, Associated Documents and metadata, switch to the Summary Page using the green button on the right.</li>
                        </ul>
                    </div>
                </div>
                <div id="search-documents" class="guide-steps row-reverse search-all-documents">
                    <div class="step-wrap">
                        <h3>Search&nbsp;All Documents</h3>
                        <ul>
                            <li class="img-wrap img-left"><img src="../../images/guide-step-2.svg" alt="image" width="" height="" /></li>
                            <li>To search OpenLandContracts, enter any word or phrase in the <strong>Search Box</strong> at the top of most pages.</li>
                            <li>To narrow your search, use the advanced <strong>Search Tools</strong> to limit the results shown. Select from the options in each category (Country, Resource, Year Signed, etc.) and click the green Search button to narrow your search. You can <strong>select multiple categories</strong>&mdash;and multiple options within each category&mdash;to further narrow the results.</li>
                            <li>To show only <strong>recent documents</strong> (past 90 days) or only contracts with <strong>Annotations</strong>, use the checkboxes in the Search Tools. See more about Annotations below.</li>
                            <li class="img-wrap img-right"><img src="../../images/guide-step-2.svg" alt="image" width="" height="" /></li>
                            <li>Use the gray <strong>Reset</strong> button to remove all previous search criteria and start a new search.</li>
                            <li>You can <strong>share or download</strong> the results of any search using the buttons on the right above your list of results.</li>
                            <li>Search results are based on matching terms in the text, the title or the Annotations of documents on OpenLandContracts.</li>
                            <li>Searching for contracts using an Annotation Category will allow you to view all contracts that include the type of Annotation you selected (e.g., Community Consultation, Resettlement, Water Use, etc.).</li>
                        </ul>
                    </div>
                </div>
                <div id="view-document" class="guide-steps">
                    <div class="img-wrap"><img src="../../images/guide-step-3.svg" alt="image" width="" height="" /></div>
                    <div class="step-wrap">
                        <h3>View a Document</h3>
                        <ul>
                            <li>To see any contract, click on the contract title to go to the View Document page.</li>
                            <li>You can scroll through the full PDF document page by page, or click the &ldquo;TEXT&rdquo; button to switch to a text- only view.</li>
                            <li>To search for specific words in the text, use the &ldquo;Search in this document&rdquo; box on the left. Note that text versions are created automatically and may contain errors.</li>
                            <li>OpenLandContracts.org features Annotations (i.e. plain-language summaries) on the left of the page that explain key provisions throughout the document. See more about Annotations below.</li>
                            <li>To download or share the document, use the buttons above the right column.</li>
                            <li>To view key document details such as source website, Associated Documents and metadata, switch to the Summary Page using the green button on the right.</li>
                        </ul>
                    </div>
                </div>
                <div id="view-annotation" class="guide-steps row-reverse">
                    <div class="img-wrap"><img src="../../images/guide-step-4.svg" alt="image" width="" height="" /></div>
                    <div class="step-wrap">
                        <h3>View Annotations</h3>
                        <ul>
                            <li>To see any contract, click on the contract title to go to the View Document page.</li>
                            <li>You can scroll through the full PDF document page by page, or click the &ldquo;TEXT&rdquo; button to switch to a text- only view.</li>
                            <li>To search for specific words in the text, use the &ldquo;Search in this document&rdquo; box on the left. Note that text versions are created automatically and may contain errors.</li>
                        </ul>
                    </div>
                </div>
                <div id="download-and-share" class="guide-steps">
                    <div class="img-wrap"><img src="../../images/guide-step-3.svg" alt="image" width="" height="" /></div>
                    <div class="step-wrap">
                        <h3>Download and Share</h3>
                        <ul>
                            <li>To search OpenLandContracts.org, enter any word or phrase in the Search Box at the top of most pages.</li>
                            <li>To narrow your search, use the Advanced Search Tools to limit the results shown. Select from the options in each category (Country, Resource, Year Signed, etc.) and click the green Search button to narrow your search. You can select multiple categories&mdash;and multiple options within each category&mdash;to further limit the results.</li>
                            <li>To show only recent documents (past 90 days) or only contracts containing Annotations, use the checkboxes in the Search Tools area. See more about Annotations below.</li>
                            <li>You can share the results of any search using the Share button above your results on the right.</li>
                            <li>Use the gray Reset button to remove all previous search criteria and start a new search.</li>
                            <li>Search results are based on matching terms in the text, title or Annotations of documents on OpenLandContracts.org.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="training-library">
                <h2 class='training'>Training Library</h2>
                <div class="guide-steps training-wrap">
                    <div class="img-wrap"><img src="http://ccsi.columbia.edu/files/2017/03/Guide-to-Land-Contracts-photo-175x225_forupload.png" alt="image" width="175" height="" /></div>
                    <div class="step-wrap">
                        <h3>Guide to Land Contracts: Agricultural Projects</h3>
                        This <a href="http://ccsi.columbia.edu/files/2017/03/Ag-Guide-v17-FINAL-11-Mar-2016.pdf">Guide</a> was prepared by International Senior Lawyers Project (ISLP) staff and volunteers in collaboration with the Columbia Center on Sustainable Investment (CCSI). It was developed to assist non-lawyers in better understanding agricultural investment contracts, such as those available on OpenLandContracts.org. Agricultural investment contracts can be complex, and some provisions may be difficult to understand. The Guide provides explanations for a range of common provisions, and includes a Glossary of legal and technical terms.<br /><br />
                    </div>
                </div>
                <div class="guide-steps training-wrap">
                    <div class="img-wrap"><img src="http://ccsi.columbia.edu/files/2017/03/ForestryGuidethumbnail.jpg" alt="image" width="175" height="" /></div>
                    <div class="step-wrap">
                        <h3>Guide to Land Contracts: Forestry Projects</h3>
                        This <a href="http://ccsi.columbia.edu/files/2017/01/GuidetoLandContracts-ForestryProjects.pdf">Guide</a>, also prepared by ISLP staff and volunteers in collaboration with CCSI, aims to assist OpenLandContracts.org users in unpacking the technical provisions and language typically found in forestry contracts in order to better understand the contracts and the potential implications of specific provisions across a range of stakeholder interests. <em>Note: A revised version of this Guide was published in January 2017.</em>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination-static">
            <div class="previous"><span class="font-bold">ABOUT</span>&nbsp;<a href="about">Previous</a></div>
            <div class="next"><span class="font-bold">GLOSSARY</span>&nbsp;<a href="glossary">Next</a></div>
        </div>
    </div>

</div>

<script type="text/javascript">

// for downloading pdf
const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    window.onload = function() {
        document.getElementById('download-button')
            .addEventListener('click', () => {
                const pdfFile = this.document.getElementById("pdf-page");
                // doc.text("Hello world!", 10, 10);
                // doc.setFontSize(12);
                // doc.text("To search OpenLandContracts.org, enter any word or phrase in the Search Box at the top of most pages.", 10, 30);
                // doc.text("To search OpenLandContracts.org, enter any word or phrase in the Search Box at the top of most pages.", 10, 40);
                // doc.save("olc.pdf")
                var opt = {
                    margin: 0.6,
                    filename: 'OpenLandContracts.pdf',
                    image: {
                        type: 'jpeg',
                        quality: 1
                    },
                    html2canvas: {
                        scale: 2,
                    },
                    format: "a4",
                    isToggleStyle: false,
                    jsPDF: {
                        unit: 'in',
                        format: 'letter',
                        orientation: 'portrait'
                    },
                    pagebreak: {
                        mode: 'avoid-all',
                        before: '.next-page'
                    }
                };
                html2pdf().from(pdfFile).set(opt).save();
            })
    }
    $('.guide-nav a').click(function(e) {
        e.preventDefault();
        scrollToElement($(this).attr('href'), 1000);
        $('.guide-nav li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

    var scrollToElement = function(el, ms) {
        var speed = (ms) ? ms : 600;
        $('html,body').animate({
            scrollTop: $(el).offset().top
        }, speed);
    }


    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function() {
            window.location.hash = hash;
        });
    }
</script>
@stop