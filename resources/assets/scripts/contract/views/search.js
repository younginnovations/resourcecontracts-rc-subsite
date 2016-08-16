import React, {Component} from "react";
import Text from './text';
import Event from '../event';
import Header from '../components/search/header';
import List from '../components/search/list';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = ({display: false});
    }

    componentDidMount() {
        Event.subscribe('route:location', name => {
            if (name == 'search') {
                this.setState({display: true});
            } else {
                this.setState({display: false});
            }
        });
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