import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyOrders from "./MyOrders";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import PizzaMenu from './PizzaMenu'
import CartShop from './CartShop'
import {withRouter} from 'react-router-dom';

const MasterView = ({cb , cartItems , addItem , removeItem , clearCartItems}) => {
    return (
        <main>
            <Switch>
                <Route exact path='/' render={() => (<PizzaMenu cb={cb} addItem={addItem}/>)}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/myOrders' render={() => (<MyOrders cb={cb} />)}/>
                <Route path='/cartShop' render={() => (<CartShop cb={cb} cartItems={cartItems} addItem={addItem} removeItem={removeItem} clearCartItems={clearCartItems}/>)}/>
            </Switch>
        </main>
    );
}

export default withRouter(MasterView);