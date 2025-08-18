import { Router } from "express";

const adminroute = Router()

const Certificate = new Map()

adminroute.post('/addCertificateDetails',(req,res)=>{
   try{
    const {Course,CertificateID,Name,Grade,IssueDate} = req.body
    if(Certificate.get(CertificateID)){
        res.status(400).json({msg:"Course already exist"})
    }
    else{
        Certificate.set(CertificateID,{Course,Name,Grade,IssueDate})
        res.status(201).json({msg:"Successfully added",})
        console.log(Certificate)
        
    }
   }
   catch(error){
    res.status(500).json({ error: error.message });
   }
})

export {adminroute,Certificate}