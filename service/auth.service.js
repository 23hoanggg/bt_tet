import { UserModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import _ from "lodash";

export const register = async (req, res, next) => {
    const { username, password, email, fullname } = req.body;

    const salt = await bcrypt.genSalt(10);
    const handlePassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
        username,
        password: handlePassword,
        email,
        fullname,
        role: ['user']
    })
    res.send(user);
}

export const login = async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });

    if (!user) {
        return res.status(401).json({ error: "Username or email not found" });
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Password incorrect" });
        }

        const payload = {
            user: user.username,
            email: user.email,
            roles: user.roles
        };
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1d' });
        return res.send({ accessToken, refreshToken });
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
export const refresh = (req, res, next) =>{
    const {refreshToken} = req.body;
    const payload = jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN);
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m' });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1d' });
    return res.send({ accessToken, refreshToken: newRefreshToken });
}

