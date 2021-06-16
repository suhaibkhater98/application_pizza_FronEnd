import React, { useEffect, useState} from 'react';
import axios from "axios";
import base_url from '../ApiUrl'
import ClipLoader from "react-spinners/ClipLoader";

const Register = (props) => {

    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmed, setConfirmPassword] = useState('');
    const [loading , setLoading] = useState(false)
    

    useEffect( () => {
        if(window.sessionStorage.getItem('token')) {
            props.history.push('/');
        }
    }, []);

    const postRegister = async(event) => {
        event.preventDefault();
        setLoading(true)
        setError('');
        setMsg('');
        if(password !== password_confirmed){
            setError('Confirm Password does not match');
        } else {
            let data = {
                name: name,
                email: email,
                password: password,
                password_confirmed: password_confirmed
            };
            try {
                const response = await axios.request({
                    url: base_url+'register',
                    method: 'POST',
                    data: data
                });
                console.log(response)
                if (response.data.success) {
                    alert(response.data.msg)
                    window.sessionStorage.setItem('token' , response.data.token)
                    window.sessionStorage.setItem('user_id' , response.data.user_id)
                    props.history.push('/')
                } else {
                    setError(response.data.msg);
                }
            } catch (e) {
                setError(e.message);
            }
            setLoading(false)
        }
    }

    const formStyle = {
        marginTop: '25px'
    };

    const inputStyle = {
        marginBottom: '5px'
    };

    const override = {display: 'block', margin: '0 auto'}

    return (
        <div className="container h-100 register-container">
            {msg !== '' && <Success msg={msg}/>}
            {error !== '' && <Error error={error}/>}
            <ClipLoader color="#365BD7" css={override} loading={loading} size={35} />

            <div className="row h-100 justify-content-center align-items-center">
                <form style={formStyle} onSubmit={ (event) => postRegister(event)} method="POST" className="form-signin col-4">
                    <h1 className="h3 mb-3 font-weight-normal">Register a new user</h1>
                    <label htmlFor="inputName" className="sr-only">Name</label>
                    <input style={inputStyle} onChange={(e) => setName(e.target.value)} name="name" type="text" className="form-control" placeholder="Name" required autoFocus />
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input style={inputStyle} onChange={(e) => setEmail(e.target.value)} name="email" type="email" className="form-control" placeholder="Email address" required />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input style={inputStyle} onChange={(e) => setPassword(e.target.value)} name="password" type="password"  className="form-control" placeholder="Password" required />
                    <label htmlFor="inputPassword" className="sr-only">Confirm Password</label>
                    <input style={inputStyle} onChange={(e) => setConfirmPassword(e.target.value)} name="password_confirmed" type="password"  className="form-control" placeholder="Confirm Password" required />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

const Success = (props) => (
    <div style={{ marginTop: '10px' }} className="alert alert-success" role="alert">
        {props.msg}
    </div>
);

const Error = (props) => (
    <div style={{ marginTop: '10px' }} className="alert alert-danger" role="alert">
        {props.error}
    </div>
);

export default Register;