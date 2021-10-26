import React from 'react'
import { TerminalIcon } from '@heroicons/react/solid'


function Header() {
    return (
    <nav className="bg-white">
    <div className="">
      <div className="flex justify-between h-16 px-10 shadow items-center">
        <div className="flex items-center space-x-1 cursor-pointer">
           <TerminalIcon className="flex h-10 w-10"/><h1 className="text-4xl lg:text-4xl font-bold">Encod</h1> 
        </div>
        <div class="flex space-x-4 items-center">
          <a href="#" class="hover:text-gray-600 text-gray-900">How it Works?</a>
          <a href="#" class="hover:text-gray-600 text-gray-900">Contribute</a>
          
        </div>
      </div>
    </div>
  </nav>
    )
}

export default Header