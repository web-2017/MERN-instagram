import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CardContent, CardImage, HomeCard } from '../../assets/HomeStyle';
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
	const { _id: postedId, name: postedName } = post.postedBy;
	const { _id: id } = post;

	const checkIsCurrentUserHandler = () => {
		return post.postedBy._id !== state.id
			? `/profile/${postedId}`
			: `/profile/`;
	};

	return (
		<HomeCard className='card flex space-between'>
			<h5>
				<Link to={checkIsCurrentUserHandler}> {postedName}</Link>
			</h5>
			<div className='col flow-text'>
				{postedId === state.id && (
					<span>
						<i className='material-icons' onClick={() => deletePost(id)}>
							delete
						</i>
					</span>
				)}
			</div>
			<CardImage className='card-image'>
				<img style={{ width: '100%' }} src={post.image} alt='' />
				<span className='card-title'>Card Title</span>
			</CardImage>
			<CardContent>
				<i className='small material-icons red-text'>favorite</i>
				{post.likes.includes(state.id) ? (
					<i className='material-icons' onClick={() => unLikePostHandler(id)}>
						thumb_down
					</i>
				) : (
					<i className='material-icons' onClick={() => likePostHandler(id)}>
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
									onClick={() => removeCommentHandler(id, comment._id)}
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
						makeComment(event.target[0].value, id);
						event.target[0].value = '';
					}}
				>
					<input type='text' placeholder='add comment and press Enter' />
				</form>
			</CardContent>
		</HomeCard>
	);
};

export default HomeListPosts;
