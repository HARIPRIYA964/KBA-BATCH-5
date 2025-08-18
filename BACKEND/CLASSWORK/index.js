import express,{json} from 'express';
import dotenv from 'dotenv';
import {router} from './Routes/loginRoute.js';
import { admin } from './Routes/adminRoute.js';
import { authenticate } from './Middleware/auth.js';
import admincheck from './Middleware/adminauth.js';
import user from './Routes/userRoute.js';

dotenv.config();

const app = express();

app.use(json())
app.use('/',router)
app.use('/',user)
app.use('/', authenticate, admincheck,admin);

// app.get('/',(req,res)=>{
//     console.log("Hello World");
//     res.send('Hello world')
    
// })

// app.get('/hii',(req,res)=>{
//     console.log("Hii World");
//     res.send('Hii world')
    
// })
 // app.listen(8000,()=>{
//     console.log('Sever is listening to Port 8000');    
// })

mongoose.connect("mongodb://localhost:27017/KBA-COURSE").then(()=>{
    console.log('MogoDB Successfully connected')
})

.catch((error)=>{
    console.log("Connection error.",error);
});

app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
});