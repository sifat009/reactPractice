import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from './../base';

class App extends React.Component {
    state = {
        fishes: {},
        orders: {},
    }

    shouldComponentUpdate(nextProps, nextState) {
        localStorage.setItem(`orders-${this.props.match.params.storeId}`, JSON.stringify(nextState.orders));
        return true;      
    }

    componentDidMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes',
        });  
        
        const localStorageRef = localStorage.getItem(`orders-${this.props.match.params.storeId}`);
                
        if(localStorageRef) {
            this.setState({
                orders: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        this.setState({fishes});
    }

    updateFish = (updatedFish, fishId) => {
        const fishes = {...this.state.fishes};
        fishes[fishId] = updatedFish;
        this.setState({fishes});
    }

    removeFish = (fishId) => {
        const fishes = {...this.state.fishes};
        fishes[fishId] = null;
        this.setState({fishes});
    }

    addOrder = (fish) => {
        const orders = {...this.state.orders};
        orders[fish] = orders[fish]+1 || 1;
        this.setState({orders});
    }

    removeFromOrder = (orderId) => {
        const orders = {...this.state.orders};
        delete orders[orderId];
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
                <Order 
                    fishes={this.state.fishes}
                    orders={this.state.orders}
                    removeFromOrder={this.removeFromOrder} 
                />
                <Inventory
                    loadSamples={this.loadSamples} 
                    addFish={this.addFish}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                />
            </div>
        )

    }
}

export default App;