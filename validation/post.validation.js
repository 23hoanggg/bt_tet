export const validatePost = (req,res,next) =>{
    const {title, content} = req.body;
    if(!title || !content){
        return res.status(400).json({message: "Title and Content are required"});
    }
    next();
}
export const validateDeletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.user; // Lấy userId của người dùng từ token

    if (!postId) {
        return res.status(400).json({ message: "postId is required" });
    }

    // Kiểm tra xem postId có đúng định dạng ObjectId của MongoDB không
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid postId format" });
    }

    try {
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }
        next();
    } catch (error) {
        next(error);
    }
};

