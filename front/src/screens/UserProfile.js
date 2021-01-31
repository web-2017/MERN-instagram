import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';

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
	const { state, dispatch } = useContext(UserContext);
	const { userId } = useParams();
	const [userProfile, setProfile] = useState(null);
	const [showFollow, setShowFollow] = useState(
		state ? !state.following.includes(userId) : true
	);

	useEffect(() => {
		getMyPost();
	}, []);

	const getMyPost = async () => {
		try {
			const response = await fetch(`/user/${userId}`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});

			const result = await response.json();

			setProfile(result);

			console.debug(result);
		} catch (e) {
			console.error(e);
		}
	};

	const followUserHandler = async () => {
		try {
			const response = await fetch(`/follow`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
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

			console.debug(result);
		} catch (e) {
			console.error(e);
		}
	};

	const unFollowUserHandler = async () => {
		try {
			const response = await fetch(`/unfollow`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					unFollowId: userId,
				}),
			});

			const result = await response.json();

			dispatch({
				type: 'UPDATE',
				payload: { following: result.following, followers: result.followers },
			});

			localStorage.setItem('user', JSON.stringify(result));

			setProfile((prevState) => {
				const newFollower = prevState.user.followers.filter((id) => {
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
			console.debug(result);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<ProfileContainer>
			<ProfileHeader>
				<div>
					<div>
						<ImageAvatar src={userProfile?.user?.pic} alt={state?.name} />
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
