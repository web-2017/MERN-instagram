import {PUBLIC_URL} from "../../config/KEYS";
import loglevel from "../../middleware/loglevel";

class HomeCrudClass {
    constructor(token) {
        this.token = token || `Bearer ${localStorage.getItem('token')}`
        this.allPostUrl = 'allposts'
    }

    async getPosts() {
        try {
            const response = await fetch(`${PUBLIC_URL}/${this.allPostUrl}`, {
                method: 'get',
                headers: {
                    'Authorization': this.token
                },
            })

            const result = await response.json()

            loglevel.debug(result)

            return result

        } catch (e) {
            loglevel.error(e)
        }
    }

    async likePostHandler(id) {
        try {
            const response = await fetch(`${PUBLIC_URL}/like`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': this.token
                },
                body: JSON.stringify({
                    postId: id
                })
            })

            const result = await response.json()

            loglevel.debug(result)
            return result

        } catch (e) {
            loglevel.error(e)
        }
    }

    async unLikePostHandler(id) {
        try {
            const response = await fetch(`${PUBLIC_URL}/unlike`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': this.token
                },
                body: JSON.stringify({
                    postId: id
                })
            })

            const result = await response.json()

            loglevel.debug(result)

            return result

        } catch (e) {
            loglevel.error(e)
        }
    }

    async makeComment(text, postId) {
        try {
            const response = await fetch(`${PUBLIC_URL}/comment`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({postId, text})
            })

            const result = await response.json()

            loglevel.debug(result)

            return result

        } catch (e) {
            loglevel.error(e)
        }
    }

    async deletePost(postId) {
        try {
            const response = await fetch(`${PUBLIC_URL}/deletepost/${postId}`, {
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            const result = await response.json()

            loglevel.debug(result)

            return result

        } catch (e) {
            loglevel.error(e)
        }
    }
}

export default HomeCrudClass