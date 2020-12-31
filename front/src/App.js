import React from "react";

import {Navbar} from "./components/Navbar";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";


function App() {
    return (
        <Router>
            <Navbar/>
            <Route path='/' exact ><Home/></Route>
            <Route path='/signin' ><Signin/></Route>
            <Route path='/signup' ><Signup/></Route>
            <Route path='/profile' ><Profile/></Route>
        </Router>
    );
}

export default App;
