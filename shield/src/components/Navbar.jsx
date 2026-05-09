import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200'>
      <div className="mycontainer text-black flex justify-between items-center px-4 py-5 h-14 ">
        <div className="logo font-bold">
          <span className='text-purple-800'> &lt;</span>
          <span className='text-purple-600'>Shield</span><span className='text-purple-800'>Sync&gt;</span>
        </div>
<ul>
    <li className='flex gap-4'>
          <a className='hover:font-bold text-purple-800' href='/'>Home</a>
        <a className='hover:font-bold text-purple-800'href='/'>About</a>
    <a className='hover:font-bold text-purple-800'href='/'>Contact</a>
    </li>
</ul>
</div>
    </nav>

    
      
    
  )
}

export default Navbar
