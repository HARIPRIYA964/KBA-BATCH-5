import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { userauth } from './Routes/UserAuth.js';
import cors from 'cors'

const app = express()

dotenv.config();


app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(json())
app.use('/',userauth);



mongoose.connect("mongodb://localhost:27017/ADD_MOVIES_REVIEW").then(()=>{
    console.log('MogoDB Successfully connected')
})

.catch((error)=>{
    console.log("Connection error.",error);
});

app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
});