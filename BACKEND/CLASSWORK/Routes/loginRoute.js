import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router =Router()
const user = new Map()

// router.get('/hi',(req,res)=>{
//     console.log("HI World")
//     res.send("Hi world")
// })


router.post('/signup',async(req,res)=>{
    // const details = req.body
    // console.log(details)
    // console.log(details.FistName)
try{

    const {FistName,LastName,UserName,Password,UserRole}= req.body
    console.log(FistName) 
    const newPassword = await bcrypt.hash(Password,10)
    console.log(newPassword)
    const result =  user.get(UserName)
    if(result){
        res.status(400).json({msg:'UserName already exist'})
    }
    else{
    user.set(UserName,{FistName,LastName,newPassword,UserRole})
    res.status(201).send({msg:"Successfully created"})
    console.log(UserName)
    }
}
catch(err){
    res.status(500).send(err.message)
    }
})

router.post('/login', async(req, res) => {
    try {
        const { UserName, Password } = req.body;
        console.log(UserName);
        console.log(Password);
        const result = user.get(UserName);
        console.log(result);
        if (!result) {
            res.status(404).json({ msg: "Username not registered" })
        }
        const valid = await bcrypt.compare(Password, result.newPassword)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({ UserName: UserName, UserRole: result.UserRole }, process.env.SECRET_KEY, { expiresIn: '1h' })
            console.log(token);
            if (token) {
                res.cookie('authtoken', token,
                    { httpOnly: true }
                )
                res.status(200).json({ msg: "Successfully loggedin" })
            } else {
                res.status(400).json({ msg: "Something went wrong in token generation" })
            }
        }

    } catch(error) {
        res.status(500).json({ error: error.message})
    }
})
export {router};