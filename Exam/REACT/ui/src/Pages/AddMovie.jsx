import React, { useState } from 'react'
import Navbar from '../Components/Navbar'

const AddMovie = () => {
    const [MovieName,setMovieName] = useState("")
    const [Review,setReview] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/addMovieReview', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                MovieName,
                Review }),
            });
        
            if (!res.ok) {
              throw new Error("Error adding movie review");
            }
        
            alert("Movie review added successfully");
            setMovieName("");
            setReview("");
          } catch (err) {
            console.log(err);
            alert('Something went wrong: ',err);
          }
    }

  return (
    <>
      <Navbar />
      <h1 className='text-center text-4xl pt-[100px] text-red-900 font-bold'>Add Movies</h1>
      <div className='bg-red-900 w-[500px] h-[500px]  ml-[695px] mt-10 text-white'>
        <form action="" onSubmit={handleSubmit}>
        <h1 className='pl-22 pt-16'>Movie Name</h1>
        <input type="text" name="MovieName" id="MovieName" className='border ml-22 mt-6 w-[320px] h-10'
        value={MovieName}
        onChange={(e) => setMovieName(e.target.value)}/>
        <h1 className='pl-22 pt-6'>Movie Name</h1>
        <textarea name="Review" id="Review" className='border ml-22 mt-6 w-[320px] h-40'
                value={Review}
                onChange={(e) => setReview(e.target.value)}></textarea>
        <div className='border w-[150px] h-10 text-center pt-2 ml-[160px] mt-6'>
            <button type='submit'>Add Movie</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default AddMovie
