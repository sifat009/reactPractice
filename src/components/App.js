import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';


class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    }

    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        this.setState({fishes});
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Catch of the Day" />
                </div>
                <Order/>
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
}

export default App;