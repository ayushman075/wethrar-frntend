import axiosInstance from '@/utils/axiosConfig';
import React, { useState } from 'react'
import { LuLogOut } from "react-icons/lu"; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate();


    const handleSubmit =async()=>{
       
            setLoading(true)
            axiosInstance.post('user/logout').then((response)=>{
                console.log(response)
                if(response.data.statusCode<400){
                    toast.success("Logout successfull !!")
                    setLoading(false)
                    navigate("/")
                }
                else{
                    toast.error(response.data.message)
                    setLoading(false)
                }
            }).catch((error)=>{
                console.log(error)
                toast.error(error.response.data.message||"An error occurred while loging out, Please try again !!")
                setLoading(false)
            })
        
    }
  return (
    <nav className=" text-black rounded-lg  bg-gradient-to-r from-yellow-200 to-green-300  px-8 my-8">
      <div className=" container mx-auto flex  justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold">Wethrar</div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Add Rule Button */}
          <button disabled={loading} onClick={(e)=>{handleSubmit()}}>
          <LuLogOut size={30}/>
          </button>
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
