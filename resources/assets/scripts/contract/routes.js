import React, {Component} from "react";
import { Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});
import Search from './views/search';
import Text from './views/text';
import Pdf from './views/pdf';
import App from './app';
import Contract from  './contract';
import NotFound from './views/notFound';

var indexRoute = Text;
if (Contract.getView() == 'pdf') {
    indexRoute = Pdf;
}
const Routes = (
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={indexRoute}/>
            <Route path="text" component={Text}/>
            <Route path="text/page/:contractID/annotation/:annotationID" component={Text}/>
            <Route path="pdf" component={Pdf}/>
            <Route path="pdf/page/:contractID/annotation/:annotationID" component={Text}/>
            <Route path="search" component={Search}/>
            <Route path="search/:query" component={Search}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);


export default Routes
