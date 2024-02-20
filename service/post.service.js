import { PostModel } from "../model/post.model.js";
import { UserModel } from "../model/user.model.js";
import { asynCatch } from "../utils/trycatch.js";

export const createPost = async (req, res, next) => {
  const { title, content, createdAt, isPublic, userId } = req.body;
  
  try {
    const user = await UserModel.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    const post = await PostModel.create({
      title,
      content,
      // authorId: userId,
      authorFullName: user.fullname,
      createdAt,
      isPublic,
      roles: 'admin'
    });
    
    await UserModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });
    
    res.status(201).send(post);
  } catch (error){
    next(error);
  }
};


export const deletePost = asynCatch(async (req, res, next) => {
  const { postId } = req.params;
  const existingPost = await PostModel.findById(postId);
  if (!existingPost) {
    res.status(404).send("No post found");
  } else {
    await UserModel.findByIdAndUpdate("65be3f6bd2b9fe91830aebcc", {
      $pull: { posts: postId },
    }); // Xoá quan hệ
    await PostModel.findByIdAndDelete(postId); // Xoá collection chính
    res.sendStatus(204);
  }
});