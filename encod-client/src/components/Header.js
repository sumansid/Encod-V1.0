import React from 'react'
import { TerminalIcon } from '@heroicons/react/solid'


function Header() {
    return (
    <nav className="bg-white">
    <div className="">
      <div className="flex justify-between h-16 px-10 shadow items-center">
        <div className="flex items-center space-x-1 cursor-pointer">
           <TerminalIcon className="flex h-10 w-10"/><a href="#"><h1 className="text-4xl lg:text-4xl font-bold">Encod</h1> </a>
        </div>
        <div className="flex space-x-4 items-center">
          <a href="https://github.com/sumansid/Encod/blob/main/README.md" class="hover:text-gray-600 text-gray-900">How it Works?</a>
          <a href="https://github.com/sumansid/Encod" class="hover:text-gray-600 text-gray-900">Contribute</a>
          
        </div>
      </div>
    </div>
  </nav>
    )
}

export default Header
