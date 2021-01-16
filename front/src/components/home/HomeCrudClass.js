import {PUBLIC_URL} from "../../config/KEYS";
import loglevel from "../../middleware/loglevel";

class HomeCrudClass {
    constructor(token) {
        this.header = {
            'Content-type': 'application/json',
            'Authorization': token || `Bearer ${localStorage.getItem('token')}`
        }
    }

    async getPosts() {
        try {
            const response = await fetch(`${PUBLIC_URL}/allposts`, {
                method: 'get',
                headers: this.header
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
                headers: this.header,
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
                headers: this.header,
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
                headers: this.header,
                body: JSON.stringify({postId, text})
            })

            const result = await response.json()

            loglevel.debug(result)

            return result

        } catch (e) {
            loglevel.error(e)
        }
    }

    async removeComment(postId, commentId) {
        const response = await fetch(`${PUBLIC_URL}/deletecomment/${postId}/${commentId}`, {
            method: 'delete',
            headers: this.header,
        })

        const result = await response.json()

        loglevel.debug(result)

        return result
    };

    async deletePost(postId) {
        try {
            const response = await fetch(`${PUBLIC_URL}/deletepost/${postId}`, {
                method: 'delete',
                headers: this.header,
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