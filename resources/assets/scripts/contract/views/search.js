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
        this.subscribe = Event.subscribe('route:location', name => {
            if (name == 'search') {
                this.setState({display: true});
            } else {
                this.setState({display: false});
            }
        });
    }

    componentWillUnmount() {
        this.subscribe.remove();
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