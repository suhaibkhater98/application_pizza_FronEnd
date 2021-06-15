import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import { HiShoppingCart } from 'react-icons/hi';
import axios from 'axios'
import base_url from './ApiUrl'

const Header = ({token, cb , cart_count}) => {

    const [isLoggedOut, setIsLoggedOut] = useState(token);
    const [error, setError] = useState('');

    const clearSessionStorage = () => {
        window.sessionStorage.clear();
        setIsLoggedOut('');
        cb();
        setError('')
    }

    const clearSessionStorageLogout = async () => {
        const url = base_url+"logout"
        const headers = {
            'Authorization': window.sessionStorage.getItem('token')
        }
          
        await axios.post(url, {}, {
            headers: headers
        }).then((response) => {
            if(response.data.success){
                clearSessionStorage()
            } else {
                setError(response.data.msg)
            }
        })
        .catch((error) => {
            setError(error.message)
        })
    }

    const loginAndRegister = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link onClick={() => clearSessionStorage()} className="nav-link" to={'/login'} >Login</Link>
            </li>
            <li className="nav-item">
                <Link onClick={() => clearSessionStorage()} className="nav-link" to={'/register'}>Register</Link>
            </li>
        </ul>);

    const logout = (
        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                <Link className="nav-link" to={'/myOrders'} >My Orders</Link>
            </li>
            <li className="nav-item">
                <Link onClick={() => clearSessionStorageLogout()} className="nav-link" to={'/login'} >Logout</Link>
            </li>
        </ul>);

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={"/"} className="nav-link">Pizza Application</Link>
                        </li>
                        <li className="nav-item">
                            <Link  className="nav-link" to={'/'}>Order Pizza</Link>
                        </li>

                        <li className="nav-item">
                            <Link  className="nav-link" to={'/cartShop'}>Cart <HiShoppingCart /> {cart_count} </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    {token || isLoggedOut ? logout : loginAndRegister}
                </div>
            </nav>
            {error !== '' && <Error error={error}/>}
        </div>
    );
}

const Error = (props) => (
    <div style={{ marginTop: '10px' }} className="alert alert-danger" role="alert">
        {props.error}
    </div>
);

export default withRouter(Header);