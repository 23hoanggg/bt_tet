import express from 'express';
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    email: String,
    password: String,
    fullname: String,
    roles : ['user']
})
const UserModel = mongoose.model('User',userSchema);
export {UserModel};