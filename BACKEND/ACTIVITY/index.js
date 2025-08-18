import express,{json} from 'express';
import dotenv from 'dotenv';
import { router } from './Routes/loginRoute.js';
import { authenticate } from './MiddleWare/auth.js';
import admincheck from './MiddleWare/adminauth.js';
import { adminroute } from './Routes/adminRoute.js';
import { user } from './Routes/userRoute.js';

dotenv.config();

const app = express()
app.use(json())
app.use('/',router)
app.use('/',user)
app.use('/',authenticate,admincheck,adminroute)

app.listen(process.env.PORT,()=>{
    console.log(`Sever is listening to port ${process.env.PORT}`);    
})