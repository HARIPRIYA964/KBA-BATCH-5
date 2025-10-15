import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Invalid');
      }
      if (data.userType === 'Admin') {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }

    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'Invalid credentials: Please try again!');
      alert('Login failed. Please try again.');
    }
  };

  return (
    <>
      <div className=''>
        <div className='bg-gray-500 w-[500px] h-[500px] ml-[680px] mt-[200px] rounded-2xl'>
          <div className='text-center text-4xl pt-20 text-orange-950'>
            <h1>Login</h1>
          </div>
          <form action="" onSubmit={handleLogin}>
            <div className='ml-30'>
              <h1>Email</h1>
              <input
                type="email"
                name="email"
                id="email"
                className='border w-[270px] mb-5 mt-4 h-10'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h1>Password</h1>
              <input
                type="password"
                className='border mb-5 w-[270px] mt-4 h-10'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className='pl-34'>
              Don't have an account? <Link to='/signup' className='text-red-800'>Sign Up</Link>
            </p>
            <div className='border w-[130px] h-9 text-center pt-1 ml-48 text-white bg-black mt-10'>
              <button type='submit'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
