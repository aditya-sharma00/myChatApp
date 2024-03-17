import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import Logout from '../components/Logout';


export const ChatPage = () => {
  const [profile,setProfile] = useState([])
  const toast = useToast()
  const fetchChats = async()=>{
    try {
      const data = JSON.parse(localStorage.getItem('userInfo'))
      
      console.log(data);
      setProfile(data)
    } catch (error) {
      toast({
        title: 'Error Occured',
        description:error.response.data.message,
        status:"error",
        duration: 5000,
        isClosable: true,
        position:"bottom",
      })
    }
    
  }
  
  useEffect(() => {
    fetchChats()
  }, [])
  return (
    <div>
        <Logout/>
        <h1>Hello {profile.name}</h1>
      </div>
  )
}
