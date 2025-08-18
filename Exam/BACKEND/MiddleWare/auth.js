import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const authenticate =(req,res,next)=>{
    const cookie = req.headers.cookie;
    console.log(cookie);
    const [name,token] = cookie.trim().split('=');
    console.log(name)
    console.log(token)
   try{
    if(name=='AuthToken'){
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        console.log(decode)
        req.Username = decode.userName;
        req.Userrole = decode.userRole;
        console.log(req.Username);
        console.log(req.Userrole);
        
        next();    
     }
   }
   catch(error){
    console.log(error)
   }
    
    
}
export  {authenticate}
