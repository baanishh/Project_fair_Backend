const  users=require('../models/userModel')
const jwt=require('jsonwebtoken')

//register
exports.registerController=async(req,res)=>{
    console.log("inside register");
    const {username,email,password}=req.body
 
  try {
    const existing=await users.findOne({email})
    if (existing) {
      return  res.status(406).json("user already registered")
    } else {
        const newUsers=new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profilePic:"",
        })

        await newUsers.save()
        return res.status(200).json(newUsers)
    }
  } catch (error) {
    return res.status(401).json(error)
  }
}


//login
exports.loginController=async(req,res)=>{
  console.log("inside register");
  const {email,password}=req.body

try {
  const existing=await users.findOne({email,password})
  if (existing) {
    //token generation
    const token=jwt.sign({userId:existing._id},process.env.JWTPASSWORD)
    return  res.status(200).json({user:existing, token})
  } else {
     res.status(404).json("invalid email and password")
    }
} catch (error) {
  return res.status(401).json(error)
}
}


//update user profile
exports.editUserProfileController=async(req,res)=>{
  console.log("inside editUserProfileController");
  const userId=req.userId
  const {username, email, password, github, linkedin, profilePic}=req.body
  const uploadProfileImgFile=req.file?req.file.filename:profilePic
  try {
    const updatedUser=await users.findByIdAndUpdate({_id:userId},{username, email, password, github, linkedin, profilePic:uploadProfileImgFile},{new:true})
    await updatedUser.save()
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(401).json(error)
  }
}