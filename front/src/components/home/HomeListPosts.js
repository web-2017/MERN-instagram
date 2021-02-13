import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	CardContent,
	CardImage,
	HomeCard,
	HomeCardTitle,
} from '../../assets/HomeStyle';
import { UserContext } from '../../App';

const HomeListPosts = ({
	post,
	deletePost,
	likePostHandler,
	unLikePostHandler,
	makeComment,
	removeCommentHandler,
}) => {
	const { state } = useContext(UserContext);
	const { _id: postId } = post
	const { _id: postedById, name: postedByName } = post.postedBy;

	const checkIsCurrentUserHandler = () => {
		return post.postedBy._id !== state.id
			? `/profile/${postedById}`
			: `/profile/`;
	};

	return (
		<HomeCard className='card flex space-between'>
			<HomeCardTitle>
				<h5 style={{ margin: 0 }}>
					<Link to={checkIsCurrentUserHandler}> {postedByName}</Link>
				</h5>
				<div className='col flow-text'>
					{postedById === state.id && (
						<span>
							<i className='material-icons' onClick={() => deletePost(postId)}>
								delete
							</i>
						</span>
					)}
				</div>
			</HomeCardTitle>
			<CardImage className='card-image'>
				<img style={{ width: '100%', height: '100%' }} src={post.image} alt='' />
				<span className='card-title'>Card Title</span>
			</CardImage>
			<CardContent>
				<i className='small material-icons red-text'>favorite</i>

				{post.likes.includes(state._id) ? (
					<i className='material-icons' onClick={() => unLikePostHandler(postId)}>
						thumb_down
					</i>
				) : (
					<i className='material-icons' onClick={() => likePostHandler(postId)}>
						thumb_up
					</i>
				)}

				<h6>{post.likes.length} likes</h6>
				<h6>{post.title}</h6>
				<p>{post.body}</p>

				{post?.comments.map((comment) => {
					return (
						<h6 key={comment._id}>
							<span className='text-darken-1'>
								<b>{comment.postedBy.name}</b>
							</span>
							<span> {comment.text}</span>

							{comment.postedBy._id === state.id && (
								<i
									className='material-icons'
									title='remove'
									onClick={() => removeCommentHandler(postId, comment._id)}
								>
									remove
								</i>
							)}
						</h6>
					);
				})}

				<form
					onSubmit={(event) => {
						event.preventDefault();
						makeComment(event.target[0].value, postId);
						event.target[0].value = '';
					}}
				>
					<input type='text' placeholder='add comment and press Enter' />
				</form>
			</CardContent>
		</HomeCard>
	);
};

HomeListPosts.propTypes = {
	post: PropTypes.object,
};

export default HomeListPosts;
