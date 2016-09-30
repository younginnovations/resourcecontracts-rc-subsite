import React, {Component} from "react";
import { Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});
import Text from './views/text';
import Pdf from './views/pdf';
import App from './app';
import Contract from  './contract';

var indexRoute = (Contract.getView() == 'pdf') ? Pdf : Text;

const Routes = (
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={indexRoute}/>
            <Route path="text" component={Text}/>
            <Route path="text/page/:pageNo/annotation/:annotationID" component={Text}/>
            <Route path="pdf" component={Pdf}/>
            <Route path="pdf/page/:pageNo/annotation/:annotationID" component={Pdf}/>
            <Route path="search" component={Text}/>
            <Route path="search/:query" component={Text}/>
            <Route path="*" component={Text}/>
        </Route>
    </Router>
);

export default Routes
