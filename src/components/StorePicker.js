import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {
    gotoStore = (event) => {
        event.preventDefault();
        let storeId = this.storeInput.value;
        this.props.history.push(`/store/${storeId}`);

    }
    render() {
        return (
            <form className="store-selector" onSubmit={this.gotoStore}>
                <h2>Please enter a Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => this.storeInput = input} />
                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}



export default StorePicker;