import React, {useEffect} from 'react';
import Items from './Items'
import {withRouter} from 'react-router-dom';

const PizzaMenu = props => {
    useEffect( () => {
        props.cb();
    }, []);

    return (
        <div>
            <Items addItem={props.addItem}/>
        </div>
    )
}

export default withRouter(PizzaMenu);