import React from 'react';
import {formatPrice} from '../helpers';

class Order extends React.Component {
    renderOrder = (orderId) => {
        const fish = this.props.fishes[orderId];        
        const count = this.props.orders[orderId];
        const removeButton = <button onClick={() => this.props.removeFromOrder(orderId)}>&times;</button>
        if(!fish) {
            return <li key={orderId}>Sorry, {fish ? fish.name : 'fish'} is no longer available!
            {removeButton}</li>;
        } else {
            if(fish.status === 'unavailable') {
                return <li key={orderId}>Sorry, {fish ? fish.name : 'fish'} is no longer available!
                {removeButton}</li>;
            } else {
                return (
                    <li key={orderId}>
                        <span>{count}lbs {fish.name} {removeButton}</span>
                        <span className="price">{formatPrice(count * fish.price)}</span>
                    </li>
                );
            }
        }
        
    }
    render() {
        const orderIds = Object.keys(this.props.orders);        
        const fishes = this.props.fishes;
        
        const total = orderIds.reduce((prevSum, orderId) => {
            const fish = fishes[orderId];            
            const count = this.props.orders[orderId];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevSum + (count * fish.price);
            }
            return prevSum;
        }, 0)
        return (
            <div className="order-wr">
                <h2>Your Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order;