import { Schema,model } from "mongoose";

const LoginSchema = new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userType:{type:String,required:true}

})

const Login = model("User",LoginSchema)


const studentSchem = new Schema({
    name:{type:String,required:true},
    age:{type:String,required:true,unique:true},
    course:{type:String,required:true},
    address:{type:String,required:true},
})

const Student = model("Student_Details",studentSchem)


export {Login,Student}