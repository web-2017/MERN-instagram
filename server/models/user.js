import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
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
	avatar: {
		type: String,
		default:
			'https://res.cloudinary.com/mario0284/image/upload/v1610906511/exemple/asd_qhdyw0.jpg',
	},
	followers: [{ type: ObjectId, ref: 'User' }],
	following: [{ type: ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);

export default User;
