import React from "react";
import {Link} from "react-router-dom";

export default () => {
    return (
        <div className="myCard container ">
            <div className="card auth-card input-field ">
                <h2 className='auth-h2'>Instagram</h2>
                <input type="text"
                       placeholder='email'
                       required
                />
                <input type="password"
                       placeholder='password'
                       required
                />
                <button className="btn waves-effect waves-light blue darken-2" type="submit">
                    Login
                </button>
                <h6>
                    <Link to='signup'>Dont have an account?</Link>
                </h6>
            </div>
        </div>
    )
}