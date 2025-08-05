import { Schema, model } from "mongoose"

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        required: true,
        type: String
    }
}, { timestamps: true })

const Posts = model('Post', postSchema);

export default Posts