import {KEYS} from '../../config/KEYS'
import API from '../../constants/API'
const {PUBLIC_URL} = KEYS

class HomeCrudClass {
	constructor(token) {
		this.header = {
			'Content-type': 'application/json',
			Authorization: token,
		}
	}

	async getPosts() {
		try {
			const response = await fetch(`${PUBLIC_URL}/${API.posts}`, {
				method: 'get',
				headers: this.header,
			})

			const result = await response.json()

			console.debug(result)

			return result
		} catch (e) {
			console.error(e)
		}
	}

	async getSubscribePostData() {
		try {
			const response = await fetch(`${PUBLIC_URL}/${API.subscribepost}`, {
				headers: this.header,
			})

			const result = await response.json()

			console.debug(result)

			return result
		} catch (e) {
			console.error(e)
		}
	}

	async likePostHandler(id) {
		try {
			const response = await fetch(`${PUBLIC_URL}/${API.like}`, {
				method: 'put',
				headers: this.header,
				body: JSON.stringify({
					postId: id,
				}),
			})

			const result = await response.json()

			console.debug(result)
			return result
		} catch (e) {
			console.error(e)
		}
	}

	async unLikePostHandler(id) {
		try {
			const response = await fetch(`${PUBLIC_URL}/${API.unlike}`, {
				method: 'put',
				headers: this.header,
				body: JSON.stringify({
					postId: id,
				}),
			})

			const result = await response.json()

			console.debug(result)

			return result
		} catch (e) {
			console.error(e)
		}
	}

	async makeComment(text, postId) {
		try {
			const response = await fetch(`${PUBLIC_URL}/${API.comment}`, {
				method: 'put',
				headers: this.header,
				body: JSON.stringify({ postId, text }),
			})

			const result = await response.json()

			console.debug(result)

			return result
		} catch (e) {
			console.error(e)
		}
	}

	async removeComment(postId, commentId) {
		const response = await fetch(`${PUBLIC_URL}/deletecomment/${postId}/${commentId}`, {
			method: 'delete',
			headers: this.header,
		})

		const result = await response.json()

		console.debug(result)

		return result
	}

	async deletePost(postId) {
		try {
			const response = await fetch(`${PUBLIC_URL}/${API.deletes}/${postId}`, {
				method: 'delete',
				headers: this.header,
			})

			const result = await response.json()

			console.debug(result)

			return result
		} catch (e) {
			console.error(e)
		}
	}
}

export default HomeCrudClass
