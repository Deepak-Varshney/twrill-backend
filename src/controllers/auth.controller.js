import prisma from "../config/database.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js"
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (userExists) {
        return res.status(400).json({ error: "User already exists with this email" });
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })
    const token = generateToken(user.email, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        return res.status(401).json({ error: "User not found" })
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    const token = generateToken(user.email, res);

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: user.email,
            },
            token
        }
    })
}

export const logout = async (req, res) => {
    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({
        status: "success",
        message: "Logged out Successfully"
    })
}