<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>NRGI</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/jquery.bxslider.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>

<!-- header start -->
<header>
    <div class="icon">
        <img src="img/ic-menu.png" alt="menu-icon">
    </div>
    <div class="logo">
        <img src="img/logo_rc.png">
    </div>
</header>
<!-- header ends -->

<!-- main content starts here -->

<!-- main contents ends  -->
<!-- footer start -->
<footer>
    <div class="wrapper">
        <p class="partner-description">This site provides summaries of contracts and their terms to facilitate understanding of important provisions in the documents. These summaries are not interpretations of the documents. Neither the summaries nor the full contracts are complete accounts of all legal obligations related to the projects in question. This site also includes document text that was created automatically; such text may contain errors and differences from the original PDF files. No warranty is made to the accuracy of any content on this website.</p>
        <div class="partner-wrapper">
            <div class="col-md-10 partner-inner row">
                <div class="row">
                    <div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
                        <h5 class="partner-inner-heading">FOUNDING PARTNERS</h5>
                        <ul>
                            <li><img src="img/logo_columbia_university.png" class="img-responsive"></li>
                            <li><img src="img/logo_nrgi.png" class="img-responsive"></li>
                            <li><img src="img/logo_wb.png" class="img-responsive"></li>
                        </ul>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
                        <h5 class="partner-inner-heading">DONORS</h5>
                        <ul>
                            <li><img src="img/logo_alsf.png" class="img-responsive"></li>
                            <li><img src="img/logo_ukaid.png" class="img-responsive"></li>
                        </ul>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 partner-inner-each">
                        <h5 class="partner-inner-heading">CONTENT PARTNER</h5>
                        <ul>
                            <li><img src="img/logo_oo.png" class="img-responsive"></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-2 menu-list row">
                <h5 class="partner-inner-heading">MENU</h5>
                <ul class="menu-list-each">
                    <li><a href="#">About</a></li>
                    <li><a href="#">FAQs</a></li>
                    <li><a href="#">Resources</a></li>
                    <li><a href="#">Glossary</a></li>
                    <li><a href="#">Publish Contracts</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">API</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="footer-description">Content is licensed under Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</p>
            <img src="img/logo_cc.png" alt="">
        </div>
    </div>
</footer>
<!-- footer ends -->
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery.min.js"></script>
<script src="js/jquery.bxslider.min.js"></script>
<script>
    $(document).ready(function(){
        $('.countrypartner').bxSlider({
            slideWidth: 300,
            minSlides: 1,
            maxSlides: 3
        });
    });
</script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
</body>
</html>

