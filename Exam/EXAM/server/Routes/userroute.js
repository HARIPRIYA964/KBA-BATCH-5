import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Login } from "../Models/User.js";

dotenv.config();

const userroute=Router();

userroute.post('/signup',async(req,res)=>{
  try{
    const {username,email,password,userType} = req.body
    const existingUser = await Login.findOne({email:email})
    if(existingUser){
        res.status(400).send("Email already exist") ;
    }
    else{
        const newPassword =await bcrypt.hash(password,10);
        const newUser = new Login({
            username:username,
            email:email,
            password:newPassword,
            userType:userType
        })
        await newUser.save();
        res.status(201).send("Signup  successfully created")
    }
  }
  catch{
    res.status(500).send("Internal Server error");
}
})

userroute.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const result = await Login.findOne({email:email})
        if(!result){
            res.status(400).send("Enter a valid Email");
        }
        else{
            const valid =await bcrypt.compare(password,result.password);
            if(valid){
                const token = jwt.sign({email:email,userType:result.userType},process.env.SECRET_KEY);
                res.cookie('authToken',token,
                {
                    httpOnly:true
                });
                res.status(200).json({message:"Logged in successfully"});
            }
            else{

                res.status(401).json({msg:"Unauthorized access"});

            }
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({msg:"Internal Server Error"})
    }

})

export {userroute}