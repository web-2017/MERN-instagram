import React, {useContext, useEffect, useRef, useState} from 'react';

import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'

import {UserContext} from '../App';

import '../App.css';

import {apiUrls} from '../api'


export const Navbar = () => {
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);
    const refModal = useRef(null)
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        M.Modal.init(refModal.current);
    }, [])


    const logoutHandler = () => {
        localStorage.clear();
        dispatch({type: 'CLEAR'});
        history.push(`${apiUrls.login}`, null);
    };

    const renderMenuList = () => {
        if (state) {
            return (
                <>
                    <li>
                        <i data-target="modal1" className="material-icons modal-trigger">search</i>
                    </li>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/create'>Create Post</Link>
                    </li>
                    <li>
                        <Link to='/myfollowingpost'>My Following Post</Link>
                    </li>
                    <li>
                        <button
                            onClick={() => logoutHandler()}
                            className='btn #c62828 red darken-3'
                        >
                            Logout
                        </button>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li>
                        <Link to='/signin'>Signin</Link>
                    </li>
                    <li>
                        <Link to='/signup'>Signup</Link>
                    </li>
                </>
            );
        }
    };

    const fetchUsersHandler = async (query) => {
        setSearch(query)
        const options = {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({query})
        }

        try {
            console.log('in settime out')
            const response = await fetch(`/${apiUrls.searchUser}`, options)
            const data = await response.json()
            setUserDetails(data.user)
        } catch (e) {
            console.error(e)
        }

    }

    const closeModalHandler = () => {
        M.Modal.getInstance(refModal.current).close()
        setSearch('')
    }

    return (
        <nav>
            <div className='nav-wrapper '>
                <Link to={state ? '/' : '/signin'} className='brand-logo'>
                    Instagram
                </Link>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    {renderMenuList()}
                </ul>
            </div>
            <div id="modal1" className="modal" ref={refModal} style={{color: '#000'}}>
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <input
                        type='text'
                        placeholder='search ussers'
                        required
                        value={search}
                        onChange={(e) => fetchUsersHandler(e.target.value)}
                    />
                    <ul className="collection" style={collectionClass}>
                        {userDetails.map(user => {
                            return (
                                <a onClick={() => closeModalHandler()}
                                   key={user._id}
                                   href={user._id !== state._id ? `/profile/${user._id}` : '/profile'}
                                   className='collection-item'
                                >{user.email}</a>
                            )
                        })}

                    </ul>
                </div>

                <div className="modal-footer">
                    <button
                        onClick={() => setSearch('')}
                        className="modal-close waves-effect waves-green btn-flat"
                    >
                        close
                    </button>
                </div>
            </div>
        </nav>
    );
}


const collectionClass = {
    display: 'flex',
    flexDirection: 'column',
    color: '#000 !important'
}