import React from 'react'
import base_url from './ApiUrl'
import {Card , Button} from 'react-bootstrap'

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
    
    render = () => {
        return (
            <div>
                {
                    this.state.loading || !this.state.items ? <div>Loading ... </div> : 
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