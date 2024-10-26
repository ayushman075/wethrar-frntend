import React from 'react'
import { LuLogOut } from "react-icons/lu"; 

const Navbar = () => {
  return (
    <nav className=" text-black rounded-lg  bg-gradient-to-r from-yellow-200 to-green-300  px-8 my-8">
      <div className=" container mx-auto flex  justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold">Wethrar</div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Add Rule Button */}
          
          <LuLogOut size={30}/>

          {/* Update Button */}
         

          {/* Dark Mode Switch */}
          {/* <div className="flex items-center">
            <span className="mr-2">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
