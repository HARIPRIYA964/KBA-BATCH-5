import React from 'react'
import Logos from '../Components/Logos'
import IncrementButton from '../Components/IncrementButton'

const HomePage = () => {
  return (
    <>
    <Logos />
    <IncrementButton startNumber={1} incrementNumber={100} />
    <IncrementButton startNumber={10} incrementNumber={1} />

    </>
  )
}

export default HomePage
