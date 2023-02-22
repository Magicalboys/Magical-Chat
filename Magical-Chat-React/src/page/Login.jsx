import React from "react";
import { Link } from "react-router-dom";
import { useState  } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { loginRouter } from '../utils/ApiRoutes';
import styled from 'styled-components'
import { network } from "../network";

function Login() {

  const navigate  = useNavigate();

  const [values,setValues] = useState({
    username:"",
    password:""
  })

  const handleSumbit = async (event) => {
    event.preventDefault()
    // 是否注册成功
    const success = await network(values,loginRouter,false);
    
    if( success ){
      // 查看自己曾经是否设置了头像
      const { avatarImage } =  JSON.parse(localStorage.getItem('chat-app-user'));

      // 如果已经设置 直接去 chat 页面   
      avatarImage ? navigate('/chat') :navigate('/avatar')
    }
  }

  const handleChange = (event ) =>{
    setValues({...values,
      [event.target.name]:event.target.value})
  }

  return (
    <>
    <ToastContainer/>
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

          <Button type="submit">登录</Button>
          <span> 
            还没有账号?    
            <Link to='/user' style={{marginLeft:'0.5rem'}}>Register</Link>
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
export const Button = styled.button`
  background-color: #997af0;
  color: white;
  padding: none;
  font-weight: bold;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius:0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transform: 0.5s ease-in-out;
  &:hover{
  background-color: #4e0eff;
}
`

export default Login