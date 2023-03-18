import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { registerRouter } from 'utils/api';
import { handleValidation } from "utils";
import { network } from "services";
import { Button } from './Login';
function Register() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  }, [])

  // 如果注册成功进入登录页面
  const handleSumbit = async (event) => {
    event.preventDefault()
    if (handleValidation(values)) {


      const flag = await network(values, registerRouter, true);
      if (flag) {
        navigate('/login')
      }
    }
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <form onSubmit={(event) => handleSumbit(event)}>
          <div className="brand">
            <h1>Chat</h1>
          </div>
          <input
            type='text'
            placeholder="Username"
            name="username"
            onChange={e => handleChange(e)} />

          <input
            type='password'
            placeholder="Password"
            name="password"
            onChange={e => handleChange(e)} />
          <input
            type='password'
            placeholder="Password"
            name="confirmPassword"
            onChange={e => handleChange(e)} />

          <Button type="submit">注册</Button>
          <span>
            已经有一个账号?
            <Link to='/login' style={{ marginLeft: '0.5rem' }}>Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  gap: 1rem;
  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:1rem;
    h1{
      color:white;
      text-transform: uppercase;  
    }
  }
  form{
    display: flex;
    flex-direction: column;
    gap:2rem;
    background-color: #00000076;
    border-radius:2rem;
    padding: 3rem 5rem;
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus{
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }    
    span{
        color: white;
        text-transform: uppercase;
      }
      a{
        color: #4e0eff;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
      }
  }
`


export default Register