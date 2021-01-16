import React, {useState, useEffect,} from "react";

import {HomeContainer} from "../assets/HomeStyle";

import HomeCrudClass from '../components/home/HomeCrudClass'
import HomeListPosts from "../components/home/HomeListPosts";

const Home = () => {
    const CreateHomeCrud = new HomeCrudClass(`Bearer ${localStorage.getItem('token')}`)
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const newData = await CreateHomeCrud.getPosts()
            setData(newData)
        }
        getData()
    }, [])

    /**
     *
     * @param prevData - data
     * @param res - result of response.json
     * @returns {[data] | [res]}
     */
    const replaceData = (prevData = [], res = []) => {
        const data = prevData.map(item => {
            if (item._id === res._id) {
                return res
            } else {
                return item
            }
        })
        return data
    }

    // like post func
    const likePostHandler = async (id) => {
        const like = await CreateHomeCrud.likePostHandler(id)
        setData(replaceData(data, like))
    }

    // unlike post func
    const unLikePostHandler = async (id) => {
        const unLike = await CreateHomeCrud.unLikePostHandler(id)
        setData(replaceData(data, unLike))
    }

    // create comments
    const makeComment = async (text, postId) => {
        const comment = await CreateHomeCrud.makeComment(text, postId)
        setData(replaceData(data, comment))
    }

    // delete posts
    const deletePost = async (postId) => {
        const post = await CreateHomeCrud.deletePost(postId)
        const filterData = data.filter(item => {
            return item._id !== post._id
        })
        setData(filterData)
    }
    // delete comments
    const removeCommentHandler = async (postId, commentId) => {
        const comment = await CreateHomeCrud.removeComment(postId, commentId)
        setData(replaceData(data, comment))
    }

    return (
        <HomeContainer>
            {
                data.map(post => {
                    return (
                        <HomeListPosts
                            key={post._id}
                            post={post}
                            deletePost={deletePost}
                            likePostHandler={likePostHandler}
                            unLikePostHandler={unLikePostHandler}
                            makeComment={makeComment}
                            removeCommentHandler={removeCommentHandler}
                        />
                    )
                })
            }
        </HomeContainer>
    )
}

export default Home