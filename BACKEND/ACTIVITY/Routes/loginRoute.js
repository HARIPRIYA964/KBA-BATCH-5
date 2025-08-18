import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

const user = new Map()

router.post('/signup',async(req,res)=>{
    try{
        const {FullName,UserName,Password,UserRole} = req.body
        const newPassword = await bcrypt.hash(Password,10)
        const result = user.get(UserName)
        if(result){
            res.status(400).json({msg:"UserName already exist"})
        }
        else{
            user.set(UserName,{FullName,newPassword,UserRole})
            res.status(201).json({msg:"Successfully created"})
            console.log(UserName)
        }
    }
    catch(err){
        res.status(500).json({ error: error.message})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {UserName,Password} = req.body
        const result = user.get(UserName)
        if(!result){
            res.status(404).json({ msg: "Username not registered" })
        }
        const Valid = await bcrypt.compare(Password,result.newPassword)
        if(Valid){
            const token = jwt.sign({ UserName: UserName, UserRole: result.UserRole }, process.env.SECRET_KEY, { expiresIn: '1h' })
            if(token){
                res.cookie('authToken',token,
                    {httpOnly: true}
                )
                res.status(200).json({ msg: "Successfully loggedin" })
            }
            else{
                res.status(400).json({ msg: "Something went wrong in token generation" })
            }
        }
    }
    catch(error) {
        res.status(500).json({ error: error.message})
    }
})

export {router}