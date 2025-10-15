import React from 'react'
import Navbar from '../Componets/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='mt-10 ml-10'>
        <div className='pb-10 font-bold text-2xl'>
            <h1>Student Details</h1>
        </div>
        <table className="border border-black w-[700px] text-center">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Address</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}

export default Home
