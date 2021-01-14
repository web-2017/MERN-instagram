import React, {useState, useEffect, useContext} from "react";

import HomeCrudClass from '../components/home/HomeCrudClass'

import {HomeContainer, HomeCard, CardImage, CardContent} from "../assets/HomeStyle";

import {UserContext} from "../App";

const Home = () => {
    const CreateHomeCrud = new HomeCrudClass(`Bearer ${localStorage.getItem('token')}`)

    const {state} = useContext(UserContext)
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

    // like post func
    const likePostHandler = async (id) => {
        const like = await CreateHomeCrud.likePostHandler(id)
        setData(newPostData(data, like))
    }

    // unlike post func
    const unLikePostHandler = async (id) => {
        const unLike = await CreateHomeCrud.unLikePostHandler(id)
        setData(newPostData(data, unLike))
    }

    // create comments
    const makeComment = async (text, postId) => {
        const comment = await CreateHomeCrud.makeComment(text, postId)
        setData(newPostData(data, comment))
    }

    // delete comments
    const deletePost = async (postId) => {
        const post = await CreateHomeCrud.deletePost(postId)

        const filterData = data.filter(item => {
            return item._id != post._id
        })

        setData(filterData)
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