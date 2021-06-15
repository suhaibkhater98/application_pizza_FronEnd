import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Root from "./components/Root";

const App = () => {
    return (
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    );
}

export default App;
