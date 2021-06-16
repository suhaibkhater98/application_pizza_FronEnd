import React from 'react'
import base_url from './ApiUrl'
import {Card , Button} from 'react-bootstrap'
import ClipLoader from "react-spinners/ClipLoader";

class Items extends React.Component{

    state = {
        loading: true,
        items: [],
    } 

    async componentDidMount(){
        //template has been rendered 
        const url = base_url+"get_items"
        const response = await (await fetch(url)).json()
        this.setState({items: response , loading:false})
    }
    
    override = {display: 'block', margin: '0 auto'}
    render = () => {
        return (
            <div>
                {
                    this.state.loading || !this.state.items ? <ClipLoader color="#365BD7" css={this.override} loading={this.state.loading} size={35} /> : 
                    <div className="row">
                        {
                             this.state.items.map( item => (
                                <div key={item.id} className="column">
                                    <div className="card">
                                        <Card>
                                        <Card.Img variant="top" src={ `./${item.img}.png`} alt="Pizza" />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text>
                                            {item.description}
                                            </Card.Text>
                                            <Card.Title>{item.price} QR</Card.Title>
                                            <Button variant="primary" onClick={ () => this.props.addItem(item)}>Add to cart</Button>
                                        </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                             ))
                        }
                    </div>
                }
            </div>
        )
    }
}


export default Items