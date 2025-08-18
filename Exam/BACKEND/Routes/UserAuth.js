import { Router } from "express";
import dotenv from 'dotenv'
import { authenticate } from "../MiddleWare/auth.js";
import { movieReview } from "../Models/sample.js";

dotenv.config()
const userauth = Router()

userauth.post('/addMovieReview',authenticate,async(req,res)=>{
    try{
        if(req.Userrole == 'User'){
        const {MovieName,Review} =req.body
        const existingMovie = await movieReview.findOne({movieName:MovieName})
        if(existingMovie){
            res.status(400).json({message:"Not found!"})
        }
        else{
            const newMovieReview = new movieReview({
                movieName:MovieName,
                review:Review
            })
            await newMovieReview.save()
            res.status(201).json(newMovieReview)
        }

    }
    else{
        res.status(401).json({message:"You are not allowed to add movie review"})
       }

    }
    catch(error){
        res.status(500).json({message: "Internal server error"})
        console.log(error)
       }
})

userauth.get('/showMovieReviews',async(req,res)=>{
    const list = req.query.MovieName
    const result = await movieReview.findOne({MovieName:list})
    if(result){
        res.status(201).json(result)
    }
    else{
        res.status(400).json({message:'Movie  not available'})
      }

})

userauth.get('/showMovieReviews',async(req,res)=>{
    const list = req.query.MovieName
    const result = await movieReview.findOne({MovieName:list})
    if(result){
        res.status(201).json(result)
    }
    else{
        res.status(400).json({message:'Movie  not available'})
      }

})

userauth.get('/listMovies', async (req, res) => {
    try {
        const movies = await movieReview.find();
        const result = movies.map(m =>m.movieName)
        if(result){
            res.status(201).json(result)
        }
        else{
            res.status(400).json({message:"Movie Not available"})
        }
    }
      catch (err) {
      res.status(500).send('Error fetching movies');
    }
  });

userauth.put('/updateMovieReview',authenticate,async(req,res)=>{
   try{
    if(req.Userrole=='User'){
        const{MovieName,Review}=req.body
        const result = await movieReview.findOne({movieName:MovieName})
        if (!result) {
            return res.status(404).json({ message: "Movie does not exist" });
          }
    
          result.review = Review;
          await result.save();
    
          res.status(200).json(result);
        } else {
          res.status(403).json({ message: 'Unauthorized role' });
        }
   }
   catch(error){
    console.log(error)
   }
})

userauth.delete('/deletemovie',async(req,res)=>{
    try{
     const movie = req.query.movieName
     const result = await movieReview.findOne({MovieName:movie})
     if(result){
       await movieReview.findOneAndDelete(result)
       res.status(200).json({message:'movie deleted successfully'})
     }
     else{
       res.status(400).json({message:'movie not available'})
       }
     }
     catch(err){
      console.log(err)
       }
   })


export {userauth}