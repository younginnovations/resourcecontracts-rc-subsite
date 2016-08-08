import React, {Component} from "react";
import Text from './text';

class Search extends Component {
    componentDidMount() {
        Event.subscribe('route:location', name => {
            if (name == 'search') {
                this.setState({'display': false});
            } else {
                this.setState({'display': true});
            }
        });
    }

    render() {
        return (
            <span>
               <Text/>
            </span>
        );
    }
}

export default Search;