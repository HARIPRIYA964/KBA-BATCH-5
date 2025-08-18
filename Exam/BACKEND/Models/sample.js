import { Schema } from "mongoose";
import { model } from "mongoose";

const UserSchema= new Schema({
    firstName:String,
    lastName:String,
    userName:{type:String,required:true,unique:true},
    password:String,
    userRole:{type:String,required:true,unique:true},
})

const sample = new model('UserSchema',UserSchema)

const MovieSchema = new Schema({
    movieName:{type:String,required:true,unique:true},
    review:String
})
const movieReview = new model('MovieReview',MovieSchema)

export {sample,movieReview}