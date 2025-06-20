import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between items-center h-[8vh] bg-cyan-700 w-full mx-auto '>
        <div className="logo text-2xl italic font-bold p-2">
            MyTask
        </div>
        <ul className="gap-10 text-amber-50 cursor-pointer p-2">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
