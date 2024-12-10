import mongoose from 'mongoose';
import Joi from 'joi';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    }
},
{
    timestamps: true
},

);

const Post = mongoose.model('Post', postSchema);

const validatePost = (post) => {
    const PostSchema = Joi.object({
        title: Joi.string().required().min(3).max(255),
        content: Joi.string().required().min(5).max(7000),
        image: Joi.string()
    });
    return PostSchema.validate(post);
}

export default { Post, validatePost };
