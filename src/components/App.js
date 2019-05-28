import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
    state = {
        fishes: {},
        orders: {},
    }

    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        this.setState({fishes});
    }

    addOrder = (fish) => {
        const orders = {...this.state.orders};
        orders[fish] = orders[fish]+1 || 1;
        this.setState({orders});
    }

    loadSamples = () => {
        this.setState({
            fishes: sampleFishes,
        })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Catch of the Day" />
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} id={key} addOrder={this.addOrder} details={this.state.fishes[key]} />)

                        }
                    </ul>
                </div>
                <Order/>
                <Inventory loadSamples={this.loadSamples} addFish={this.addFish}/>
            </div>
        )
    }
}

export default App;