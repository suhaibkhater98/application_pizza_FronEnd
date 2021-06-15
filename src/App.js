import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Root from "./components/Root";

const App = () => {
    return (
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    );
}

export default App;
