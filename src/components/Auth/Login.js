import axios from 'axios'
import base_url from '../ApiUrl'
import {useEffect , useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Login = (props) => {

    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading , setLoading] = useState(false)


    useEffect( () => {
        if(window.sessionStorage.getItem('token')){
            props.history.push('/')
        }
    } , [])

    const postLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        let data = {
            email: email,
            password: password
        }

        try{
            const response = await axios.request({
                url: base_url+'login',
                method: 'POST',
                data: data
            })

            if(response.data.success){
                window.sessionStorage.setItem('token' , response.data.success.token)
                window.sessionStorage.setItem('user_id' , response.data.user_id)
                props.history.push('/')
            } else {
                window.sessionStorage.clear()
                setError('Error')
            }
        } catch(e){
            window.sessionStorage.clear();
            setError('Error');
        }
        setLoading(false)
    }
    
    let formStyle = {
        marginTop: '25px'
    };

    let inputStyle = {
        marginBottom: '5px'
    };

    const override = {display: 'block', margin: '0 auto'}

    return (
        <div>
            {window.sessionStorage.getItem('msg') && <Child />}
            {error !== '' && <Error />}
            <ClipLoader color="#365BD7" css={override} loading={loading} size={35} />
            <div className="container">
                <div className="row h-100 justify-content-center align-items-center">
                    <form style={formStyle} method="POST" onSubmit={(e) => postLogin(e)} className="form-signin col-4">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input style={inputStyle} type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input style={inputStyle} type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const Child = () => (
    <div style={{ marginTop: '10px' }} className="alert alert-warning" role="alert">
        Please <strong>sign in</strong> first!
    </div>
);

const Error = () => (
    <div style={{ marginTop: '10px' }} className="alert alert-danger" role="alert">
        Something went wrong while logging in.
    </div>
);

export default Login