import React, { useContext, useRef, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css'

import { UserContext } from '../App';

import '../App.css';

export const Navbar = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	const refModal = useRef(null)
	const [search, setSearch] = useState('')

	useEffect(()=> {
		M.Modal.init(refModal.current);
	}, [])

	const logoutHandler = () => {
		localStorage.clear();
		dispatch({ type: 'CLEAR' });
		history.push('/signin', null);
	};

	const renderMenuList = () => {
		if (state) {
			return (
				<>
					<li>
						<i data-target="modal1" className="material-icons modal-trigger" >search</i>
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
						onChange={(e) => setSearch(e.target.value)}
					/>
					<ul className="collection">
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
					</ul>
				</div>
				<div className="modal-footer">
					<a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
				</div>
			</div>
		</nav>
	);
};
