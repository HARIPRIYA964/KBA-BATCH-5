import React, { useState } from 'react'
import Navbar from '../Componets/Navbar'

const AddStudent = () => {
    const [name,setName] =useState('')
    const [age,setAge] = useState('')
    const [course,setCourse] = useState('')
    const [address,setAddress] = useState('')

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/addstudent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, course, address }),
          });
      
          const data = await response.json();y
          if (!response.ok) {
            throw new Error(data.msg || 'Student  failed'); 
          }
      
          alert('Student added successfully!');
         
          setName('');
          setAge('');
          setCourse('');
          setAddress('');
          
        } catch (err) {
          console.error("Student error:", err.message);
          alert("Student failed. Please try again.");
        }
      };
      
  return (
    <>
    <Navbar />
    <div className='bg-gray-400 w-[400px] h-[500px] mt-30 ml-[700px] rounded-2xl '>
        <div className='text-2xl font-bold text-center pt-6 text-gray-800'>
            <h1>Add Student</h1>
        </div>
       <form action="" onSubmit={handleSubmit}>
       <div className='ml-[70px]'>
            <h1>Name</h1>
            <input type="text"  className='border mb-5  mt-4 '
             value={name}
             onChange={(e) => setName(e.target.value)}/>
            <h1>Age</h1>
            <input type="number" className='border mb-5  mt-4 '
             value={age}
             onChange={(e) => setAge(e.target.value)} />
            <h1>Course</h1>
            <input type="text" className='border mb-5  mt-4 '
             value={course}
             onChange={(e) => setCourse(e.target.value)} />
            <h1>Address</h1>
            <textarea name="" id="" className='border mb-5  mt-4 w-[253px]'
             value={address}
             onChange={(e) => setAddress(e.target.value)}></textarea>
        </div>
        <div className='bg-black text-white w-25 pt-1 h-8 text-center ml-[150px]'>
            <button type='submit'>Add</button>
        </div>
       </form>
    </div>
    </>
  )
}

export default AddStudent
