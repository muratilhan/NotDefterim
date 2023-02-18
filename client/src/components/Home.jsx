import React, { useContext, useEffect } from 'react'
import "../styles/home.css"
import Sidebar from './Sidebar'
import LectureNotes from './LectureNotes'
function Home() {

  return (
    <div className='home-container'>
        <Sidebar></Sidebar>
        <LectureNotes></LectureNotes>

    </div>
  )
}

export default Home