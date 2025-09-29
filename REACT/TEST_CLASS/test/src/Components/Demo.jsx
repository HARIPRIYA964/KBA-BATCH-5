import React from 'react'

const Demo = () => {
    const name = "Ram";
    const x =100;
    const y =200;
    const names =  ['Ram','Rahul','Lekshmi','Mary']
    const passed = true
  return (
    <>
    <div className='text-2xl'>
      Demo App
    </div>
    <p>Hello {name}</p>
    <p>The {x} and {y} add to {x+y}</p>
    <ul>
        {names.map((name,index)=>(
            <li key ={index}>{name}</li>
        ))}
    </ul>
    {passed ? <h1>You have Passed</h1>:<h1>Not Passed</h1>}
    </>
  )
}

export default Demo
