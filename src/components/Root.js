import React, {useState} from 'react';
import Header from "./Header";
import MasterView from "./MasterView";
import {withRouter} from 'react-router-dom';

const Root = () => {

    const [token, setToken] = useState(window.sessionStorage.getItem('token'));
    const [cart_count , updateCart] = useState(0)
    const [cartItems , updateCartItem] = useState([])

    const addItem = (item) => {
        const exist = cartItems.find( x => x.id === item.id)
        if(exist){
            updateCartItem(
                cartItems.map( x => x.id === item.id ? { ...exist , qty:exist.qty+1 } : x)
            )
        } else {
            updateCartItem([...cartItems,{ ...item , qty:1}])
        }
        updateCart(cart_count+1)
    }

    const removeItem = (item) => {
        const exist = cartItems.find( x => x.id === item.id)
        if(exist.qty === 1){
            updateCartItem(
                cartItems.filter( x => x.id !== item.id )
            )
        } else {
            updateCartItem(
                cartItems.map( x => x.id === item.id ? { ...exist , qty:exist.qty - 1 } : x)
            )
        }
        if(cart_count > 0)
            updateCart(cart_count - 1)
    }

    const clearCartItems = () => {
        updateCartItem([])
        updateCart(0)
    }

    const cb = () => {
        setToken(window.sessionStorage.getItem('token'));
    }

    return (
        <div>
            <Header token={token} cb={() => cb()} cart_count={cart_count} />
            <MasterView cb={() => cb()} cartItems={cartItems} addItem={addItem} removeItem={removeItem} clearCartItems={clearCartItems}/>
        </div>
    );
}

export default withRouter(Root);