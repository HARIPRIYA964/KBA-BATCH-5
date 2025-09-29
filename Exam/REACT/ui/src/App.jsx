import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider, Route,} from "react-router-dom";
import Home from './Pages/Home';
import AddMovie from './Pages/AddMovie';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Home />} />
      <Route path='/addmovie' element={<AddMovie />} />
   
      </>
    )
  );
  return <RouterProvider router={router} />;
      }

export default App
