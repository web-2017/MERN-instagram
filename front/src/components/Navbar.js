import React from "react";

import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper grey darken-3">
                <Link to="/" className="brand-logo">Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/signin">Signin</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </div>
        </nav>

    )
}

