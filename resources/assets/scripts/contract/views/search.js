import React, {Component} from "react";
import Text from './text';
import Event from '../event';
import Header from '../components/search/header';
import List from '../components/search/list';
import Contract from '../contract';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = ({display: false});
    }

    componentDidMount() {
        if (Contract.getView() == 'search') {
            this.setState({display: true});
        } else {
            this.setState({display: false});
        }

        this.subscribeClose = Event.subscribe('search:close', ()=> {
            this.setState({display: false});
            Contract.setSearchQueries([]);
        });

        this.subscribeRoute = Event.subscribe('route:location', name => {
            if (name == 'search' || Contract.getIsSearch()) {
                this.setState({display: true});
            } else {
                this.setState({display: false});
            }
        });
    }

    componentWillUnmount() {
        this.subscribeRoute.remove();
        this.subscribeClose.remove();
    }

    render() {
        if (!this.state.display) {
            return null;
        }
        return (
            <div className="search-results-list">
                <Header/>
                <List />
            </div>
        );
    }
}

export default Search;