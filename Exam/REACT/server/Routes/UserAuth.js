import { Router } from "express";
import dotenv from 'dotenv'
import { movieReview } from "../Models/sample.js";

dotenv.config()
const userauth = Router()

userauth.post('/addMovieReview', async (req, res) => {
    try {
      const { MovieName, Review } = req.body;
  
      const existingMovie = await movieReview.findOne({ movieName: MovieName });
      if (existingMovie) {
        return res.status(400).json({ message: "Movie already exists!" });
      }
  
      const newMovieReview = new movieReview({
        movieName: MovieName,
        review: Review,
      });
  
      await newMovieReview.save();
      res.status(201).json(newMovieReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
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
       
        if(movies){
            res.status(201).json(movies)
        }
        else{
            res.status(400).json({message:"Movie Not available"})
        }
    }
      catch (err) {
      res.status(500).send('Error fetching movies');
    }
  });

userauth.put('/updateMovieReview',async(req,res)=>{
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

userauth.delete('/deletemovie', async (req, res) => {
    try {
      const movieName = req.query.movieName;
  
      const result = await movieReview.findOneAndDelete({ movieName: movieName });
  
      if (result) {
        res.status(200).json({ message: 'Movie deleted successfully' });
      } else {
        res.status(404).json({ message: 'Movie not available' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

export {userauth}