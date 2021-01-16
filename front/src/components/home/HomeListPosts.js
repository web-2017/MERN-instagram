import React, {useContext} from "react";
import {CardContent, CardImage, HomeCard} from "../../assets/HomeStyle";
import {UserContext} from "../../App";

export default ({post, deletePost, likePostHandler, unLikePostHandler, makeComment, removeCommentHandler}) => {
    const {state} = useContext(UserContext)
    return (
        <HomeCard className="card flex space-between">
            <div className="row">
                <div className="col flow-text">
                    <span>{post.postedBy.name}</span>
                </div>

                <div className="col flow-text">
                    {
                        post.postedBy._id == state.id
                        &&
                        <span><i className="material-icons" onClick={() => deletePost(post._id)}>delete</i></span>
                    }
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
                            <h6 key={comment._id}>
                                <span className='text-darken-1'><b>{comment.postedBy.name}</b></span>
                                <span> {comment.text}</span>

                                {(post.postedBy._id && comment.postedBy._id) ==
                                state.id && (
                                    <i className="material-icons"
                                       title='remove'
                                       onClick={() => removeCommentHandler(post._id, comment._id)}
                                    >remove</i>
                                )}
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
                }