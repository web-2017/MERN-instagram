import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default:
				'https://res.cloudinary.com/mario0284/image/upload/v1612036070/noimage_rcvccx.png',
		},
		followers: [{ type: ObjectId, ref: 'User' }],
		following: [{ type: ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
