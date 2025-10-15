import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='text-right pr-10 pt-6 text-xl bg-black text-white h-20'>
      <Link to='/home' className='pr-10'>Home</Link>
      <Link to='/addStudent'>Add</Link>
    </div>
  )
}

export default Navbar
