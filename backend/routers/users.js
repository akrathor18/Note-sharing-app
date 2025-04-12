import express from "express";
const router = express.Router();
import User from '../model/UserSchema.js';
import jwt from 'jsonwebtoken'
import VerifyJwtMiddleware from "../Middleware/verifyJWT.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import mongoose from "mongoose";
function generateSessionId(user, res) {
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "none", 
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
}

router.post("/register", async (req, res) => {
    try {
        const userData = req.body
        console.log(userData)
        const userExist = await User.findOne({ email: userData.email })
        if (userExist) {
            return res.status(400).json('Email already registered')
        }
        const newUser = new User(userData)
        const resp = await newUser.save()
        const token = generateSessionId(newUser, res);
        res.status(201).json({ message: "User registered successfully!", token });
        
    } catch (error) {
        console.log(error)
        res.status(500).json(`Internal server error`)
    }
    
});
 router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const userLogin = await User.findOne({ email });
    
    if (!userLogin) return res.status(404).json('User not found');
    const isMatch = await userLogin.comparePassword(password);
    if (!isMatch) return res.status(400).json('Invalid credentials');
    const token = generateSessionId(userLogin, res);
    res.status(201).json({ message: "User registered successfully!", token });
  
  } catch (error) {
    console.log(error)
    res.status(500).json('Internal server error')
  }
});


export default router;