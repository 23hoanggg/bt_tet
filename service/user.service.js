import { UserModel } from "../model/user.model.js";

export const getMe = async(req,res,next) =>{
    await UserModel.findById(req.user.id);
    res.status(200).send(user)
}
export const getAllUsers = async(req,res,next) =>{
    const users = await UserModel.find({});
    res.status(200).send(users);
}

export const changeInforUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userId = req.user.id;
        const { fullname, email, username, password } = req.body;

        if (!fullname && !email && !username && !password) {
            return res.status(400).json({ message: "No information provided for update" });
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: {
                ...(fullname && { fullname }),
                ...(email && { email }),
                ...(username && { username: username.toLowerCase() }), 
                ...(password && { password: UserModel.generateHash(password) }) 
            }},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User information updated successfully", user: updatedUser });
    } catch (error) {
        next(error); 
    }
};

