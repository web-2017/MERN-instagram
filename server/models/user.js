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
	image: {
		type: String,
		default:
			'https://res.cloudinary.com/mario0284/image/upload/v1611086782/pfmszbvpaaru2ib3p0kn.jpg',
	},
	followers: [{ type: ObjectId, ref: 'User' }],
	following: [{ type: ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);

export default User;
