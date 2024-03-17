import {
  Button,
FormControl,
FormLabel,
Input,
InputGroup,
InputRightElement,
VStack,
useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Login = () => {
  const toast = useToast()
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const history = useHistory()
const [show, setShow] = useState(false)
const handleClick = ()=>{
  setShow(!show)
}
const submitHandler = async()=>{
  if(!email || !password){
    toast({
      title: 'Please Fill all the Fields.',
      
      status:"warning",
      duration: 5000,
      isClosable: true,
      position:"bottom",
    })
    return
  }
  try {
    const config = {
      headers:{
        "Content-type":"application/json"
      }
    }
    const {data}  = await axios.post('/api/user/login',{email,password},config)
    toast({
      title: 'Login Successful',
      status:"success",
      duration: 5000,
      isClosable: true,
      position:"bottom",
    })

    localStorage.setItem('userInfo',JSON.stringify(data))
    history.push('/profile')
    return
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
return (
  <VStack>
    
    <FormControl id="email" isRequired>
      <FormLabel>Email: </FormLabel>
      <Input
        type="email"
        placeholder="Enter Your Email"
        onChange={(e)=>setEmail(e.target.value)}
      ></Input>
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password: </FormLabel>
      <InputGroup>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    
    <Button 
    colorScheme="blue"
    width="100%"
    style={{marginTop:15}}
    onClick={submitHandler}
    >
      
      Login
    </Button>
  </VStack>
);
};
