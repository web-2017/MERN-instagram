import React, { useEffect, createContext, useReducer, useContext } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useHistory,
} from 'react-router-dom';

import './App.css';

import { Navbar } from './components/Navbar';
import Container from './components/Container';

import Home from './screens/Home';
import SignIn from './screens/Signin';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import UserProfile from './screens/UserProfile';
import CreatePost from './screens/CreatePost';
import SubscribesUserPost from './screens/SubscribesUserPost';
import ResetPassword from './screens/ResetPassword';
import NewPassword from './screens/NewPassword';

import routesApi from './constants/routesApi';

import { reducer, initialState } from './store/userReducer';

export const UserContext = createContext();

const Routing = () => {

	const history = useHistory();
	const { dispatch } = useContext(UserContext);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch({ type: 'USER', payload: user });
		} else if (!history.location.pathname.startsWith('/reset')) {
			history.push(`/${routesApi.login}`);
		}
	}, []);

	return (
		<Switch>
			<Container>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/signin'>
					<SignIn />
				</Route>
				<Route path='/signup'>
					<Signup />
				</Route>
				<Route path='/create'>
					<CreatePost />
				</Route>
				<Route exact path='/profile'>
					<Profile />
				</Route>
				<Route path='/profile/:userId'>
					<UserProfile />
				</Route>
				<Route path='/myfollowingpost'>
					<SubscribesUserPost />
				</Route>
				<Route exact path='/reset'>
					<ResetPassword />
				</Route>
				<Route path='/reset/:token'>
					<NewPassword />
				</Route>
			</Container>
		</Switch>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<Router>
				<Navbar />
				<Routing />
			</Router>
		</UserContext.Provider>
	);
}

export default App;
