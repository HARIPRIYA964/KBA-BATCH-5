import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
         await login(username, password);   // pass username instead of email
      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
   
    } 

    catch(err){
      setError(err.message || 'Invalid credentials: Please try again!');
    }
  }


  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded shadow">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    {error && <p className='text-red-500 mb-4'> {error}</p>}
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-gray-700">User Name</label>
        <input
          type="text"
          name="UserName"
          className="w-full p-2 border rounded mt-1"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="Password"
          className="w-full p-2 border rounded mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
    <p>Don't have an account?
    <Link to="/signup" className='text-blue-500'>Sign Up</Link>
    </p>
  </div>
</div>
  )
}

export default Login