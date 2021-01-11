import React, {useContext} from "react";

import {Link} from "react-router-dom";

import {UserContext} from "../App";

import '../App.css'

export const Navbar = () => {
    const {state, dispatch} = useContext(UserContext)
    const renderMenuList = () => {
        if (state) {
            return (
                <>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Create Post</Link></li>
                </>
            )
        } else {
            return (
                <>
                    <li><Link to="/signin">Signin</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </>
            )
        }
    }
    return (
        <nav>
            <div className="nav-wrapper grey darken-3">
                <Link to={state ? '/' : '/signin'} className="brand-logo">Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderMenuList()}
                </ul>
            </div>
        </nav>

    )
}

