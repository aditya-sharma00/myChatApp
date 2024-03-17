import React, { useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Logout = () => {
  const history = useHistory()

    const signOut = async()=>{
        try {
            localStorage.clear()
            const response = await axios.post('/api/user/logout')
            history.push('/')
        } catch (error) {
            console.error(`Error Occurred: ${error}`)
        }
    }
        
    
  return (
    <div><button onClick={signOut} className='logout-btn'>Logout</button></div>
  )
}

export default Logout