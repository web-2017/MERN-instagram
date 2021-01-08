import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {Navbar} from "./components/Navbar";
import Container from "./components/Container";

import Home from "./screens/Home";
import SignIn from "./screens/Signin";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";
import CreatePost from "./screens/CreatePost";

function App() {
    return (
        <Router>
            <Navbar/>
            <Container>
                <Route path='/' exact><Home/></Route>
                <Route path='/signin'><SignIn/></Route>
                <Route path='/signup'><Signup/></Route>
                <Route path='/profile'><Profile/></Route>
                <Route path='/create'><CreatePost/></Route>
            </Container>
        </Router>
    );
}

export default App;
