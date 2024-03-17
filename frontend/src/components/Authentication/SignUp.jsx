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
import { warning } from "framer-motion";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [showpassword, setShowPassword] = useState(false)       
  const [showcpassword, setShowCpassword] = useState(false)       
  const history = useHistory()
  const toast = useToast()
  const handleClick = (id)=>{
    if (id === 'password') {
        setShowPassword(!showpassword)
    }else if (id === 'cpassword') {
        setShowCpassword(!showcpassword)
    }
  }
  const submitHandler = async()=>{
    if(!name || !email || !password || !cpassword){
      toast({
        title: 'Please Fill all the Fields.',
        
        status:"warning",
        duration: 5000,
        isClosable: true,
        position:"bottom",
      })
      return
    }if (password!== cpassword) {
      toast({
        title: 'Password and Confirm password not matched.',
        
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
      const {data}  = await axios.post('/api/user',{name,email,password},config)
      toast({
        title: 'Registration Successful',
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name: </FormLabel>
        <Input
          type="text"
          placeholder="Enter Your Name"
          onChange={(e)=>setName(e.target.value)}
        ></Input>
      </FormControl>
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
            type={showpassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={()=>handleClick('password')}>
              {showpassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="cpassword" isRequired>
        <FormLabel>Confirm Password: </FormLabel>
        <InputGroup>
          <Input
            pr="4.5rem"
            type={showcpassword ? "text" : "password"}
            placeholder="Enter Confirm password"
            onChange={(e)=>setCpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={()=>handleClick('cpassword')}>
              {showcpassword ? "Hide" : "Show"}
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
        
        Sign Up
      </Button>
    </VStack>
  );
};
