import { Router } from "express";
import { Certificate } from "./adminRoute.js";

 const user = Router()

 user.get('/getCertificate',(req,res)=>{
    try{
        const key = req.query.CertificateID
        const result = Certificate.get(key);
        if(result){
            res.status(200).json({ result });
        }
        else {
            res.status(404).json({ msg: 'Course not found' });
        }
    }
    catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
 })

 export {user}
