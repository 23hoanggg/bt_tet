import mongoose from "mongoose";
import express from 'express';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorFullName: String, 
    isPublic: Boolean,
    createdAt: { type: Date, default: Date.now }
});


const PostModel = mongoose.model('Post', postSchema);
export { PostModel };
