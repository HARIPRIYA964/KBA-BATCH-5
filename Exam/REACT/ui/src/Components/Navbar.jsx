import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-black w-full h-20 text-white text-right pr-[100px] pt-6 text-xl  '>
      <Link to='/' className='hover:text-red-400' >Home</Link>
      <Link to='/addmovie' className='pl-8 hover:text-red-700'>Add Movie</Link>
    </div>
  )
}

export default Navbar
