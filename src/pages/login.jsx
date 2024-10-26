import { useEffect, useState } from 'react';
import React from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  
  import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
  

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [phone,setPhone]=useState("");
    const [otp,setOtp]=useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true)
        axiosInstance.post('user/getCurrentUser').then((response)=>{
        
            if(response.data.statusCode<400){
                
                setLoading(false)
                navigate("/home")
            }
            else{
                setLoading(false)
            }
        }).catch((error)=>{
            console.log(error)
            setLoading(false)
        })
    },[])

    const handleSubmit =async()=>{
        if(phone.length!=10){
            toast.error("Phone number must be of 10 digits")
        }
        else if(otp.length!=4){
            toast.error("OTP must be of 4 digits")
        }
        else{
            setLoading(true)
            axiosInstance.post('user/login',{phone:"91"+phone,otp:otp}).then((response)=>{
                console.log(response)
                if(response.data.statusCode<400){
                    toast.success("Login successfull !!")
                    setLoading(false)
                    navigate("/home")
                }
                else{
                    toast.error(response.data.message)
                    setLoading(false)
                }
            }).catch((error)=>{
                console.log(error)
                toast.error(error.response.data.message||"An error occurred while loging In, Please try again !!")
                setLoading(false)
            })
        }
    }
    const requestOtp = async () =>{
        
        if(phone.length!=10){
            toast.error("Phone number must be of 10 digits")
        }
        else{
            setLoading(true)
            axiosInstance.post('user/request-otp',{phone:"91"+phone}).then((response)=>{
                if(response.data.statusCode<400){
                    toast.success("OTP sent successfully !!")
                    setLoading(false)
                }
                else{
                    toast.error(response.data.message)
                    setLoading(false)
                }
            }).catch((error)=>{
                toast.error("An error occurred while sending OTP, Please try again !!")
                setLoading(false)
            })
        }
    }
    

    return (
        <div className="flex bg-black items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 to-green-300">
            <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Get In</CardTitle>
        <CardDescription>Enter your Details to check weather of your city.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Phone Number</Label>
              <Input onChange={(e)=>{console.log(setPhone(e.target.value))}} id="name" maxLength={10} minLength={10} placeholder="Enter Phone Number" />
            </div>

            <div className="flex flex-col  space-y-1.5">
            <Label htmlFor="name">OTP</Label>
            <div className="flex flex-row mx-auto" >
            <InputOTP onChange={(e)=>{console.log(setOtp(e))}} className="mx-auto" maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
  <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
   
  </InputOTPGroup>
</InputOTP>
</div>

            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={(e)=>{requestOtp()}} disabled={loading} variant="outline">Get OTP</Button>
        <Button onClick={(e)=>{handleSubmit()}} disabled={loading} className="bg-green-400 hover:bg-yellow-500">Login</Button>
      </CardFooter>
    </Card>
        </div>
    );
};

export default LoginPage;
