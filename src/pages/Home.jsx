import axiosInstance from '@/utils/axiosConfig';
import { IoIosSunny } from "react-icons/io";
import { MdOutlineWbCloudy } from "react-icons/md";
import { FaCloudMoonRain } from "react-icons/fa";
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import sunnyImage from '../assets/sunnyImg.jpg'; 
import cloudyImage from '../assets/cloudyImg.jpg'; 
import rainImage from '../assets/rainyImg.jpg';
import { IoThunderstormOutline } from "react-icons/io5";


import Navbar from './Navbar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [loading,setLoading]=useState(false);
    const [weatherData,setWeatherData] = useState([]);
    const [city,setCity] = useState("");
    const [param,setParam] = useState("");
    const [value,setVlaue] = useState();
    const [location,setLocation] = useState("");
    const navigate = useNavigate();
    const getWeatherBackground = (condition) => {
      switch (condition.toLowerCase()) {
          case 'haze':
          case 'cloudy':
              return `url(${cloudyImage})`;
          case 'rain':
              return `url(${rainImage})`;
          case 'sunny':
          case 'clear':
              return `url(${sunnyImage})`;
          default:
              return `url(${cloudyImage})`;
      }
  };


  const addLocation = async() => {
    if(!location){
      toast.error("Location name cannot be empty !!")
    }
    else{
      axiosInstance.post('user/location-add',{location}).then((response)=>{
        if(response.data.statusCode<400){
          toast.success("Location added successfully !!")
          setLoading(false)
          window.location.reload();
      }
      else{
          setLoading(false)
          toast.error(response.data.message)
      }
      }).catch((error)=>{
        toast.error(error.response.data.message || "Error adding location !!")
      })
    }
  }

  const getWeatherIcon = (condition) => {
      switch (condition.toLowerCase()) {
          case 'haze':
          case 'cloudy':
              return <MdOutlineWbCloudy style={{ fontSize: '24px', color: '#FF6500' }} />;
          case 'rain':
              return <FaCloudMoonRain style={{ fontSize: '24px', color: '#007BFF' }} />;
          case 'thunderstorm':
              return <IoThunderstormOutline style={{ fontSize: '24px', color: '#FFD700' }} />;
          default:
              return <MdOutlineWbCloudy style={{ fontSize: '24px', color: '#FF6500' }} />;
      }
  };

  const handleThresholdSubmit = async() => {
      if(!city || !param || !value){
        toast.error("Some fields are empty !!")
      }
      else{
        axiosInstance.post('threshold/set',{"city": city,
        "parameter": param,
        "thresholdValue": value}).then((response)=>{
      if(response.data.statusCode<400){
        toast.success("Trigger added successfully !!")
        setLoading(false)
    }
    else{
        setLoading(false)
        toast.error(response.data.message)
    }
    }).catch((error)=>{
      console.log(error)
      toast.error(error.response.data.message || "An error occurred while loging In, Please try again !!")
      setLoading(false)
    })
      }
  }

    useEffect(()=>{
        setLoading(true)
        axiosInstance.get('weather/allLocationWeatherReport').then((response)=>{
        
            if(response.data.statusCode<400){
                setWeatherData(response.data.data.weather)
                setLoading(false)
            }
            else{
                setLoading(false)
                toast.error(response.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error(error.response.data.message || "An error occurred while loging In, Please try again !!")
            setLoading(false)
        })
    },[])




  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 p-8">
      <Navbar/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {weatherData.map((weather, index) => (
            <div
                key={index}
                onClick={() => navigate(`/weather/${weather.location}`)}
                className="rounded-xl shadow-xl p-8 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl text-white"
                style={{
                    backgroundImage: getWeatherBackground(weather.main),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '350px', // Increased height for larger cards
                }}
            >
                <div className="flex justify-between text-black items-center mb-4">
                    <h3 className="text-3xl font-bold">{weather.location}</h3>
                    {getWeatherIcon(weather.main)}
                </div>
                <div className="space-y-3 text-black">
                    <p><strong>Temperature:</strong> {weather.temperature}°C</p>
                    <p><strong>Feels Like:</strong> {weather.feelsLike}°C</p>
                    <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
                    <p><strong>Rain Probability:</strong> {weather.rainProbability}%</p>
                    <p><strong>Condition:</strong> {weather.main}</p>
                </div>
                <p className="text-gray-800 text-sm mt-4">
                    <strong>Updated:</strong> {new Date(weather.timestamp).toLocaleString()}
                </p>
            </div>
        ))}

<Dialog>
  <DialogTrigger>
  <div
            className="bg-gradient-to-r from-yellow-200 to-green-300 rounded-xl shadow-xl p-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors transform hover:scale-105"
           
            style={{ height: '350px' }}
        >
            <div type="primary" className="text-lg font-semibold rounded-full">
                + Add Location
            </div>
        </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Location</DialogTitle>
      <DialogDescription>
    You can add Location here to check Weather. 
    <div className="flex flex-col items-center mt-6 gap-4">
            <Label htmlFor="name" className="text-right">
              City Name
            </Label>
            <Input id="cityName" onChange={(e)=>{setLocation(e.target.value)}} className="col-span-3" />
            <Button onClick={(e)=>{addLocation(addLocation())}} className={"bg-green-500 hover:bg-yellow-400"} >Add City</Button>

          </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


<Dialog>
  <DialogTrigger>
  <div
            className="bg-gradient-to-r from-yellow-200 to-red-200 rounded-xl shadow-xl p-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors transform hover:scale-105"
           
            style={{ height: '350px' }}
        >
            <div type="primary" className="text-lg font-semibold rounded-full">
                + Add Triggers
            </div>
        </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Trigger</DialogTitle>
      <DialogDescription>
    You can add Weather trigerr for different weather parameter here. 
    <div className="flex flex-col items-center mt-6 gap-4">
    <Label htmlFor="name" className="text-right">
              City Name
            </Label>
            <Input id="cityName" onChange={(e)=>{setCity(e.target.value)}} className="col-span-3" />
            <Label htmlFor="name" className="text-right">
              Parameter
            </Label>
            <Select onValueChange={(e)=>{setParam(e)}}>
  <SelectTrigger>
    <SelectValue placeholder="Select Parameter" />
  </SelectTrigger>
  <SelectContent >
    <SelectItem value="temperature">Temperature</SelectItem>
    <SelectItem value="feelsLike">Feels Like</SelectItem>
    <SelectItem value="windSpeed">Wind Speed</SelectItem>
    <SelectItem value="rainProbaility">Rain Probaility</SelectItem>
  </SelectContent>
</Select>
<Label htmlFor="name" className="text-right">Threshold value</Label>
<Input placeholder="Enter Threshold value" onChange={(e)=>{setVlaue(e.target.value)}} className="col-span-3" />

            <Button onClick={(e)=>{handleThresholdSubmit()}} className={"bg-green-500 hover:bg-yellow-400"} >Add Threshold</Button>

          </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
        

    </div>
</div>
 )
}

export default Home
