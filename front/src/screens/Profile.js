import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import { CLOUDINARY_URL, PUBLIC_URL } from '../config/KEYS';
import { CloundaryImagePostData } from '../helpers/CloundaryImagePostData';

// styles
import {
	ImageAvatar,
	ProfileContainer,
	ProfileHeader,
	ProfileFollowerContainer,
	GalleryContainer,
	GalleryItem,
} from '../assets/ProfileStyles';

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const [file, setFile] = useState(null);
	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		getMyPost();
	}, []);

	useEffect(() => {
		if (file) {
			createImageHandler();
		}
	}, [file]);

	const getMyPost = async () => {
		try {
			const response = await fetch(`${PUBLIC_URL}/mypost`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});

			const result = await response.json();

			setPosts(result);

			console.debug(result);
		} catch (e) {
			console.error(e);
		}
	};

	const createImageHandler = async () => {
		const data = await CloundaryImagePostData(file);

		await fetch(CLOUDINARY_URL, {
			method: 'put',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				fetch('/updateavatar', {
					method: 'put',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						image: data.url,
					}),
				})
					.then((res) => res.json())
					.then((result) => {
						console.log(result);
						localStorage.setItem(
							'user',
							JSON.stringify({ ...state, image: result.image })
						);
						dispatch({ type: 'AVATAR', payload: result.image });
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updatePhoto = (file) => {
		setFile(file);
	};

	return (
		<ProfileContainer>
			<ProfileHeader>
				<div>
					<div>
						<ImageAvatar src={state?.pic} alt={state?.name} />
					</div>
				</div>

				<div>
					<h4>{state?.name}</h4>
					<h5>{state?.email}</h5>
					<ProfileFollowerContainer>
						<h6>{posts?.length} posts</h6>
						<h6>{state?.followers?.length} followers</h6>
						<h6>{state?.following?.length} following</h6>
					</ProfileFollowerContainer>
				</div>
				<div className='file-field input-field' style={{ margin: '10px' }}>
					<div className='btn #64b5f6 blue darken-1'>
						<span>Update Avatar</span>
						<input
							type='file'
							onChange={(e) => updatePhoto(e.target.files[0])}
						/>
					</div>
					<div className='file-path-wrapper'>
						<input className='file-path validate' type='text' />
					</div>
				</div>
			</ProfileHeader>
			<GalleryContainer>
				{posts.map((post) => (
					<GalleryItem key={post._id} src={post.image} alt={post.title} />
				))}
			</GalleryContainer>
		</ProfileContainer>
	);
};

export default Profile;
