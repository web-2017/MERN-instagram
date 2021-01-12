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

            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result
                } else {
                    return item
                }
            })

            setData(newData)

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

            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result
                } else {
                    return item
                }
            })

            setData(newData)

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
                        <HomeCard key={post._id} className="card">
                            <h5>{post.postedBy.name}</h5>
                            <CardImage>
                                <img style={{width: '100%'}} src={post.image} alt=""/>
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
                                <input type="text" placeholder='add comment'/>
                            </CardContent>
                        </HomeCard>
                    )
                })
            }
        </HomeContainer>
    )
}

export default Home