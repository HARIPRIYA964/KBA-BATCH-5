import { Router } from "express";
import dotenv from 'dotenv'
import { Student } from "../Models/User.js";
dotenv.config()
const adminroute = Router()

adminroute.post('/addstudent', async (req, res) => {
    try {
      const { name, age,course,address } = req.body;
  
      const existingStudent = await Student.findOne({ age: age });
      if (existingStudent) {
        return res.status(400).json({ message: "Student already exists!" });
      }
  
      const newStudent = new Student({
        name: name,
        age: age,
        course: course,
        address:address
      });
  
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

adminroute.get('/getStudent',async(req,res)=>{
    const list = req.query.age
    const result = await Student.findOne({age:list})
    if(result){
        res.status(201).json(result)
    }
    else{
        res.status(400).json({message:'Student  not available'})
      }

})

adminroute.get('/getAllStudent',async(req,res)=>{
    const result = await Student.find({})
    if(result){
        res.status(201).json(result)
    }
    else{
        res.status(400).json({message:'Student  not available'})
      }

})


  export {adminroute}