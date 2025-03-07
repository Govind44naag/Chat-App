//business logic
import jwt from 'jsonwebtoken'
import { User } from "../model/userModel.js"
import bcrypt from 'bcrypt'
export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false,
            })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({
                message: "username is already exist please try different",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === 'male' ? maleProfilePhoto : femaleProfilePhoto,
            gender,
        })
        return res.status(200).json({
            message:"User register successfully!",
            success:true,
        })
    }
    catch (e) {
        console.error(e)
    }
}

//login
export const login=async(req,res)=>{
    try{
        const {username,password}=req.body
        if(!username || !password){
            return res.status(400).json({
                message:"Something is missing",
                success:false,
            })
        }
        const user = await User.findOne({ username })
        if(!user){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false,
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false,
            })
        }
       const tokenData={
        userId:user._id,
       } 
       const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
       
       return res.status(200).cookie('token',token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
        _id:user._id,
        username:user.username,
        fullName:user.fullName,
        profilePhoto:user.profilePhoto,
       })

    }
    catch(e){
        console.error(e)
    }

}
//logout
export const logout=( req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully!",
            
        })
    }
    catch(e){
        console.error(e)
    }
}

export const getOtherUsers=async(req,res)=>{
   try{
    const loggedInUserId=req.id
    const otherUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
    return res.status(200).json({
        otherUsers,
    })

}
   catch(e){
    console.error(e)
   }
}