import React from "react";

import {Link} from "react-router-dom";

import '../App.css'

export const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper grey darken-3">
                <Link to="/" className="brand-logo">Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/signin">Signin</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Create Post</Link></li>
                </ul>
            </div>
        </nav>

    )
}

