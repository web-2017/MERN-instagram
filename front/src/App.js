import React from "react";

import {Navbar} from "./components/Navbar";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from "./screens/Home";
import SignIn from "./screens/Signin";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";


function App() {
    return (
        <Router>
            <Navbar/>
            <Route path='/' exact><Home/></Route>
            <Route path='/signin' ><SignIn/></Route>
            <Route path='/signup' ><Signup/></Route>
            <Route path='/profile' ><Profile/></Route>
        </Router>
    );
}

export default App;
