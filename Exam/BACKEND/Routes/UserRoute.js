import { Router } from "express";
import bcrypt from 'bcrypt'
import { sample } from "../Models/sample.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();
const userroute = Router()

userroute.post('/signup',async(req,res)=>{  
    try{
    const {FirstName,LastName,UserName,Password,UserRole}=req.body
    const existingUser = await sample.findOne({userName:UserName})
    if(existingUser){
        res.status(404).json({message:"User already exist"})
    }
    else{
        const newPassword = await bcrypt.hash(Password, 10)
        const newUser = new sample({
            firstName:FirstName,
            lastName:LastName,
            userName:UserName,
            password:newPassword,
            userRole:UserRole
          })
          await newUser.save()
          res.status(201).json(newUser)
    }

}
catch(error){
    console.log(error)
    res.status(500).json({message:"Internal Server Error"});
}
})


userroute.post('/login', async (req,res) =>{
 
    try{
     const{UserName,Password} = req.body
     const result = await sample.findOne({userName:UserName})
     if(!result){
         res.status(400).json({message : "User Not Found"})
     }
     else{
         const valid = await bcrypt.compare(Password,result.password)  
 
         if(valid){
             const token = jwt.sign({userName:UserName,userRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'1h'})
             console.log(token);
             res.cookie('AuthToken',token,{
               httpOnly: true   
             })

             res.status(201).json({message : "Login Successfully"})
             }
             else{
               res.status(401).json({message:"Unauthorized password"})
               
                 
                 }
     }
    }
    catch{
     res.status(500).json({message: "Internal server error"})
    }
 })
export {userroute}
