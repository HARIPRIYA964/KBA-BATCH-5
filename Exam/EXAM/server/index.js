import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import { userroute } from './Routes/userroute.js';
import { adminroute } from './Routes/adminrute.js';

const app = express()

dotenv.config();

app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(json())
app.use('/',userroute)
app.use('/',adminroute)

mongoose.connect("mongodb://localhost:27017/STUDENTS_DETAILS").then(()=>{
    console.log('MogoDB Successfully connected')
})
.catch((error)=>{
    console.log("Connection error.",error);
});

app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
});