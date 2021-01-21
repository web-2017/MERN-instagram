import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import { HEADERS_OPTIONS } from '../config/KEYS';
import loglevel from '../middleware/loglevel';

// styles
import {
	ImageAvatar,
	ProfileContainer,
	ProfileHeader,
	ProfileFollowerContainer,
	GalleryContainer,
	GalleryItem,
} from '../assets/ProfileStyles';

const UserProfile = () => {
	const [userProfile, setProfile] = useState(null);
	const [showFollow, setShowFollow] = useState(true);
	const { userId } = useParams();
	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		getMyPost();
	}, []);

	const getMyPost = async () => {
		try {
			const response = await fetch(`/user/${userId}`, {
				method: 'get',
				headers: HEADERS_OPTIONS,
			});

			const result = await response.json();

			setProfile(result);

			loglevel.debug(result);
		} catch (e) {
			loglevel.error(e);
		}
	};

	const followUserHandler = async () => {
		try {
			const response = await fetch(`/follow`, {
				method: 'put',
				headers: HEADERS_OPTIONS,
				body: JSON.stringify({
					followId: userId,
				}),
			});

			const result = await response.json();
			const { following, followers } = result;
			dispatch({
				type: 'UPDATE',
				payload: { following, followers },
			});
			localStorage.setItem('user', JSON.stringify(result));
			setProfile((prevState) => {
				return {
					...prevState,
					user: {
						...prevState.user,
						followers: [...prevState.user.followers, result._id],
					},
				};
			});

			setShowFollow(false);

			loglevel.debug(result);
		} catch (e) {
			loglevel.error(e);
		}
	};

	const unFollowUserHandler = async () => {
		try {
			const response = await fetch(`/unfollow`, {
				method: 'put',
				headers: HEADERS_OPTIONS,
				body: JSON.stringify({
					unFollowId: userId,
				}),
			});

			const result = await response.json();

			const { following, followers } = result;
			console.log(111, result);

			dispatch({
				type: 'UPDATE',
				payload: { following, followers },
			});

			localStorage.setItem('user', JSON.stringify(result));

			setProfile((prevState) => {
				const newFollower = prevState.user.followers.filter((id) => {
					console.log(id);
					console.log(result._id);
					return id !== result._id;
				});

				return {
					...prevState,
					user: {
						...prevState.user,
						followers: newFollower,
					},
				};
			});

			setShowFollow(true);
			loglevel.debug(result);
		} catch (e) {
			loglevel.error(e);
		}
	};

	return (
		<ProfileContainer>
			<ProfileHeader>
				<div>
					<div>
						<ImageAvatar src={state?.avatar} alt={state?.name} />
					</div>
				</div>

				<div>
					<h4>{userProfile?.user?.name}</h4>
					<h4>{userProfile?.user?.email}</h4>
					<ProfileFollowerContainer>
						<h6>{userProfile?.posts?.length} posts </h6>

						<h6>{userProfile?.user?.followers.length} followers </h6>
						<h6>{userProfile?.user?.following.length} following </h6>
						{showFollow ? (
							<button
								className='btn waves-effect waves-light blue darken-2'
								type='submit'
								onClick={() => followUserHandler()}
							>
								Follow
							</button>
						) : (
							<button
								className='btn waves-effect waves-light blue darken-2'
								type='submit'
								onClick={() => unFollowUserHandler()}
							>
								unfollow
							</button>
						)}
					</ProfileFollowerContainer>
				</div>
			</ProfileHeader>
			<GalleryContainer>
				{userProfile?.posts?.map((post) => (
					<GalleryItem key={post._id} src={post.image} alt={post.title} />
				))}
			</GalleryContainer>
		</ProfileContainer>
	);
};

export default UserProfile;
