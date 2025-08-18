import { Router } from "express";
// import { authenticate } from "../MiddleWare/auth.js";
// import adminCheck from "../MiddleWare/adminAuth.js";

const admin = Router();

const course = new Map();

admin.post('/addCourse', (req,res)=>{
    try {
        const { CourseName,CourseId,CourseType,Description,Price } = req.body
        if(course.get(CourseName)){
            res.status(400).json({msg:'Course already exist'})
        } else{
            try {
                course.set(CourseName,{ CourseId,CourseType,Description,Price })
                res.status(201).json({msg:'course successfully added'})
                console.log(course)
            } catch (error) {
                res.status(400).json({msg:error.message})
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
});

// admin.put

admin.put('/updateCourse', (req,res)=>{
    try {
        const { CourseName,CourseId,CourseType,Description,Price } = req.body;
        if (course.get(CourseName)) {
            course.set(CourseName,{ CourseId,CourseType,Description,Price })
            res.status(201).json({msg:'course successfully updated'})
        } else {
            res.status(404).json({msg:'course not found' })
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

admin.patch('/updateCourse', (req,res)=>{
    try {
        const { CourseName,Price } = req.body;
        const result = course.get(CourseName)
        if (result) {
            course.set(CourseName,{ CourseId:result.CourseId,CourseType:result.CourseType,Description:result.Description,Price })
            res.status(201).json({msg:'course successfully updated'})
        } else {
            res.status(404).json({msg:'course not found' })
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

admin.delete('/deleteCourse', (req,res)=>{
    try {
        const { CourseName } = req.body;

        if (course.get(CourseName)) {
            course.delete(CourseName);
            res.status(200).json({msg:'Course deleted Successfully'});
    } else {
        res.status(404).json({msg:'course not found' });
    }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
});

export {admin ,course}