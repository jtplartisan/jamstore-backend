import React, { useState } from "react";
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
const navigate = useNavigate()
  const loginFormData = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      if (!loginForm.email || !loginForm.password) {
        toast({
          title: 'Error',
          description: "Email and password are required.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const resp = await axios.post('http://localhost:8080/api/auth/login', loginForm);
      let userData  = {
          userid : resp.data.id,
          email : resp.data.email,
          phone : resp.data.phone,
          alternatePhone : resp.data?.alternatePhone,
          shopCategory: resp.data?.shopCategory,
          shopName: resp.data.shopName,
          userName: resp.data.userName
        }
        localStorage.setItem('token',JSON.stringify(resp.data.token))
localStorage.setItem('vendor',JSON.stringify(userData))

if (resp.status !==400 || resp.status !==500 || resp.status !==401 || resp.status !==403 || resp.status !==404) {
    navigate('/vendor')   
    toast({
          title: 'Login Successful',
          description: "Welcome back!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
       toast({
          title: 'Login Failed',
          description: "Please check your credentials and try again.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h1 className="text-center my-5">Login form</h1>
        <div className="col-md-7">
          <form>
            <MDBInput
              className="mb-4"
              value={loginForm.email}
              onChange={(e) => loginFormData(e)}
              type="email"
              id="form1Example1"
              name="email"
              label="Email address"
            />
            <MDBInput
              className="mb-4"
              value={loginForm.password}
              onChange={(e) => loginFormData(e)}
              type="password"
              id="form1Example2"
              name="password"
              label="Password"
            />

            <MDBBtn onClick={login} block>
              Sign in
            </MDBBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
