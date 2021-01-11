import React, {useContext} from "react";

import {Link, useHistory} from "react-router-dom";

import {UserContext} from "../App";

import '../App.css'

export const Navbar = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)


    const logoutHandler = () => {
        localStorage.clear()
        dispatch({type: 'CLEAR'})
        history.push('/signin', null);
    }

    const renderMenuList = () => {
        if (state) {
            return (
                <>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Create Post</Link></li>
                    <li>
                        <button onClick={() => logoutHandler()} className="btn #c62828 red darken-3">Logout</button>
                    </li>
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
            <div className="nav-wrapper ">
                <Link to={state ? '/' : '/signin'} className="brand-logo">Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderMenuList()}
                </ul>
            </div>
        </nav>

    )
}

