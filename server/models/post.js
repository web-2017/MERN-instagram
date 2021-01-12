import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId, ref: 'User',
    }],
    image: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post