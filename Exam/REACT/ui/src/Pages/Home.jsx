import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Image from "../assets/Image/image.jpeg"
import { Link } from 'react-router-dom'

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/listMovies");
        if (!res.ok) {
            throw new Error("Failed to fetch movies");
        }
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (movieName) => {

    try {
        const res = await fetch(`/api/deletemovie?movieName=${movieName}`, {
          method: 'DELETE',
        });
        const data = await res.json();
  
        if (res.ok) {
          alert(data.message);
          setMovies(movies.filter(m => m.movieName !== movieName));
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to delete movie');
      }
  }

  return (
    <>
      <Navbar />
      <h1 className='text-center text-4xl pt-[100px] text-red-900 font-bold'>
        Online Movie Tickets
      </h1>
      <div className="grid grid-cols-5 gap-6 ml-10 mt-10">
  {movies.map((movie, index) => (
    <div
      key={index}
      className="w-[300px] h-[400px] bg-red-900 text-center text-white rounded-xl shadow-md"
    >
      <img src={Image} alt="" className="size-[160px] mx-auto mt-9" />
      <h1 className="mt-6 text-xl font-bold">{movie.movieName}</h1>
      <p className="mt-4">{movie.review}</p>
      <div className=''>
        <Link to='/update'><button className='border w-20 mr-10 mt-5'>Update</button>
        </Link>
        <button className='border w-20 mt-5'
        onClick={() => handleDelete(movie.movieName)}>Delete</button>
      </div>
    </div>

  ))}
</div>

    </>
  )
}

export default Home
