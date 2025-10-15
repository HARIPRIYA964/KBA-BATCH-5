import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider, Route,} from "react-router-dom";
import Login from '../src/Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import AddStudent from './Pages/AddStudent';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
<>
<Route path='/' element ={<Login />} />
<Route path='/signup' element ={<Signup />} />
<Route path='/home' element ={<Home />} />
<Route path='/addStudent' element ={<AddStudent />} />


</>
    ))
  
    return <RouterProvider router={router} />;
}

export default App
