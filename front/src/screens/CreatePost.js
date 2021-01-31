import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Toast from '../components/Toast';

import { CLOUDINARY_URL, PUBLIC_URL } from '../config/KEYS';
import { CloundaryImagePostData } from '../helpers/CloundaryImagePostData';

import { PostCreateContainer } from '../assets/PostStyle';

export const CreatePost = () => {
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [file, setFile] = useState('');
	const [imgUrl, setImageUrl] = useState('');

	useEffect(() => {
		if (imgUrl) {
			sendPostData();
		}
		return () => {
			setImageUrl('');
			setTitle('');
			setBody('');
		};
	}, [imgUrl]);

	const createImageAndPostHandler = async () => {
		try {
			/**
			 * CloundaryImagePostData
			 * @type {FormData}
			 */
			const data = await CloundaryImagePostData(file);

			const response = await fetch(CLOUDINARY_URL, {
				method: 'post',
				body: data,
			});

			const result = await response.json();
			setImageUrl(result.url);
		} catch (e) {
			console.error(e);
		}
	};

	const sendPostData = async () => {
		try {
			const options = { title, body, image: imgUrl };

			const response = await fetch(`${PUBLIC_URL}/createpost`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(options),
			});

			const result = await response.json();

			if (result.error) {
				Toast(result.error, true);
				console.debug(result);
			} else {
				Toast(`Создали пост!`);
				history.push('/');
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<PostCreateContainer className='card'>
			<input
				type='text'
				placeholder='title'
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<input
				type='text'
				placeholder='text'
				value={body}
				onChange={(event) => setBody(event.target.value)}
			/>

			<div className='file-field input-field'>
				<div className='btn #64b5f6 blue darken-1'>
					<span>Uplaod Image</span>
					<input type='file' onChange={(e) => setFile(e.target.files[0])} />
				</div>
				<div className='file-path-wrapper'>
					<input className='file-path validate' type='text' />
				</div>
			</div>
			<button
				className='btn waves-effect waves-light blue darken-2'
				type='submit'
				onClick={() => createImageAndPostHandler()}
			>
				Submit post
			</button>
		</PostCreateContainer>
	);
};

export default CreatePost;
