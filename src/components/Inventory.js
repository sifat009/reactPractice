import React from 'react';
import AddFishForm from './AddFishForm';


class Inventory extends React.Component {
    
    handleChange = (e, fishId) => {
        const fish = this.props.fishes[fishId];
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        }        
        this.props.updateFish(updatedFish, fishId);
        
    }
    renderInventory = (fishId) => {
        const fish = this.props.fishes[fishId];
        return (
            <div className="fish-edit" key={fishId}>
                <input type="text" placeholder="Fish Name" name="name" value={fish.name}
                    onChange={(e) => this.handleChange(e, fishId)}/>
                <input type="text" placeholder="Fish Price" name="price" value={fish.price}
                    onChange={(e) => this.handleChange(e, fishId)}/>
                <select name="status" value={fish.status} onChange={(e) => this.handleChange(e, fishId)}>
                    <option value="available">Fresh!!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea placeholder="Fish Desc" name="desc" value={fish.desc}
                    onChange={(e) => this.handleChange(e, fishId)}></textarea>
                <input type="text" placeholder="Fish Image" name="image" value={fish.image}
                    onChange={(e) => this.handleChange(e, fishId)}/>
                <button onClick={() => this.props.removeFish(fishId)}>Remove Fish</button>    
            </div>
        )
    }
    render() {
        return (
            <div>
                <p>Inventory</p>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;