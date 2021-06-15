import React,{useEffect , useState} from 'react'
import {withRouter} from 'react-router-dom'
import base_url from './ApiUrl'
import axios from 'axios'  

const MyOrders = props => {

    const [orders , setOrders] = useState([])
    const [error , setError] = useState('')

    useEffect( () => {
        if(!window.sessionStorage.getItem('token')) {
            window.sessionStorage.setItem('msg', 'Please sign in first!')
            props.history.push('/login');
        }
        props.cb();

        const url = base_url+"get_orders"
        const data = {
            user_id: window.sessionStorage.getItem('user_id')
        }
        const headers = {
            'Authorization': window.sessionStorage.getItem('token')
        }
          
        axios.post(url, data, {
            headers: headers
        })
        .then((response) => {
            if(response.data.success){
                setOrders(response.data.data)
            } else {
                setError(response.data.msg)
            }
        })
        .catch((error) => {
            setError(error.message)
        })

    }, []);


    const renderTableData = () => {
        return orders.map((order, index) => {
           const { id, total_price, phone_number, location,items , created_at } = order 
           return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{total_price}</td>
                    <td>{phone_number}</td>
                    <td>{location}</td>
                    <td>{
                    items.map( (item , index) => {
                        return (
                            <ul key={index}>
                                <li>{item.title} - {item.price} - {item.quantity ? item.quantity : 1} Pieces</li>
                            </ul>
                        )
                    })
                    }</td>
                    <td>{created_at}</td>
                </tr>
           )
        })
    }

    if(orders.length !== 0){
        return (
            <div>
                <h1 style={{textAlign:'center' , margin:'20px'}}>My Orders</h1>
                <div className="container">
                <table id='orders'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Total Price</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Items</th>
                            <th>Ordered at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableData()}
                    </tbody>
                </table>
                </div>
            </div>
        )
    } else if(error) {
        return (
            <div>
                <div style={{ marginTop: '10px' }} className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        )
    } else {
        return(
            <div>
                <h1 style={{textAlign:'center' , margin:'20px'}}>You don't have Orders</h1>
            </div>
        )
    }

}

export default withRouter(MyOrders)