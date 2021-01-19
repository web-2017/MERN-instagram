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
	const { userId } = useParams();
	const [userProfile, setProfile] = useState(null);
	const { state } = useContext(UserContext);

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
						<h6>{userProfile?.posts.length} posts</h6>
						<h6>40 followers</h6>
						<h6>40 following</h6>
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
