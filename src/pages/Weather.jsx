import axiosInstance from '@/utils/axiosConfig';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Weather = () => {
    const { location } = useParams();
    const [loading,setLoading]=useState(false);
    const [weatherData,setWeatherData]=useState();

    useEffect(()=>{
        axiosInstance.get(`weather/weatherReport?city=${location}`).then((response)=>{
          
            if(response.data.statusCode<400){
                toast.success("Weather fetched successfully !!")
                setLoading(false)
                setWeatherData(response.data.data)
              
            }
            else{
                setLoading(false)
                toast.error(response.data.message)
            }
        }).catch((error)=>{
            toast.error(error.response.data.message || "Error fetching location !!")
        })

    },[])

  return (
    <div>
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 p-10">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          {weatherData?.city} Weather Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Daily Stats */}
          <div className="bg-gradient-to-r from-blue-200 to-green-200 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Daily Stats</h3>
            <p><strong>Avg Temp:</strong> {weatherData?.dailyStats.averageTemp}°C</p>
            <p><strong>Feels Like:</strong> {weatherData?.dailyStats.averageFeelsLike}°C</p>
            <p><strong>Wind Speed:</strong> {weatherData?.dailyStats.averageWindSpeed} m/s</p>
            <p><strong>Max Temp:</strong> {weatherData?.dailyStats.maxTemp}°C</p>
            <p><strong>Min Temp:</strong> {weatherData?.dailyStats.minTemp}°C</p>
            <p><strong>Max Wind Speed:</strong> {weatherData?.dailyStats.maxWindSpeed} m/s</p>
          </div>

          {/* Weekly Stats */}
          <div className="bg-gradient-to-r from-green-200 to-yellow-200 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Weekly Stats</h3>
            <p><strong>Avg Temp:</strong> {weatherData?.weeklyStats.averageTemp}°C</p>
            <p><strong>Feels Like:</strong> {weatherData?.weeklyStats.averageFeelsLike}°C</p>
            <p><strong>Wind Speed:</strong> {weatherData?.weeklyStats.averageWindSpeed} m/s</p>
            <p><strong>Max Temp:</strong> {weatherData?.weeklyStats.maxTemp}°C</p>
            <p><strong>Min Temp:</strong> {weatherData?.weeklyStats.minTemp}°C</p>
            <p><strong>Max Wind Speed:</strong> {weatherData?.weeklyStats.maxWindSpeed} m/s</p>
          </div>

          {/* Monthly Stats */}
          <div className="bg-gradient-to-r from-yellow-200 to-red-200 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Monthly Stats</h3>
            <p><strong>Avg Temp:</strong> {weatherData?.monthlyStats.averageTemp}°C</p>
            <p><strong>Feels Like:</strong> {weatherData?.monthlyStats.averageFeelsLike}°C</p>
            <p><strong>Wind Speed:</strong> {weatherData?.monthlyStats.averageWindSpeed} m/s</p>
            <p><strong>Max Temp:</strong> {weatherData?.monthlyStats.maxTemp}°C</p>
            <p><strong>Min Temp:</strong> {weatherData?.monthlyStats.minTemp}°C</p>
            <p><strong>Max Wind Speed:</strong> {weatherData?.monthlyStats.maxWindSpeed} m/s</p>
          </div>
        </div>

        {/* Additional Information */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>

    </div>
  )
}

export default Weather
