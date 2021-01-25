import React, {Component} from "react";
import { Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});
import Text from './views/text';
import Pdf from './views/pdf';
import App from './app';
import Contract from  './contract';

var indexRoute = (Contract.getView() == 'pdf') ? Pdf : Text;
var route_split_key = Contract.isSiteRc() ? 'tagged' : 'annotation';
var text_path = "text/page/:pageNo/"+route_split_key+"/:annotationID";
var pdf_path = "pdf/page/:pageNo/"+route_split_key+"/:annotationID";
console.log('route.js:', route_split_key);

const Routes = (
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={indexRoute}/>
            <Route path="text" component={Text}/>
            <Route path={text_path} component={Text}/>
            <Route path="pdf" component={Pdf}/>
            <Route path={pdf_path} component={Pdf}/>
            <Route path="search" component={Text}/>
            <Route path="search/:query" component={Text}/>
            <Route path="*" component={Text}/>
        </Route>
    </Router>
);

export default Routes
