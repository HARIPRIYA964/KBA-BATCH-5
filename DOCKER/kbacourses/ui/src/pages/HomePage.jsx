import React from 'react'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import AllCoursesButton from '../components/AllCoursesButton'

const HomePage = () => {
  return (
    <>
    <Hero />
    <TopCourses />
    <CourseGrid isHome={true} />
    <AllCoursesButton />
    </>
  )
}

export default HomePage