import React from 'react'

const Buttons = ({ label }) => {
  return (
    <div className='flex-1 flex'>
      <button className=' flex-1 relative  bg-white/5 backdrop-blur-xl shadow-lg text-text px-4 py-2 rounded-md  hover:bg-text_subheading transition duration-300 delay-100  hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] hover:text-background'>
        {label}
      </button>    
    </div>
  )
}

export default Buttons
