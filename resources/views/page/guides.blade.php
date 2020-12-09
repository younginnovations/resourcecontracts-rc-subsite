@extends('layout.app-page')
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
        <div id="content">{!!$page->content(app('request')->query('v'))!!}</div>
    </div>
    <script type="text/javascript">
        $('.guide-nav a').click(function(e){
            e.preventDefault();
            scrollToElement( $(this).attr('href'), 1000 );
            $('.guide-nav li').removeClass('active');
            $(this).parent('li').addClass('active');
        });

        var scrollToElement = function(el, ms){
            var speed = (ms) ? ms : 600;
            $('html,body').animate({
                scrollTop: $(el).offset().top
            }, speed);
        }
    </script>
@stop
