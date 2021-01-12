import React, {useState, useEffect, useContext} from "react";

import loglevel from '../middleware/loglevel'
import {HomeContainer, HomeCard, CardImage, CardContent} from "../assets/HomeStyle";
import {PUBLIC_URL} from "../config/KEYS";
import {UserContext} from "../App";

const Home = () => {
    const {state, dispatch} = useContext(UserContext)
    const [data, setData] = useState([])

    useEffect(() => {
        postData()
    }, [])

    const newPostData = (prevData = [], res = []) => {
        const data = prevData.map(item => {
            if (item._id === res._id) {
                return res
            } else {
                return item
            }
        })
        return data
    }

    const postData = async () => {
        try {
            const response = await fetch(`${PUBLIC_URL}/allposts`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            const result = await response.json()

            setData(result)

            loglevel.debug(result)

        } catch (e) {
            loglevel.error(e)
        }
    }

    const likePostHandler = async (id) => {
        try {
            const response = await fetch(`${PUBLIC_URL}/like`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    postId: id
                })
            })

            const result = await response.json()

            setData(newPostData(data, result))

            loglevel.debug(result)

        } catch (e) {
            loglevel.error(e)
        }
    }

    const unLikePostHandler = async (id) => {
        try {
            const response = await fetch(`${PUBLIC_URL}/unlike`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    postId: id
                })
            })

            const result = await response.json()

            setData(newPostData(data, result))

            loglevel.debug(result)

        } catch (e) {
            loglevel.error(e)
        }
    }

    const makeComment = async (text, postId) => {
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

            setData(newPostData(data, result))

            loglevel.debug(result)

        } catch (e) {
            loglevel.error(e)
        }
    }

    const deletePost = async (postId) => {
        try {
            const response = await fetch(`${PUBLIC_URL}/deletepost/${postId}`, {
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            const result = await response.json()

            const filterData = data.filter(item => {
                return item._id != result._id
            })

            setData(filterData)

            loglevel.debug(result)

        } catch (e) {
            loglevel.error(e)
        }
    }

    return (
        <HomeContainer>
            {
                data.map(post => {
                    return (
                        <HomeCard key={post._id} className="card flex space-between">
                            <div className="row">
                                <div className="col flow-text">
                                    <span>{post.postedBy.name}</span>
                                </div>

                                <div className="col flow-text">
                                    {post.postedBy._id == state.id
                                    && <span>
                                        <i className="material-icons"
                                           onClick={() => deletePost(post._id)}
                                        >delete</i></span>}
                                </div>

                            </div>
                            <CardImage className='card-image'>
                                <img style={{width: '100%'}} src={post.image} alt=""/>
                                <span className="card-title">Card Title</span>
                            </CardImage>
                            <CardContent>
                                <i className="small material-icons red-text">favorite</i>
                                {
                                    post.likes.includes(state.id)
                                        ?
                                        <i className="material-icons"
                                           onClick={() => unLikePostHandler(post._id)}
                                        >thumb_down</i>
                                        : <i className="material-icons"
                                             onClick={() => likePostHandler(post._id)}
                                        >thumb_up</i>
                                }
                                <h6>{post.likes.length} likes</h6>
                                <h6>{post.title}</h6>
                                <p>{post.body}</p>
                                {
                                    post.comments.map(comment => {
                                        return (
                                            <h6 key={comment._id}><span
                                                className='text-darken-1'>{comment.postedBy.name}</span> {comment.text}
                                            </h6>
                                        )
                                    })
                                }
                                <form onSubmit={event => {
                                    event.preventDefault()
                                    makeComment(event.target[0].value, post._id)
                                    event.target[0].value = ''
                                }}>

                                    <input type="text" placeholder='add comment and press Enter'/>
                                </form>
                            </CardContent>
                        </HomeCard>
                    )
                })
            }
        </HomeContainer>
    )
}

export default Home