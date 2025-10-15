import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          userType: userType,
        }),
      });
  
      if (!response.ok) {
        throw new Error(errData.msg || 'Signup Failed');
      }
  
      navigate('/');
    } catch (err) {
      console.error("Signup error:", err.message);
      alert("Signup failed. Please try again.");
    }
  };
  

  return (
    <>
      <div>
        <div className='bg-gray-500 w-[500px] h-[580px] ml-[680px] mt-[200px] rounded-2xl'>
          <div className='text-center text-4xl pt-6 text-orange-950'>
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={handleSignup}>
            <div className='ml-30 mt-4'>
              <h1>User Name</h1>
              <input
                type="text"
                name="username"
                id="username"
                className='border mb-5 mt-4 h-10'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <h1>Email</h1>
              <input
                type="email"
                className='border mb-5 mt-4 h-10'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h1>Password</h1>
              <input
                type="password"
                className='border mb-5 mt-4 h-10'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <h1>User Type</h1>
              <select
                className='border mb-5 mt-4 w-[253px] h-10'
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <p className='pl-34'>Don't have an account? <Link to='/' className='text-red-800'>Login</Link></p>
            <div className='border w-[130px] h-9 text-center pt-1 ml-43 text-white bg-black mt-3'>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
