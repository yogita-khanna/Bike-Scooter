import React from 'react'
import LeftSidebar from './LeftSidebar'
import FrontPage from './FrontPage'

const Home = () => {
  return (
    <div>
        <div className='flex'>
            <LeftSidebar/>
            <FrontPage/>
        </div>
    </div>
  )
}

export default Home