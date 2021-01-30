import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Toast from '../components/Toast'
import { CLOUDINARY_URL, PUBLIC_URL } from '../config/KEYS'

import { validateEmail } from '../filters/validateEmail'
import { CloundaryImagePostData } from '../helpers/CloundaryImagePostData'

export const SignUp = () => {
	const history = useHistory()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [image, setImage] = useState('')
	const [url, setImageUrl] = useState('')

	useEffect(() => {
		if (url) {
			uploadFields()
		}
	}, [url])

	const uploadImageDataHandler = async () => {
		try {
			/**
			 * CloundaryImagePostData
			 * @type {FormData}
			 */
			const data = await CloundaryImagePostData(image)

			const response = await fetch(CLOUDINARY_URL, {
				method: 'post',
				body: data,
			})

			const result = await response.json()
			setImageUrl(result.url)
			console.log('uploadImageDataHandler', data)
		} catch (e) {
			console.error(e)
		}
	}

	// SignUp user
	const uploadFields = async () => {
		// check email and password
		if (!validateEmail(email)) {
			Toast(`Не правильный Email`, true)
			return
		} else if (password.length < 5) {
			Toast(`Пароль должен быть больше 5 символов!`, true)
			return
		}

		try {
			// const response = await fetch(`${PUBLIC_URL}/signup`, {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		name,
			// 		email,
			// 		password,
			// 		pic: url,
			// 	}),
			// })

			// const result = await response.json()
			// console.info('Поздравляем. ', result)
			console.info('url. ', url)

			// if (result.error) {
			// 	Toast(result.error, true)
			// 	console.error(result)
			// } else {
			// 	Toast(`Добро пожаловать!`)
			// 	history.push('/signin')
			// }
		} catch (e) {
			console.error(e)
		}
	}

	const SignUpData = async () => {
		if (image) {
			uploadImageDataHandler() // if image upload
		} else {
			uploadFields()
		}
	}

	return (
		<div className="myCard container ">
			<div className="card auth-card input-field">
				<h2 className="auth-h2">Instagram</h2>
				<input type="text" placeholder="name" required value={name} onChange={(e) => setName(e.target.value)} />
				<input type="text" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
				<input
					type="password"
					placeholder="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="file-field input-field">
					<div className="btn">
						<span>Avatar</span>
						<input type="file" />
					</div>
					<div className="file-path-wrapper">
						<input
							className="file-path validate"
							type="text"
							placeholder="Upload one or more files"
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
				</div>
				<button className="btn waves-effect waves-light blue darken-2" type="submit" onClick={() => SignUpData()}>
					SignUp
				</button>
				<h6>
					<Link to="signin">Already have an account?</Link>
				</h6>
			</div>
		</div>
	)
}

export default SignUp
