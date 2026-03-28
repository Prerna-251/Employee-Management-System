import React from 'react'

const Navbar = () => {
  return (
     <div className="bg-white/50 backdrop-blur-sm h-16 px-16 flex items-center justify-between shadow-md">
        <h1 className="text-3xl font-bold text-green-500"> 👨‍💻 EM Service </h1>
        <div className='space-x-4 ml-auto'>
          <a href="/" class="relative text-gray-800 hover:text-blue-500 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Home</a>
          <a href="/" class="relative text-gray-800 hover:text-blue-500 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Profile</a>
          <a href="/" class="relative text-gray-800 hover:text-blue-500 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Logout</a>
        </div>
      </div>
  )
}

export default Navbar
