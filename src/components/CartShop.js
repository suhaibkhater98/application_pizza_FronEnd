import {withRouter} from 'react-router-dom';
import {Card , Modal} from 'react-bootstrap'
import axios from 'axios'
import {useState} from 'react'
import base_url from './ApiUrl'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const CartShop = props => {

    const itemsPrice = props.cartItems.reduce( (a , c) => a + c.price * c.qty , 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 15
    const totalPrice = itemsPrice + shippingPrice 

    const [modalShow, setModalShow] = useState(false);
    const [phoneNumber , setPhoneNumber] = useState(null)
    const [location , setLocation] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    const makeOrder = async (event) => {
        event.preventDefault()
        let data = {
            phone_number: phoneNumber,
            location: location,
            items: props.cartItems,
            total_price: totalPrice,
            user_id: window.sessionStorage.getItem('user_id')
        }

        try{
            const response = await axios.request({
                url: base_url+'make_order',
                method: 'POST',
                data: data
            })
            if(response.data.success){
                setError('')
                props.clearCartItems()
                setSuccess(response.data.msg)
                setModalShow(false)
            } else {
                setError(response.data.msg);
                setModalShow(false)
            }
        } catch(e){
            console.log(e)
        }
    }

    return (
       
        <div>
            <div className="p-3 mb-4">
                <div className="text-center">
                    {error !== '' && <Error error={error}/>}
                    {success !== '' && <Success success={success}/>}
                </div>
            </div>
            { props.cartItems.length === 0 ? <h1 style={{textAlign:'center' , margin:'20px'}}>Shopping Cart is Empty</h1> :<h1 style={{textAlign:'center'}}>You Orders are:</h1>}
            <div className="row">
                {
                    props.cartItems.map( (item , index )=> {
                        return (
                            <div key={index} className="column">
                                <div className="card">
                                    <Card>
                                        <Card.Img variant="top" src={ `./${item.img}.png`} alt="Pizza" />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text> {item.description}</Card.Text>
                                            <br/>
                                            <div>
                                                <i style={{margin:'5px'}} onClick={()=>props.addItem(item)} className="btn btn-primary">+</i>
                                                {item.qty}
                                                <i style={{margin:'5px'}} onClick={()=>props.removeItem(item)} className="btn btn-primary">-</i>
                                            </div>
                                            <div>
                                                {item.qty} x {item.price} QR 
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                props.cartItems.length !== 0 && (
                    <div className="border border-light p-3 mb-4">
                        <div className="text-center">
                            <button onClick={() => setModalShow(true)} className="col-3 btn btn-info">Checkout</button>
                        </div>
                  </div>
                )
            }
            <Modal size="lg" show={modalShow} onHide={() => setModalShow(false)} >
                <Modal.Header closeButton>Checkout</Modal.Header>
                <Modal.Body>
                    <div>
                        <div style={{margin:'5px'}} className="row">
                            <div className="col-3">Item Price</div>
                            <div className="col-2 text-right">{itemsPrice} QR</div>
                        </div>
                        <div style={{margin:'5px'}} className="row">
                            <div className="col-3">Shipping Price</div>
                            <div className="col-2 text-right">{shippingPrice} QR</div>
                        </div>
                        <div style={{margin:'5px'}} className="row">
                            <div className="col-3">Total Price</div>
                            <div className="col-2 text-right">{totalPrice} QR</div>
                        </div>
                        <hr />
                        <form onSubmit={makeOrder}>
                            <div style={{margin:'5px'}} className="row">
                                <div className="col-3">Phone Number</div>
                                <div className="col-4 text-right">    <PhoneInput
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={setPhoneNumber} defaultCountry="QA" required international/></div>
                            </div>
                            <div style={{margin:'5px'}} className="row">
                                <div className="col-3">Location</div>
                                <div className="col-3 text-right"><textarea onChange={ (event) => setLocation(event.target.value)} name="location" placeholder="Location" required /></div>
                            </div>
                            <hr />
                            <div className="border border-light p-3 mb-4">
                                <div className="text-center">
                                    <button type="submit" className="col-3 btn btn-info">Place Order</button>
                                    <button style={{marginLeft:'10px'}} onClick={() => setModalShow(false)} className="col-3 btn btn-info">Close</button>
                                </div>
                            </div>
                        </form>
                    </div>   
                </Modal.Body>
            </Modal>
        </div>
    )
}

const Success = (props) => (
    <div style={{ marginTop: '10px' }} className="alert alert-success" role="alert">
        {props.success}
    </div>
);

const Error = (props) => (
    <div style={{ marginTop: '10px' }} className="alert alert-danger" role="alert">
        {props.error}
    </div>
);

export default withRouter(CartShop)