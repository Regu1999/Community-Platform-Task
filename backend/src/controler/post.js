import { validationResult } from "express-validator"

import Post from "../model/Posts.js"
export const createPost = async (req, res, next) => {
    const errorResult = validationResult(req)

    try {
        if (!errorResult.isEmpty()) {
            console.log(errorResult.array());
            const error = new Error("User signup failed due to validation errors.");
            error.status = 422;
            error.info = errorResult.array();
            throw error
        }

        const user = req.user;
        const { text } = req.body;

        const newPost = new Post({ text, userId: user._id })
        await newPost.save()
        res.status(201).json({ message: "Post created!" })
    } catch (error) {
        next(error)
    }

}
export const getPosts = async (req, res, next) => {
    try {

        const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', '-bio -email -__v -password').exec()
        res.status(200).json(posts)

    } catch (error) {
        next(error)
    }
}

export const updatePost = async (req, res, next) => {
    const { postId, text } = req.body;
    const userId = req.user._id
    try {
        const post = await Post.findOne({ _id: postId })
        if (post.userId.toString() !== userId.toString()) {
            throw new Error("You can't Change another user Posts")
        }
        await Post.updateOne({ _id: postId }, {$set:{text}})
        res.status(200).json({ message: 'Updated successfully' })

    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user._id;
    try {
        const post = await Post.findOne({ _id: postId })
        if (post.userId.toString() != userId.toString()) {
            throw new Error("You can't delete another user Posts")
        }
        await Post.deleteOne({ _id: postId })
        res.status(200).json({ message: 'deleted successfully' })

    } catch (error) {
        next(error)
    }
}