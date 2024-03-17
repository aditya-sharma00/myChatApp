const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    console.log(req.body);
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please Enter all the Field")
    }
    const userExits = await User.findOne({email})
    if (userExits) {
        res.status(400)
        throw new Error("User Already exists")

    }
    const user = await User.create({
        name,
        email,
        password,
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Failed to create User")

    }
})

const authUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})
    let token = generateToken(user._id)
    if(user && (await user.matchPassword(password))){

        res.cookie('userInfo',token).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: token
        })
    }else{
        res.status(401)
        throw new Error("Invalid Email or Passowrd")
    }
})


// userInfo --> token

const checkProfile = async(userInfo)=>{
    const payload = jwt.verify(userInfo,process.env.JWT_SECRET).id
    
    const userData = await User.findById(payload)
    console.log(userData)
    if(userData){
        return true
    }
    return false

}



const getProfile = async(req,res)=>{
    const {userInfo} = req.cookies
    if (userInfo) {
        try {
            const user = jwt.verify(userInfo, process.env.JWT_SECRET);
            const profileExists = await checkProfile(userInfo);

            if (profileExists) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "User profile not found." });
            }
        } catch (error) {
            // Handle JWT verification error
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        // Send an empty object as a response instead of null
        res.status(404).json({ error: "User not authenticated." });
    }
}

const logout = (req,res) =>{
    res.clearCookie('userInfo').send('Cookie Cleared')
}


// /api/user

const allUser = asyncHandler(async(req,res)=>{
    // middleware laga diye issliye nhi laga zarurat
    // const uid = req.cookies
    // const token = uid.userInfo
    // const u_id = jwt.verify(token,process.env.JWT_SECRET).id
    // console.log(u_id);
    const keyword = req.query.search ? {
        $or:[
            {name:{$regex: req.query.search, $options: "i"}},
            {email:{$regex: req.query.search, $options: "i"}},
        ]
    }:{}

    // const users = await User.find(keyword).find({_id:{$ne:u_id}})
    const users = await User.find(keyword).find({_id:{$ne:req.user._id}})
    res.send(users)
    // console.log(keyword)
})


module.exports = {registerUser,authUser,getProfile,logout,allUser}