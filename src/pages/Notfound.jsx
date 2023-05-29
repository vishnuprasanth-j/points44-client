import React from 'react'
import { Link } from 'react-router-dom'
const Notfound = () => {
  return (
    <div className='w-4/5 mx-auto h-full'>
        <div className='flex flex-col justify-center items-center text-4xl mt-24'>
        <div className='text-4xl'>ERR:404 Page not found</div>
        <div className='text-2xl'><Link to={'/'}>Go to home</Link></div>
        </div>
    </div>
  )
}

export default Notfound